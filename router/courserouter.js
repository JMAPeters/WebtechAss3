const app = require('express')
const router = app.Router()
const {Course} =require( "../classes/courses.js")
const dbfunction = require('../databasefunctions');

router.get('/', function (req, res) {
        var code = dbfunction.getData("SELECT code FROM INFOB3CC").code;
        var title = dbfunction.getData("SELECT title FROM INFOB3CC").title;
        var program = dbfunction.getData("SELECT program FROM INFOB3CC").program;
        var level  = dbfunction.getData("SELECT level FROM INFOB3CC");
        var semester  = dbfunction.getData("SELECT semester FROM INFOB3CC");
        var description = dbfunction.getData("SELECT description FROM INFOB3CC");
        var teacher = dbfunction.getData("SELECT teacher FROM INFOB3CC");

    const courses = [
        new Course(code, title, program, level, semester, description, teacher)

    ];
    res.render('home', {courses: courses});
})

router.get('/course/:courseCode', function (req, res) {
    
    // res.send(req.params.courseId)
    const code = req.params.courseCode;
    const course = new Course(code,'Applied Games', 'Information Sciences', 3, 1, 'This is a course about games', 'John Doe', 'https://image.shutterstock.com/image-photo/cute-dog-pug-breed-have-260nw-719412469.jpg')

    res.render('course', {course: course});
})

module.exports = router