function loadCourses(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getcourses", true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        var toDisplay = JSON.parse(xhttp.responseText);
        //var toDisplay = filterSearch(JSON.parse(xhttp.responseText));
        displayrows(toDisplay, 0);
        }
    };
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify({
        //hier moeten de waarden uit de form komen
    }))
}

function displayrows(courses, pageNb){
    var table = document.getElementById("coursetable");

    var j = pageNb;
    for (let i = 0; i < 10 + j * 10 ; i++) {
        var tr = document.createElement("TR");
        var tdTitle = document.createElement("TD");
        var a = document.createElement('a');
        var title = document.createTextNode(courses[i].title);
        
        //creating clickable link to specific course
        a.appendChild(title);
        a.title = courses[i].title;
        a.href = "course/" + courses[i].code;
        tdTitle.appendChild(a); 

        var tdProgram = document.createElement("TD");
        var program = document.createTextNode(courses[i].program);
        tdProgram.appendChild(program);
        var tdSemester = document.createElement("TD");
        var semester = document.createTextNode(courses[i].semester);
        tdSemester.appendChild(semester);
        var tdLevel = document.createElement("TD");
        var level = document.createTextNode(courses[i].level);
        tdLevel.appendChild(level);

        tr.appendChild(tdTitle);
        tr.appendChild(tdProgram);
        tr.appendChild(tdSemester);
        tr.appendChild(tdLevel);

        table.appendChild(tr);
    }
}

function filterSearch(courses){
    //receives an array with all the existing courses
    //acces propersties by using courses[i].iets (title, semester, etc)
    //use forloop to go through all

    for (let i = 0; i < courses.length; i++) {
        
        
    }
}