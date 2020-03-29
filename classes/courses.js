class Course {
    constructor(row, teacher) {
      this.code = row.code;
      this.title = row.title;
      this.program = row.program;
      this.level = row.level;
      this.semester = row.semester;
      this.description = row.description;
      this.teacher = teacher;
    }
    
}

exports.Course = Course;
