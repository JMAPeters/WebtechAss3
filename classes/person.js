class Person{
    constructor(id, lastName, firstName){
        this.id= id;
        this.lastName = lastName;
        this.firstName = firstName;
    }
}

class Teacher extends Person{
    constructor(photo){
        super();
        this.photo = photo; 
    }    
}

class Student extends Person{
    constructor(program, level, password){
        super();
        this.program = program; 
        this.level = level;
        this.password = password;
    }
}

exports.Person = Person; 
exports.Teacher = Teacher; 
exports.Student = Student; 

