const app = require('express')
const router = app.Router()
const {Course} =require( "../classes/courses.js")
const {Teacher} = require("../classes/person.js")
const db = require('../database');


router.get('/', function (req, res) {
    res.render('home');
})

//route to get all course information
router.post('/getcourses', function (req, res) {
    console.log(req.body);
    db.all('SELECT * FROM courses' , [], function (err, rows) {
        //console.log(err);
        let courses = [];
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            //console.log(row);
            courses.push(new Course(row, undefined))  
        };
        res.send(JSON.stringify(courses));
        //res.render('home', {courses: courses});
    });  
});

//route to a particular course page
router.get('/course/:courseCode', function (req, res) {
    var sql = `SELECT *
               FROM courses
               JOIN teachers ON courses.teacherId = teachers.teacherId
               WHERE courses.code = ?`
    var params = [req.params.courseCode]

    db.get(sql, params , function (err, row){
        console.log(err)
        res.render('course', {course: new Course(row, new Teacher(row.teacherId, row.lastName, row.firstName, row.photo))});
    })

});

module.exports = router