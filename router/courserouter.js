const app = require('express')
const router = app.Router()
const {Course} =require( "../classes/courses.js")

router.get('/', function (req, res) {
    const courses = [
        new Course(1,'Applied Games', 'Information Sciences', 3, 1, 'This is a course about games', 'John Doe', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.werkaandemuur.nl%2Fnl%2Fwerk%2FShiba-inu%2F366573&psig=AOvVaw3OUpV27Tp7n5AzPypkUwvx&ust=1585145365643000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJj09-iks-gCFQAAAAAdAAAAABAD')

    ];
    res.render('home', {courses: courses});
})

router.get('/course/:courseId', function (req, res) {
    
    // res.send(req.params.courseId)
    const id = req.params.courseId;
    const course = new Course(id,'Applied Games', 'Information Sciences', 3, 1, 'This is a course about games', 'John Doe', 'https://image.shutterstock.com/image-photo/cute-dog-pug-breed-have-260nw-719412469.jpg')

    res.render('course', {course: course});
})

module.exports = router