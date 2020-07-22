var fs = require('fs')
var express = require('express')
var router = require('./router.js')
var bodyParser = require('body-parser')

var app = express()

// 配置
app.use('/public', express.static('./public'))
app.use('/node_modules', express.static('./node_modules'))

app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.listen(8080, function (err) {
  console.log('server is opening on 8080')
})