const express = require('express');
const app = express();


/**
 * Settings
 */
const port = 8036;

app.set('view engine', 'pug');

app.use(express.static('static'));

/**
 * Routes
 */

const home = require('./router/test');

app.use('/home', home);

const courserouter = require('./router/courserouter');
app.use('/', courserouter)

// var fs = require("fs");
// var file = __dirname + "/database/" + "courses.db";
// var exists = fs.existsSync(file);
// if(!exists) {
//     fs.openSync(file, "w");
// }
// var sqlite3 = require("sqlite3").verbose();
// var db = new sqlite3.Database(file);
// db.serialize(function() {
//     if(!exists) {
//         db.run("CREATE TABLE Stuff (thing TEXT)");
//     }
//     var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");
//     var rnd;
//     for (var i = 0; i < 10; i++) {
//         rnd = Math.floor(Math.random() * 10000000);
//         stmt.run("Thing #" + rnd);
//     }
//     stmt.finalize();
//     db.each("SELECT rowid AS id, thing FROM Stuff", function(err, row) {
//         console.log(row.id + ": " + row.thing);
//     });
// });
// db.close();

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database('./database/courses.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the courses database.');
});

db.serialize(() => {
    db.each('SELECT rowid as id, thing From Stuff', (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.id + ": " + row.thing);
    });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
})


/**
 * App start
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
