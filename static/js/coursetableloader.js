function loadCourses(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        //JSON.Parse function for search filtering 
        var toDisplay = JSON.parse(xhttp.responseText);
        //Array met alle objecten 
        //courses[i].iets
        console.log(JSON.parse(xhttp.responseText))
        displayrows(toDisplay, 0);
        }
    };
    xhttp.open("GET", "/getcourses", true);
    xhttp.send();
}

function displayrows(courses, pageNb){
    var table = document.getElementById("coursetable");

    var j = pageNb;
    for (let i = 0; i < 10 + j * 10 ; i++) {
        var tr = document.createElement("TR");
        var tdTitle = document.createElement("TD");
        var title = document.createTextNode(courses[i].title);
        tdTitle.appendChild(title);
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