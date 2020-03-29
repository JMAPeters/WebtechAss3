var fs = require("fs");
var file = __dirname + "/database/" + "courses.db";
var exists = fs.existsSync(file);
if(!exists) {
    fs.openSync(file, "w");
}
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the courses database.');
});

db.serialize(() => {
    if(exists) {
        // db.run(`CREATE TABLE courses (
        //     code TEXT PRIMARY KEY, 
        //     title TEXT, 
        //     program TEXT, 
        //     level TEXT, 
        //     semester INT, 
        //     description TEXT, 
        //     teacherId INT);`);
        // var insertCourse = db.prepare("INSERT INTO courses VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        // db.run(insertCourse, ["INFOB3CC","Concurrency", "Computer Science", "BSc", 2, "A course about Concurrency", 1]);
        // db.run(insertCourse, ["INFOB2WT", "Webtechnologie", "Computer Science",  "BSc", 2, "A course about Web technologie", 2]);

        db.run(`CREATE TABLE students (
            studentNumber INT PRIMARY KEY,
            lastName TEXT,
            firstName TEXT,
            program TEXT,
            level TEXT,
            password TEXT)`);
        
        var insertStudent = db.prepare("INSERT INTO students VALUES (?, ?, ?, ?, ?, ?)");
        db.run(insertStudent, [6071953, "Peters", "Jorn", "", "BSc", "password1"]);
        db.run(insertStudent, [6, "Rijcken", "Alijt", "", "BSc", "password2"]);
        db.run(insertStudent, [60, "Van Der Hoorn", "Diede", "", "BSc", "password3"]);

        // db.run(`CREATE TABLE teachers (
        //     teacherId INT PRIMARY KEY,
        //     lastName TEXT,
        //     firstName TEXT,
        //     photo TEXT)`);

        // var insertTeacher = db.prepare("INSERT INTO teachers VALUES (?, ?, ?, ?");
        // db.run(insertTeacher, [1, "McDonnel", "Trevor", "img"]);
        // db.run(insertTeacher, [2, "Sosnovsky", "Sergey", "img"]);
    }
});


module.exports = db