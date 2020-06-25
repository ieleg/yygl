var express = require('express');
var router = express.Router();
let sql = require('../../../mysql')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  // 获取page
  let page = req.query.page;
  page = page ? page : 1;
  let sqlStr = "select * from user limit ?,5"
  let result = await sql(sqlStr,[(parseInt(page)-1)*5])
  let option = {
    userlist: Array.from(result),
  }
  // console.log(option);

  res.render('admin/users/userlist1',option);
});
router.post('/deluser',async (req,res) => {
  let arr = req.body['data[]'];
  // console.log(arr);
  arr.forEach(async (item) => {
    let sqlStr = "delete from user where id = ?";
    await sql(sqlStr,[item])
  })
  res.json({
    state:'ok',
    content:'删除成功'
  })
  
})

router.post('/delusersingle',async (req,res) => {
  // let arr = req.body.id;
  // console.log(req.body.id);
  
  let sqlStr = "delete from user where id = ?";
  // 列表1传来的在req.body.id，列表2传来的在req.body['data[id]']
  let id = req.body.id || req.body['data[id]'];
  await sql(sqlStr,[id])
  // console.log(req.body);
  
  res.json({
    state:'ok',
    content:'删除成功'
  })
  
})

module.exports = router;
