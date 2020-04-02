const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport, getUserByStudentNumber){
    const authenticateUser = async function (studentNumber, password, done) {
        const user = getUserByStudentNumber(studentNumber)
        if (user == null){
            return done(null, false, {message: "No user with that student number."})
        }

        try{
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else{
                return done(null, false, {message: "Password incorrect"})
            }
        } catch (err) {
            return done(err)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'studentNumber'}, authenticateUser))
    passport.serializeUser(function (user, done) { })
    passport.deserializeUser(function (id, done) { })
}

module.exports = initialize