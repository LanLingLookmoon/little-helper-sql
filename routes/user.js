const BaseResult = require('../config/BaseResult')
const express = require("express");
const router = express.Router();
const request = require('request');
const query = require("../pool")
const {generateToken} = require('../middleware/handdle_token')

//查看链接成功
router.get('/test', function (req, res) {
    res.send('Hello World!')
});

router.post('/example',async (req, res) => {
    let code = req.body.code
    let appid = "wx165408c54ca4c3f5"; //自己小程序后台管理的appid，可登录小程序后台查看
    let mysecret = "254b80961b29bf534603fbc599b1e396"; //小程序后台管理的secret，可登录小程序后台查看
    let grant_type = "authorization_code"; // 授权（必填）默认值
    let url ='https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + mysecret + '&js_code=' + code + '&grant_type=' + grant_type;

    request(url,async (error, response, body)=>{
        let parsData = JSON.parse(body.toString());
        let openid = parsData.openid

        let sql = `INSERT INTO user_info (openid, token) VALUES (?, ?)`
        let findsql = `SELECT * FROM user_info WHERE openid = openid`

        result = await query(findsql)
        const token = generateToken({openid: openid})
        let values = [openid, token];

        if (result.length == 0) {
            await query(sql, values).then(res => {
                console.log(222, res);
            })
        }

        const returnData = {
            data: {
                token: token
            }
        }
        
        res.send(BaseResult.success(returnData));
    })
});

module.exports = router;
