const express = require("express");
const app = express();
const router = require("./router");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));
// 配置跨域中间件
const cors = require("cors");
app.use(cors());
app.use("/api", router);
app.listen(8000, () => {
  console.log(8000);
});
