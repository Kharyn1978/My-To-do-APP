let popUp = document.getElementById("addTask");
let noTasksAvailable = document.getElementById("noTasksAvailable");
let tasksAvailable = document.getElementById("tasksAvailable");

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

    let taskTitle = form.elements["title"].value;
    let taskDescription = form.elements["description"].value;
    let taskDate = form.elements["date"].value;

    let formObject = {
        title: taskTitle,
        description: taskDescription,
        date: taskDate
    }

    localStorage.setItem("formObject",JSON.stringify(formObject));

    showTasks(formObject);
}

//function to populate tasks
function showTasks(element) {
    //first hide the 'no tasks available' div
    noTasksAvailable.style.display = "none";

    //then show 'tasks available' div
    tasksAvailable.style.display = "block";
}

