var mysql = require('mysql');

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'yygl'
});

// 建立连接
con.connect((err) => {
  // 如果建立连接失败
  if(err) console.log('错误信息');
  else console.log('数据库连接成功');
})

// 执行数据库语句
// 执行查询语句
let strSql = 'select * from stu1';
// error:报错信息
// results：查询结果
// fields：字段
// con.query(strSql,(error, results, fields) => {
//   console.log(error);
  
//   console.log(results);
//   // console.log(fields);

// })

// 删除表
// let strSql2 = 'drop table stu1'
// con.query(strSql2,(err,results) => {
//   console.log(err);
//   console.log(results); 
// })

// 删除库
// let strSql3 = 'drop database test';
// con.query(strSql3,(err,results) => {
//   console.log(results);
// })

// 创建库
// let strSql4 = 'create database mall';
// con.query(strSql4,(err,results) => {
//   console.log(err);
  
//   console.log(results);
// })
// 创建表
// let strSq5 = 'CREATE TABLE `user` (`id`  int NOT NULL AUTO_INCREMENT ,`username`  varchar(255) NULL ,`password`  varchar(255) NULL ,PRIMARY KEY (`id`));'
// con.query(strSq5,(err,results) => {
//   console.log(err);
//   console.log(results);
  
// })

// 插入数据
// let strSq6 = 'insert into user (id,username,password) values (1,"leige","123456")';
// con.query(strSq6,(err,results) => {
//   console.log(err);
//   console.log(results);
// })

// let strSq7 = 'insert into user (username,password) values (?,?)';
// con.query(strSq7,["磊哥","asdaf465"],(err,results) => {
//   console.log(err);
//   console.log(results);
// })

function sqlQuery(strSql,arr){
  return new Promise((resolve,reject) => {
    con.query(strSql , arr, (err,results) => {
      if(err) {
        reject(err)
      }else{
        resolve(results)
      }
    })
  })
}

module.exports = sqlQuery;