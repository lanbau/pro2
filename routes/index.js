var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: {name: ['name 1', 'name 2']} })
  var username = localStorage.getItem('userToken')
  console.log(username)
})

router.post('/', function (req, res, next) {
  console.log(req.body)
})

module.exports = router
