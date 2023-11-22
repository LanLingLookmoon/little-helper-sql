const hostname = '192.168.15.99';
const port = 3000;

const express = require('express');  
const app = express();  
const bodyParser = require('body-parser');
const routes = require('./routes/index')
const { verifyToken } = require('./middleware/handdle_token')

app.use(verifyToken)
app.use(bodyParser.json());//post请求req.body为空的处理 json请求
app.use(bodyParser.urlencoded({extended: false}));// 表单请求
app.use('/', routes);

app.listen(port,hostname, () => {  
  console.log('Server is running on port 3000');  
});