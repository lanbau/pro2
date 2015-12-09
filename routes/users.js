var express = require('express')
var router = express.Router()
var fetch = require('node-fetch')

/* GET users listing. */
router.get('/', function (req, res, next) {
  fetch('https://graph.facebook.com/v2.5/act_1532498913647820/campaigns?fields=id,name,start_time&access_token=CAANCwLgAF8UBAGjNfQl2FQZCQI5CN8yr3ac4jZAqRGZClvxFHt4cCmZB7cQe1i8gVKnY9gBdaC35TOWZADXy0gqC1ta0CZAqcEicVzIxPO8sthSeIO7BvLOHoL4oYQ1zWTBONfQcdRZBXhKOdftodZCnIVNAcBZAkZBFKagoZB1Uj6ZA8ebZACxZCoTKVhtZB3jnMGqsFwZD')
    .then(function (res) {
      return res.json()
    }).then(function (json) {
      res.send(json)
    })
})

module.exports = router
