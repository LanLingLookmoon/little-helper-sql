const { v4: uuidv4 } = require('uuid')
const BaseResult = require('../config/BaseResult')
const express = require("express");
const router = express.Router();
const request = require('request');
const query = require("../pool")
const multer  = require('multer');
const fs = require('fs');

const UPLOAD_PATH = './uploads'

router.post('/upload', upload.array('fileUpload'), function (req, res, next) {
    const files  = req.files;
    const response = [];
    const result = new Promise((resolve, reject) => {
      files.map((v) => {
        fs.readFile(v.path, function(err, data) {
          fs.writeFile(`${UPLOAD_PATH}/${v.originalname}`, data, function(err, data) {
            const result = {
              file: v,
            }
            if (err)  reject(err);
            resolve('成功');
          })
        })
      })
    })
    result.then(r => {
      res.json({
        msg: '上传成功',
      })
    }).catch(err => {
      res.json({ err })
    });
})
