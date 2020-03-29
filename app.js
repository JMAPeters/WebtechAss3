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
const db = require('./database');


db.all('SELECT * FROM teachers',[], (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(rows)
})
  


/**
 * App start
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//functie om de database te sluiten als de server wordt afgesloten
function dbclose(){
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
        process.exit();
    })
    
    //sluit na 30 seconden als de database niet gesloten kan worden
    setTimeout(function(){
        console.error("Could not close database, exiting");
        process.exit(1);
    }, 30 * 1000);

}

//interrupt
process.on('SIGINT', dbclose); 

//terminate
process.on('SIGTERM', dbclose);