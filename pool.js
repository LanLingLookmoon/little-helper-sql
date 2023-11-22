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


/**
 * 如果你想改进这段代码的话，我建议你可以考虑以下几个点：

错误处理：在你的代码中，当查询出现错误时，你只是简单地拒绝了Promise。你可能也想要把错误信息发送给用户，或者记录下来以便于以后的调查。
连接管理：在你的代码中，每次查询都会获取一个新的连接，即使这个连接在查询之后并没有被释放。这可能会导致连接池中的连接数量过多。你应该确保在每次查询之后都释放连接。
SQL注入防护：你的查询函数现在接受一个SQL字符串和一个值数组作为参数。这可能会导致SQL注入攻击。你应该考虑使用参数化查询或者预编译语句来防止这种攻击。
连接池配置：你可能需要根据你的应用的需求来调整你的连接池的配置。例如，你可能需要调整最大连接数、最小连接数、连接超时时间等参数。
 */