const asyncHandler = (requestHandler) => async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      console.error(error, "error caught by asyncHandler");
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
        errors: error.errors || [],
      });
    }
  };
  
  export default asyncHandler;
  