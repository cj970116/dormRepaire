let config = require("../util/config");
const util = require("../util/util");
var path = require("path");
my = Object.assign({}, config.my);
let fs = require("fs");
let request = require("request");
const multiparty = require("multiparty");
const uuid = require("uuid");

// 获取所有用户信息
checkUser = (req, res) => {
  let sqlArr;
  let sql;
  let id;
  if (req.query.params) {
    id = JSON.parse(req.query.params).id;
    console.log(id);
  }

  if (id == null) {
    sql = "select * from t_user";
    sqlArr = [];
  } else {
    sql = "select * from t_baoxiu where userId=?";
    sqlArr = [id];
  }
  let callback = function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
    }
  };
  config.sqlConnect(sql, sqlArr, callback);
};

// 获取所有员工信息
checkFixman = (req, res) => {
  let sql;
  let sqlArr;
  let id;
  if (req.query.params) {
    id = JSON.parse(req.query.params).id;
  }
  if (id == null) {
    sql = "select * from t_fixman";
    sqlArr = [];
  }else{
    sql = "select * from t_baoxiu where fixId=?"
    sqlArr=[id]
  }
  let callback = function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(data);
    }
  };
  config.sqlConnect(sql, sqlArr, callback);
};

// 获取所有报修表单信息
getAll = (req, res) => {
  let params = JSON.parse(req.query.params);
  let sql = "select * from t_baoxiu where status=?";
  let sqlArr = [params.status];
  let callback = (err, data) => {
    if (err) {
      console.log("连接失败?");
    } else {
      console.log(data);

      res.send({
        list: data,
      });
    }
  };
  config.sqlConnect(sql, sqlArr, callback);
};

// 获取报修详情（接收参数）
detail = (req, res) => {
  let id = JSON.parse(req.query.params).id;
  let sql = "select * from t_baoxiu where id=?";
  let sqlArr = [id];
  let callback = function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(data);
    }
  };
  config.sqlConnect(sql, sqlArr, callback);
};

checkAcc = (req, res) => {
  let id = JSON.parse(req.query.params).id;
  let sql =
    "SELECT t_fixman.realName,t_fixman.fTel,t_baoxiu.* FROM t_fixman,t_baoxiu WHERE t_fixman.id=t_baoxiu.fixId AND t_baoxiu.id=?";
  let sqlArr = [id];
  let callback = function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(data);
    }
  };
  config.sqlConnect(sql, sqlArr, callback);
};
// 修改维修状态
updateStatus = (req, res) => {
  let params = JSON.parse(req.query.params);
  let sql = "update t_baoxiu set status=?,fixId=? where id=?";
  let sqlArr = [params.status, params.fixId,params.id];
  let callback = function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send("受理成功");
    }
  };
  config.sqlConnect(sql, sqlArr, callback);
};

// 提交报修表单
report = (req, res) => {
  let post = req.body.data;
  let sql =
    "insert into t_baoxiu set id=0,tel=?,img=?,type=?,des=?,roomNo=?,buildNo=?,date=?,userId=?,status=?";
  let sqlArr = [
    post.tel,
    JSON.stringify(post.imgList),
    post.type,
    post.des,
    post.roomNo,
    post.buildNo,
    post.date,
    post.userId,
    post.status,
  ];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(req.body.data);
    }
  };
  config.sqlConnect(sql, sqlArr, callback);
  console.log("添加成功");
};

// 查看报修表单
checkReport = (req, res) => {
  //FIXME: get请求参数传递问题
  let userId;
  let status;
  if (req.query.params) {
    userId = JSON.parse(req.query.params).userId;
    status = JSON.parse(req.query.params).status;
  } else {
    console.log("未知的请求");
  }
  console.log(JSON.parse(req.query.params));
  let sql = "select * from t_baoxiu where userId=? AND status=?";
  let sqlArr = [userId, status];
  let callback = (err, data) => {
    if (err) {
      console.log("查询失败" + err);
    } else {
      // console.log(data);
      res.send(data);
      if (userId != undefined) {
        console.log("查询到用户" + userId + "的数据");
      } else {
        console.log("缺少参数");
      }
    }
  };
  config.sqlConnect(sql, sqlArr, callback);
};

// 获取session
getSession = (req, res) => {
  let code = req.query.code;
  if (!code) {
    res.json(util.handleFail("code不能为空", 10001));
  } else {
    let sessionUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${my.appId}&secret=${my.appSecret}&js_code=${code}&grant_type=authorization_code`;
    request(sessionUrl, (err, response, body) => {
      let result = util.handleResponse(err, response, body);
      res.json(result);
    });
  }
};

// 用户登录注册接口
login = (req, res) => {
  let userInfo = JSON.parse(req.query.userInfo);
  let sql =
    "insert into t_user (id,userId,userName) select ?,?,? from dual where not exists ( select userId from t_user where userId=?)";
  let sqlArr = [0, userInfo.openid, userInfo.nickName, userInfo.openid];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  };
  config.sqlConnect(sql, sqlArr, callback);

  if (!userInfo) {
    res.json(util.handleFail("用户信息不能为空"), 10002);
  } else {
    /**
     * 存储数据到数据库
     */
    res.json({
      code: 0,
      data: {
        userId: "10000001",
      },
      message: "登录成功",
    });
  }
};

// 维修人员登录接口
fixManLogin = (req, res) => {
  console.log(req.body.data);
  let post = req.body.data;
  let sql = "select pass,realName,fixId from t_fixman where fixId=?";
  let sqlArr = [post.fixId];
  let callback = (err, data) => {
    if (err) {
      console.log("查询失败");
    } else {
      res.send(data[0]);
    }
  };
  config.sqlConnect(sql, sqlArr, callback);
};
// 维修人员注册
fixRegis = (req, res) => {
  // console.log(req.body.data);
  // res.send(req.body.data)
  let post = req.body.data;
  let sql =
    "insert into t_fixman (id, fixId, pass,tel,realName) select ?,?,?,?,? from dual where not exists ( select fixId from t_fixman where fixId=?)";
  let sqlArr = [0, post.fixId, post.pass, post.tel, post.realName, post.fixId];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data.insertId != 0) {
        res.send("添加成功");
        console.log(data);
      } else {
        res.send("用户已存在");
      }
    }
  };
  config.sqlConnect(sql, sqlArr, callback);
};
// 管理员登录
mLogin = (req, res) => {
  let formdata = req.body.data;

  let sql = "select * from t_admin where userName=? and pass=?";
  let sqlArr = [formdata.Mid, formdata.pass];
  let callback = function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data[0]);
    }
  };
  config.sqlConnect(sql, sqlArr, callback);
};
// 维修图片上传
upload = (req, res) => {
  const form = new multiparty.Form();
  //设置单文件大小限制 2M
  form.maxFieldsSize = 2 * 1024 * 1024;
  form.uploadDir = "public";
  form.parse(req, function (err, flields, files) {
    // console.log(files, " :files")
    //拿到扩展名
    const extname = path.extname(files.file[0].originalFilename);
    //uuid生成 图片名称
    const nameID = uuid.v4().replace(/\-/g, "");
    const oldpath = path.normalize(files.file[0].path);

    //新的路径
    let newfilename = nameID + extname;
    var newpath = "./public/images/" + newfilename;
    let respath = "http://localhost:3000/images/" + newfilename;

    //改名
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        res.send({ msg: "文件上传失败:" }).end();
      } else {
        res.send({ msg: respath }).end();
        // console.log(respath);
      }
    });
  });
};

module.exports = {
  report,
  checkReport,
  getSession,
  login,
  getAll,
  fixManLogin,
  fixRegis,
  detail,
  updateStatus,
  checkAcc,
  mLogin,
  checkUser,
  upload,
  checkFixman,
};
