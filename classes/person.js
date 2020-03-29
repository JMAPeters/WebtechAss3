class Person{
    constructor(id, lastName, firstName){
        this.id= id;
        this.lastName = lastName;
        this.firstName = firstName;
    }
}

class Teacher extends Person{
    constructor(id, lastName, firstName, photo){
        super(id, lastName, firstName);
        this.photo = photo; 
    }    
}

class Student extends Person{
    constructor(id, lastName, firstName, program, level, password){
        super(id, lastName, firstName);
        this.program = program; 
        this.level = level;
        this.password = password;
    }
}

exports.Person = Person; 
exports.Teacher = Teacher; 
exports.Student = Student; 

