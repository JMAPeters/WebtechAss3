const app = require('express')
const router = app.Router()
const {Course} =require( "../classes/courses.js")
const {Teacher} = require("../classes/person.js")
const db = require('../database');

router.get('/', function (req, res) {
    res.render('home');
})

router.get('/login', function (req, res) {
    res.render('login');
})

router.get('/register', function (req, res) {
    res.render('register');
})

router.post('/login', function (req, res){
    //15.40
})

router.post('/register', async function (req, res) {
    try {
        console.log("add user");
        hashedPassword = req.body.studentNumber;
        //var insertStudent = "INSERT INTO students VALUES (?, ?, ?, ?, ?, ?)";
        //db.run(insertStudent, [req.body.studentNumber, req.body.lastNamer, req.body.firstName, req.body.program, req.body.level, hashedPassword]);
        res.redirect('/login');
    } catch{
        res.redirect('/register');
    }
})

//rout to get all course information
router.get('/getcourses', function (req, res) {
    db.all('SELECT * FROM courses' , [], function (err, rows) {
        console.log(err);
        let courses = [];
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            //console.log(row);
            courses.push(new Course(row, undefined))  
        };
        res.send(JSON.stringify(courses));
    });  
});

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