var express = require('express')
var fs = require('fs')
// var stu = require('./student.js')
var Student = require('./stu.js')

var router = express.Router()

router.get('/', function (req, res) {
  res.redirect(301, '/students')
})

router.get('/students', function (req, res) {
  Student.find(function (err, data) {
    if (err) {
      console.log(err)
      return res.status(500).send('文件读取失败')
    }
    res.render('students.html', { students: data })
  })
})

router.get('/students/new', function (req, res) {
  res.render('new.html')
})

router.post('/students/new', function (req, res) {

  new Student(req.body).save(function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
  // console.log(req.body)
  // stu.getNew(req.body, function (err, data) {
  //   if (err) {
  //     console.log(err)
  //     return res.status(500).send('文件读取失败')
  //   }
  //   // res.render('students.html', {students: data})
  //   res.redirect('/students')
  // })
})

router.get('/students/edit', function (req, res) {
  Student.findById(req.query.id.replace(/"/g, ''), function (err, data) {
    if (err) {
      console.log(err)
      return res.status(500).send('Server error.')
    }
    console.log(data)
    res.render('edit.html', { student: data })
  })
  // stu.edit(req.query, function (err, data) {
  //   if (err) {
  //     return res.status(500).send('文件读取失败')
  //   }
  //   res.render('edit.html', { student: data })
  // })
})

router.post('/students/edit', function (req, res) {
  // console.log(req.body)
  var id = req.body['_id'].replace(/"/g, '')
  Student.findByIdAndUpdate(id, req.body, function (err) {
    if (err) {
      return res.status.send('Server error.')
    }
    res.redirect('/students')
  })




  // stu.getEdit(req.body, function (err, data) {
  //   if (err) {
  //     return res.status(500).send('文件读取失败')
  //   }
  //   res.redirect('/students')
  // })

})

router.get('/students/delete', function (req, res) {

  var id = req.query.id.replace(/"/g, '')
  Student.findByIdAndRemove(id, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
  // stu.remove(req.query, function (err, data) {
  //   if (err) {
  //     console.log(err)
  //     return res.status(500).send('文件读取失败qqq')
  //   }
  //   res.redirect('/students')
  // })
})

module.exports = router