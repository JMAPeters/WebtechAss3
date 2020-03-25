class Course {
    constructor(id, title, program, level, semester, description, teacherName, teacherPhoto) {
      this.id = id;
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