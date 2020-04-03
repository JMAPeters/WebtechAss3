if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const app = require('express')
const router = app.Router()
const {Course} =require( "../classes/courses.js")
const {Teacher} = require("../classes/person.js")
const db = require('../database');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const initializePassport = require('../static/js/passport-config')
initializePassport(
    passport, 
    studentNumber => db.get(`SELECT studentNumber FROM students WHRERE studentNumber = ?`, studentNumber)
)

router.use(flash())
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())


router.get('/', function (req, res) {
    res.render('home');
})

//route to get all course information
router.post('/getcourses', function (req, res) {
    console.log(req.body);
})
    
router.get('/login', function (req, res) {
    res.render('login');
})

router.get('/register', function (req, res) {
    res.render('register');
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.post('/register', async function (req, res) {
    try {
        console.log("add user");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
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
        //console.log(err);
        let courses = [];
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            //console.log(row);
            courses.push(new Course(row, undefined))  
        };
        res.send(JSON.stringify(courses));
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