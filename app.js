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
const dbfunction = require('./databasefunctions');

//dbfunction.createDatabase("INFOB3CC","Concurrency", "Computer Science", "BSc", 2, "A course about Concurrency", "Trevor McDonell");
//dbfunction.createDatabase("INFOB2WT", "Webtechnologie", "Computer Science",  "BSc", 2, "A course about Web technologie", "Sergey");
//dbfunction.displayDatabase();
//var data = dbfunction.getData('SELECT teacher FROM courses WHERE code = "INFOB3CC"');
//console.log(data);
//updateData("UPDATE Concurrency SET courseTeacher = Gerard");




/**
 * App start
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));