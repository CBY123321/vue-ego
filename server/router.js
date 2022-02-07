const express = require("express");
const router = express.Router();
// 导入数据库
const sqlFun = require("./mysql");
const multer = require("multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const config = require("./secret");
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
router.get("/search", (req, res) => {
  var search = req.query.search;
  const sql =
    "select * from data where concat(`title`,`sellPoint`,`desc`) like '%" +
    search +
    "%'";
  sqlFun(sql, null, (result) => {
    if (result.length > 0) {
      const searchLength = result.length;
      const searchPage = Math.ceil(searchLength / 8);
      res.send({
        status: 200,
        data: result,
        searchLength,
        searchPage,
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据",
      });
    }
  });
});

/**
 * 类目选择
 * 接口说明：接口不同的参数cid 返回不同的类目数据 后台接受变量：id
 */
router.get("/backend/itemCategory/selectItemCategoryByParentId", (req, res) => {
  const id = req.query.id;
  const sql = "select * from category where id=?";
  var arr = [id];
  sqlFun(sql, arr, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据",
      });
    }
  });
});

/**
 * 类目结构数据获取
 */
router.get("/category/data", (req, res) => {
  var cid = req.query.cid;
  var sql = "select * from params where itemCatId=?";
  sqlFun(sql, [cid], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据",
      });
    }
  });
});

/**
 * 上传图片 post请求 upload
 * 说明：
 *  1.后台安装 multer 模块   同时引入fs模块
 *  2.router.js入口文件导入模块
 *      const fs=require('fs')
        const multer=require('multer')
 *  3.上传图片 
 * 
 */

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};

var uploadFolder = "./upload/";
createFolder(uploadFolder);
var upload = multer({
  storage: storage,
});

router.post("/upload", upload.single("file"), function (req, res, next) {
  var file = req.file;
  console.log("文件类型：%s", file.mimetype);
  console.log("原始文件名：%s", file.originalname);
  console.log("文件大小：%s", file.size);
  console.log("文件保存路径：%s", file.path);
  res.json({
    res_code: "0",
    name: file.originalname,
    url: file.path,
  });
});

/**
 * 商品添加
 * 参数： title cid  category sellPoint price num descs paramsInfo image
 */
router.get("/backend/item/insertTbItem", (req, res) => {
  /**
   * 获取参数
   */
  var title = req.query.title || "";
  var cid = req.query.cid || "";
  var category = req.query.category || "";
  var sellPoint = req.query.sellPoint || "";
  var price = req.query.price || "";
  var num = req.query.num || "";
  var desc = req.query.desc || "";
  var paramsInfo = req.query.paramsInfo || "";
  var image = req.query.image || "";

  const sql = "insert into  data values (null,?,?,?,?,?,?,?,'',1,'','',?,?)";
  var arr = [
    title,
    image,
    sellPoint,
    price,
    cid,
    category,
    num,
    desc,
    paramsInfo,
  ];
  sqlFun(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "添加成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "添加失败",
      });
    }
  });
});
/**
 * 商品删除接口 id
 */
router.get("/backend/item/deleteItemById", (req, res) => {
  var id = req.query.id;
  const sql = "delete from data where id=?";
  const arr = [id];
  sqlFun(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败",
      });
    }
  });
});
/**
 * 修改商品
 */

router.get("/backend/item/updateTbItem", (req, res) => {
  var id = req.query.id;
  var title = req.query.title || "";
  var sellPoint = req.query.sellPoint || "";
  var price = req.query.price || "";
  var cid = req.query.cid || "";
  var category = req.query.category || "";
  var num = req.query.num || "";
  var desc = req.query.desc || "";
  var image = req.query.image || "";
  const sql = "update data set ? where id=?";
  sqlFun(
    sql,
    [{ title, sellPoint, price, cid, category, num, desc, image }, id],
    (result) => {
      if (result.affectedRows > 0) {
        res.send({
          status: 200,
          msg: "修改成功",
        });
      } else {
        res.send({
          status: 500,
          msg: "修改失败",
        });
      }
    }
  );
});
//登录接口
/**
 * 语法：
 * 如60，"2 days"，"10h"，"7d"，Expiration time，过期时间
 *  jwt.sign({},'秘钥','过期时间,{expiresIn:20*1,'1day''1h'}')
 */

/**
 * 登录 login
 * 接受的字段：username,password
 * 测试：postman
 */
router.post("/login", (req, res) => {
  let { username, password } = req.body;
  //请求数据库
  let sql = "select * from user where username=? and password=?";
  let arr = [username, password];
  sqlFun(sql, arr, (result) => {
    if (result.length > 0) {
      let token = jwt.sign(
        {
          username: result[0].username,
          id: result[0].id,
        },
        config.jwtSecert,
        {
          expiresIn: "1h",
        }
      );
      res.send({
        status: 200,
        data: "Bearer " + token,
      });
    } else {
      res.send({
        status: 404,
        msg: "信息错误",
      });
    }
  });
});

/**
 * 注册接口 /register
 */
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const sql = "insert into userinfo values(null,?,?)";
  const arr = [username, password];
  sqlFn(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        msg: "注册成功",
        status: 200,
      });
    } else {
      res.status(401).json({
        errors: "用户名密码错误",
      });
    }
  });
});

module.exports = router;
