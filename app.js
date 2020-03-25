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

//createDatabase("Concurrency", "INFOB3CC", "Trevor");
//createDatabase("Webtech", "INFOB2WT", "Sergey");
//displayDatabase("Concurrency");
//displayDatabase("Webtech");
//var data = getData("SELECT courseName FROM Webtech");
//updateData("UPDATE Concurrency SET courseTeacher = Gerard");




/**
 * App start
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));