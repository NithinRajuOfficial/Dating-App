import app from "./app.js";
import connectDB from "./db/index.js";


connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("Express Error:", error);
      process.exit(1);
    });
    app.listen(process.env.PORT || 4000, () => {
      console.info(`Server is running on port number ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDb Connection error:", error);
  });
