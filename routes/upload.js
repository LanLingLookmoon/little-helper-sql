const { v4: uuidv4 } = require('uuid')
const BaseResult = require('../config/BaseResult')
const express = require("express");
const router = express.Router();
const request = require('request');
const query = require("../pool")
const multer = require('multer');  
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

const UPLOAD_PATH = './uploads'
router.post('/upload', upload.array('file'), function (req, res, next) {
    const files  = req.files;
    const response = [];
    const result = new Promise((resolve, reject) => {
      files.map((v) => {
        fs.readFile(v.path, function(err, data) {
          fs.writeFile(`${UPLOAD_PATH}/${v.originalname}`, data, function(err, data) {
            const result = { file: v }
            if (err)  reject(err);
            resolve(result);
          })
        })
      })
    })
    result.then(async r => {
      // 存数据库
      let sql = `INSERT INTO goods (filename, originalname) VALUES (?, ?)`
      await query(sql, [r.file.filename, r.file.originalname])
      res.send(BaseResult.success(r));
    }).catch(err => {
      res.send(BaseResult.fail(err));
    });
})

router.get('/image', async function(req, res) {
  let findsql = `SELECT originalname, filename FROM goods WHERE id = `+req.query.id;
  result = await query(findsql)
  console.log(result[0].filename);
  const imagePath = `${UPLOAD_PATH}/${result[0].originalname}`; // 图片文件的路径  
  const imageData = fs.readFileSync(imagePath); // 读取图片文件
  res.setHeader('Content-Disposition', `attachment; filename=${result[0].filename}`); 
  res.send(imageData); // 将图片数据作为响应发送给前端  
});  

module.exports = router;