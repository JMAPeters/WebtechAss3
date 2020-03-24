class Course {
    constructor(title, program, level, semester, description, teacherName, teacherPhoto) {
      this.title = title;
      this.program = program;
      this.level = level;
      this.semester = semester;
      this.description = description;
      this.teacherName = teacherName;
      this.teacherPhoto = teacherPhoto;
    }
    
}

exports.Course = Course;