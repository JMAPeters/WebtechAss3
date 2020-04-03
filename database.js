const csv = require('csv-parser')
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
    if(!exists) {
        ///////////////////////////////
        db.run(`CREATE TABLE teachers (
            teacherId INT PRIMARY KEY,
            lastName TEXT,
            firstName TEXT,
            photo BLOB)`);

        var insertTeacher = "INSERT INTO teachers VALUES (?, ?, ?, ?)";
        fs.createReadStream('./database/csv/teachers.csv')
            .pipe(csv())
            .on('data', (data) => {
                var bitmap = fs.readFileSync('./database/photos/' + data.TeacherId + '.jfif');
                var teacherphoto = Buffer.from(bitmap).toString('base64');
                db.run(insertTeacher, [data.TeacherId, data.LastName, data.FirstName, teacherphoto])
            });
            
        ///////////////////////////////
        db.run(`CREATE TABLE courses (
            code TEXT PRIMARY KEY, 
            title TEXT, 
            program TEXT, 
            level TEXT, 
            semester INT, 
            description TEXT, 
            teacherId INT,
            FOREIGN KEY(teacherId) REFERENCES teachers(teacherId)
            );`);
        var insertCourse = "INSERT INTO courses VALUES (?, ?, ?, ?, ?, ?, ?)";
        fs.createReadStream('./database/csv/courses.csv')
            .pipe(csv())
            .on('data', (data) => {
                db.run(insertCourse, [data.Code, data.Title, data.Program, data.Level, data.Blok, data.Description, data.TeacherId])
            });

        ///////////////////////////////
        db.run(`CREATE TABLE students (
            studentNumber INT PRIMARY KEY,
            lastName TEXT,
            firstName TEXT,
            program TEXT,
            level TEXT,
            password TEXT)`);
        
        // var insertStudent = "INSERT INTO students VALUES (?, ?, ?, ?, ?, ?)";
        // db.run(insertStudent, [6071953, "Peters", "Jorn", "", "BSc", "password1"]);
        // db.run(insertStudent, [6, "Rijcken", "Alijt", "", "BSc", "password2"]);
        // db.run(insertStudent, [60, "Van Der Hoorn", "Diede", "", "BSc", "password3"]);

        
    }
});


module.exports = db