const mysql = require("mysql");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "admin123",
  database: "ego",
});

// 封装数据库操作语句sqk语句
function sqlFun(sql, arr, callback) {
  db.query(sql, arr, (err, result) => {
    if (err) {
      console.log("数据库语句错误");
    }
    callback(result);
  });
}
module.exports = sqlFun;
