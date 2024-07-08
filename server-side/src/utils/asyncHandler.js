const asyncHandler = (requestHandler) => async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      console.error(error, "error");
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors || [],
      });
    }
  };
  
  export default asyncHandler;
  