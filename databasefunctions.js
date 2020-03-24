function createDatabase(course, code, teacher) {
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
        //if(!exists) {
            db.run("CREATE TABLE " + course + " (courseName TEXT, courseCode TEXT, courseTeacher TEXT);");
        //}
        var stmt = db.prepare("INSERT INTO " + course + " VALUES (?, ?, ?)");
        stmt.run(course, code, teacher);
        stmt.finalize();

    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    })
}


function displayDatabase(course) {
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
        db.each('SELECT * FROM ' + course , (err, row) => {
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

function getData(sql) {
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
        db.each(sql , (err, row) => {
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

function updateData(sql) {
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