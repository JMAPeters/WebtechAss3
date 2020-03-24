const app = require('express')
const router = app.Router()
const {Course} =require( "./../classes/courses.js")

router.get('/', function (req, res) {
    const courses = [
        new Course('Applied Games', 'Information Sciences', 3, 1, 'This is a course about games', 'John Doe', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.werkaandemuur.nl%2Fnl%2Fwerk%2FShiba-inu%2F366573&psig=AOvVaw3OUpV27Tp7n5AzPypkUwvx&ust=1585145365643000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJj09-iks-gCFQAAAAAdAAAAABAD')

    ]; console.log(courses)
    res.render('home', {courses: courses});
})

module.exports = router