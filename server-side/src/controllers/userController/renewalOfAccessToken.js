import jwt from "jsonwebtoken";

import { User } from "../../models/userModel.js";
import {
  asyncHandler,
  ApiResponse,
  ApiError,
} from "../../utils/exportingJunction.js";

const renewalOfAccessToken = asyncHandler(async (req, res) => {
  //   const { refreshToken: currentRefreshToken } = req.body;
  const currentRefreshToken = req.cookies.accessToken;
  console.log(currentRefreshToken, "coookies in backed of reneqal");
  if (!currentRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(
    currentRefreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY
  );

  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new ApiError(401, "No user found with the refreshToken");
  }

  // if (user.refreshToken !== currentRefreshToken) {
  //   throw new ApiError(401, "Invalid refreshToken");
  // }

  const accessToken = await user.generateAccessToken();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
  });

  res.json(
    new ApiResponse(
      200,
      { accessToken },
      "SuccessFully generated new Access and Refresh Tokens"
    )
  );
});
export default renewalOfAccessToken;
