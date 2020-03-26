exports.createDatabase = function(code, title, program, level, semester, description, teacher) {
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
            db.run("CREATE TABLE courses (code TEXT, title TEXT, program TEXT, level TEXT, semester INT, description TEXT, teacher TEXT);");
        }
        var stmt = db.prepare("INSERT INTO courses VALUES (?, ?, ?, ?, ?, ?, ?)");
        stmt.run(code, title, program, level, semester, description, teacher);
        stmt.finalize();

    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    })
}


exports.displayDatabase = function() {
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
        db.each('SELECT * FROM courses' , (err, row) => {
            if (err) {
                console.error(err.message);
            }
            console.log(row);
        });
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    })
}

exports.getData = function(sql) {
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

    let result = [];
    db.serialize(() => {
        db.each(sql , (err, row) => {
            if (err) {
                console.error(err.message);
            }
            result.push(row);
        });
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
        console.log(result);
        return result; 
    })
}

exports.updateData = function(sql) {
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
        db.run(sql, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            console.log(row);
            return (row);
        });
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    })
}