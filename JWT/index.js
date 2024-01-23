import dotenv from "dotenv";
import ConnectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./env",
});
//MongoDB connection code
ConnectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server in running at PORT : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connecion Error!!!", "from root index file", err);
  });
