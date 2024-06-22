import express from "express";
import mongoose from "mongoose";
import { userModel } from "./Models/userModel.js";
import { userRouter } from "./Routes/userRoute.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use('/user',userRouter);

mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then((res) => {
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
