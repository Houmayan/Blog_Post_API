import express from "express";
import getBlogRouter from "./blog.js";
const app = express();
app.use(express.json());

app.use(getBlogRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.listen(3000, () => {
  console.log("server is running");
});
