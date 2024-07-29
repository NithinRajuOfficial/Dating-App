import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../component/layout/Layout";
import Signup from "../component/layout/Signup";
import Login from "../component/layout/Login";
import OtpLogin from "../component/layout/Otp";
import Profile from "../component/layout/Profile";
import UserDataDialog from "../component/layout/userDataForm/UserData";
import UserHobbiesDialogForm from "../component/layout/userDataForm/Hobbies";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="otp-login" element={<OtpLogin />} />
      <Route path="profile" element={<Profile />} />
      <Route path="user-data" element={<UserDataDialog/>}/>
      <Route path="hobbies" element={<UserHobbiesDialogForm/>}/>
    </Route>
  )
);
