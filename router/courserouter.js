const app = require('express')
const router = app.Router()
const {Course} =require( "../classes/courses.js")
const db = require('../database');

router.get('/', function (req, res) {
    db.all('SELECT * FROM courses' , [], function (err, rows) {
        console.log(err);
        let courses = [];
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            courses.push(new Course(row, undefined))  
        };
        res.render('home', {courses: courses});
    });  
});

router.get('/course/:courseCode', function (req, res) {
    var sql = "SELECT * FROM courses WHERE code = ?"
    var params = [req.params.courseCode]

    db.get(sql, params, function (err, row) {
        console.log(err);
        var teacher;
        var sql2 = "SELECT * FROM teachers WHERE teacherId = ?"
        var params2 = [row.teacherId]
        db.get(sql2, params2, function (err2, row2) {
            console.log(err2);
            teacher = new Teacher (row2.teacherId, row2.lastName, row2.firstName, row2.photo);
        })

        res.render('course', {course: new Course(row, teacher)});
    })
});

module.exports = router