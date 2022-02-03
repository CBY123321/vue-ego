const express = require("express");
const router = express.Router();
// 导入数据库
const sqlFun = require("./mysql");
/**
 * 商品列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
router.get("/projectList", (req, res) => {
  const page = req.query.page || 1;
  const sqlLen = "select * from data where id";
  sqlFun(sqlLen, null, (data) => {
    let len = data.length;
    const sql =
      "select * from data order by id desc limit 8 offset " + (page - 1) * 8;
    sqlFun(sql, null, (result) => {
      if (result.length > 0) {
        res.send({
          status: 200,
          data: result,
          pageSize: 8,
          total: len,
        });
      } else {
        res.send({
          status: 500,
          msg: "暂无数据",
        });
      }
    });
  });
});

// /**
//  * 商品查询接口 search
//  * 参数：search
//  */
// router.get("/search", (req, res) => {
//   var search = req.query.search;
//   const sql =
//     "select * from project where concat(`title`,`sellPoint`,`descs`) like '%" +
//     search +
//     "%'";
//   sqlFun(sql, null, (result) => {
//     if (result.length > 0) {
//       res.send({
//         status: 200,
//         result,
//       });
//     } else {
//       res.send({
//         status: 500,
//         msg: "暂无数据",
//       });
//     }
//   });
// });

module.exports = router;