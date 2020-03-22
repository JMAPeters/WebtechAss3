const app = require('express')
const router = app.Router()

router.get('/', function (req, res) {
    res.render('home', { title: 'Hey', message: 'Hello there!' });
})

module.exports = router