const mysql = require("mysql");

//配置mysql
const pool = mysql.createPool({
    host: "localhost",
	user: 'root',
	port: '3306', 
    password: "",
    database: "little_helper",
    connectTimeout: 5000, //连接超时
    //multipleStatements: false //是否允许一个query中包含多条sql语句
})

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
        } else {
          connection.query(sql, values, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
            connection.release(); // 释放该链接，把该链接放回池里供其他人使用
          });
        }
      });
    });
};

module.exports = query