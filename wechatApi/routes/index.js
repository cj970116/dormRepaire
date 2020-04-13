var express = require('express');
var router = express.Router();
const all = require('./../controllers/allcontroller')
/* GET home page. */


router.get("/checkReport",all.checkReport)
router.get("/getSession",all.getSession)
router.get("/login",all.login)
router.get("/getAll",all.getAll)
router.post("/report",all.report)
router.post("/fixManLogin",all.fixManLogin)
router.post("/fixRegis",all.fixRegis)
router.get("/detail",all.detail)
router.get("/updateStatus" ,all.updateStatus)
router.get("/checkAcc" ,all.checkAcc)
router.post("/mLogin" ,all.mLogin)
router.get("/checkUser" ,all.checkUser)
router.post("/upload" ,all.upload)
router.get("/checkFixman" ,all.checkFixman)



module.exports = router
