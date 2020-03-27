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
                courses.push(new Course(row))
                
            }
                
        
            ;
            res.render('home', {courses: courses});
          });
       
    
    
});

router.get('/course/:courseCode', function (req, res) {
    var sql = "SELECT * FROM courses WHERE code = ?"
    var params = [req.params.courseCode]

    db.get(sql, params, function (err, row) {
        console.log(err);

        res.render('course', {course: new Course(row)});
    })
});

module.exports = router