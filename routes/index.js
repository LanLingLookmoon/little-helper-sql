const express = require('express');  
const router = express.Router();

const userRouter = require("./user");
const uploadRouter = require("./upload");

router.use("/api", userRouter, uploadRouter); // 注入用户路由模块

module.exports = router;
