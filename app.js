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
//createDatabase("Webtech", "INFOB2WT", "Sergey");
//dbfunction.displayDatabase("INFOB3CC");
//displayDatabase("Webtech");
var data = dbfunction.getData("SELECT title FROM INFOB3CC");
//updateData("UPDATE Concurrency SET courseTeacher = Gerard");




/**
 * App start
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));