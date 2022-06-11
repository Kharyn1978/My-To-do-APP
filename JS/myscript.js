let popUp =  document.getElementById("addTask");

//function for the addTask popUp
function addTask() {
    popUp.style.display = "block";
}

//function for the closeTask popUp
function closeTask() {
    popUp.style.display = "none";
}

//function for the saving The Task
function saveTask() {
    let form = document.getElementById("taskForm");

    let title = form.elements["title"].value;
    let description = form.elements["description"].value;
    let date = form.elements["date"].value;
    
    console.log(title);
}

