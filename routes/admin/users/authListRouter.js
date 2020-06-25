var express = require('express');
var router = express.Router();
let sql = require('../../../mysql')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/users/authlist')
});
router.get('/api',async (req,res) => {
  let sqlStr = "select * from auth limit ?,?";
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  let result = await sql(sqlStr,[(page-1)*limit,limit])
  let sqlStr2 = "select count(id) as num from user";
  let result2 = await sql(sqlStr2);

  // console.log(result);
  
  let option = {
    "code": 0,
    "msg": "",
    "count": result2[0].num,
    "data": Array.from(result)
  }
  res.json(option)
})
module.exports = router;
