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
        db.run(`CREATE TABLE courses (
            code TEXT PRIMARY KEY, 
            title TEXT, 
            program TEXT, 
            level TEXT, 
            semester INT, 
            description TEXT, 
            teacher TEXT);`);
        
        var stmt = db.prepare("INSERT INTO courses VALUES (?, ?, ?, ?, ?, ?, ?)");
        db.run(stmt, ["INFOB3CC","Concurrency", "Computer Science", "BSc", 2, "A course about Concurrency", "Trevor McDonell"])
        db.run(stmt, ["INFOB2WT", "Webtechnologie", "Computer Science",  "BSc", 2, "A course about Web technologie", "Sergey"])
    }
});



module.exports = db