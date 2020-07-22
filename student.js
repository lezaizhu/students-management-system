var fs = require('fs')

// 路径
var path = './data.json'

// 更新的学生数据 返回[{}, {},...]
exports.refresh = function (callback) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    students.forEach(function (value, index) {
      if (value.gender === 'male') {
        value.gender = '男'
      } else if (value.gender === 'female') {
        value.gender = '女'
      }
    })
    callback(null, students)
  })
}

// 新建学生后的数据 返回[{}, {},...]
exports.getNew = function (student, callback) {
  if (student.gender === 'female') {
    student.gender = '女'
  } else if (student.gender === 'male') {
    student.gender = '男'
  }
  this.refresh(function (err, data) {
    if (err) {
      callback(err)
    }
    if (data[data.length - 1]) {
      student.id = data[data.length - 1].id + 1
    } else {
      student.id = 1
    }
    this.refresh(function (err, data) {
      data.push(student)
      callback(null, data)
      this.save(data, function (err) {
        if (err) {
          console.log (err)
        }
      })
    }.bind(module.exports))
  }.bind(module.exports))
}.bind(module.exports)

// 保存学生的数据进json文件，有错误返回错误
exports.save = function (students, callback) {
  students.forEach(function (value, index) {
    if (value.gender === '男') {
      value.gender = 'male'
    } else if (value.gender === '女') {
      value.gender = 'female'
    }
  })
  fs.writeFile(path, JSON.stringify({ students: students }), function (err) {
    if (err) {
      callback(err)
    }
  })
}

// 点击编辑时学生所在的数据 返回{}
exports.edit = function (stuId, callback) {
  stuId.id = parseInt(stuId.id)
  this.refresh(function (err, students) {
    if (err) {
      callback(err)
    }
    var student = students.find(function (value) {
      return value.id === stuId.id
    })
    console.log(stuId)
    if (student.gender === '男') {
      student.male = 'checked'
    } else if (student.gender === '女') {
      student.female = 'checked'
    }
    callback(null, student)
  })
}.bind(exports)

// 编辑后刷新学生数据并进入主页 返回学生对象[{}, {},...]
exports.getEdit = function (student, callback) {
  if (student.gender === 'male') {
    student.gender = '男'
  } else if (student.gender === 'female') {
    student.gender = '女'
  }
  student.id = parseInt(student.id)
  this.refresh(function (err, students) {
    if (err) {
      callback(err)
    }
    students.forEach(function (value,index) {
      if (value.id === student.id) {
        for (var key in value) {
          value[key] = student[key]
        }
      }
    })
    this.save(students, function (err) {
      console.log ('文件保存出错')
    })
    callback(null, students)
  }.bind(exports))
}.bind(exports)

// 删除所点击的学生 返回错误对象
exports.remove = function (stuId, callback) {
  stuId.id = parseInt(stuId.id)
  this.refresh(function (err, students) {
    if (err) {
      callback(err)
    }
    var index = students.findIndex(function(value, index) {
      return value.id === stuId.id
    })
    
    students.splice(index, 1)
    this.save(students, function (err) {
      console.log('文件保存出错')
    })
    callback(null, students)
  }.bind(exports))
}.bind(exports)
