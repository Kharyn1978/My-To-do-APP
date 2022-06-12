let popUp = document.getElementById("addTask");
let noTasksAvailable = document.getElementById("noTasksAvailable");
let tasksAvailable = document.getElementById("tasksAvailable");

//if we have tasks
if (localStorage.getItem("formObject") != null && JSON.parse(localStorage.getItem("formObject")).length > 0) {
    let data = localStorage.getItem("formObject");

    showTasks(JSON.parse(data));
    noTasksAvailable.style.display = 'none';
    tasksAvailable.style.display = 'block';
}
else {
    localStorage.removeItem("formObject");
    noTasksAvailable.style.display = 'block';
    tasksAvailable.style.display = 'none';
}

//function for the addTask popUp
function addTask() {
    popUp.style.display = "block";
}

//function for the closeTask popUp
function closeTask() {
    popUp.style.display = "none";
}


//function to populate tasks
function showTasks(element) {
    //first hide the 'no tasks available' div
    noTasksAvailable.style.display = "none";

    //then show 'tasks available' div
    tasksAvailable.style.display = "block";


    //let formObject = JSON.parse(element);

    // let liElement = document.createElement("li");
    // liElement.appendChild(document.createTextNode(element[0].title));
    // document.getElementById("allTasks").appendChild(liElement);

    let allTasksContainer = document.getElementById("allTasks");
    allTasksContainer.innerHTML = "";

    element.forEach(function (item) {
        //create li element
        let liElement = document.createElement("li");

        let liStatus = document.createElement("span");//<span></span>
        liStatus.innerText = "TO DO";//<span>TO DO</span>
        liStatus.setAttribute("class","taskStatus");//<span class="taskStatus">...

        let liText = document.createElement("span");
        liText.innerText = "Title: " + item.title;
        liText.setAttribute("class","taskTitle");

        let liDesc = document.createElement("span");
        liDesc.innerText = "Description: " + item.description;
        liDesc.setAttribute("class","taskDesc");

        let liDate = document.createElement("span");
        liDate.innerText = "Date: " + item.date;
        liDate.setAttribute("class","taskDate");

        //create "mark as done" and "remove" buttons
        let markAsDoneButton = document.createElement("button");
        markAsDoneButton.innerText = "Mark as done";
        markAsDoneButton.setAttribute("onclick","markTask(this,"+ item.status +")");

        let removeTaskButton = document.createElement("button");
        removeTaskButton.innerText = "Remove";
        removeTaskButton.setAttribute("onclick","removeTask(this)");

        liElement.append(liStatus,liText,liDesc,liDate);
        //<li>
        //<span class="taskStatus">TO DO</span>
        //....
        //</li>

        //add buttons
        liElement.append(markAsDoneButton,removeTaskButton);

        allTasksContainer.appendChild(liElement);
        // document.getElementsByClassName("listText").innerHTML = element.title;
        console.log('here');
    });
}

//function for the saving The Task
function saveTask() {
    let form = document.getElementById("taskForm");

    let taskTitle = form.elements["title"].value;
    let taskDescription = form.elements["description"].value;
    let taskDate = form.elements["date"].value;

    //new array to store info from localStorage, if we have it
    let allTasksArray = [];
    if (localStorage.getItem("formObject") != null) {
        allTasksArray = JSON.parse(localStorage.getItem("formObject"));
        // console.log(allTasksArray);
        // console.log(JSON.parse(localStorage.getItem("formObject")));
    }

    //our new task
    let formObject = {
        title: taskTitle,
        description: taskDescription,
        date: taskDate,
        status: false
    };

    //now we push the new task in the array
    allTasksArray.push(formObject);
    console.log('allTasksArray',allTasksArray);

    localStorage.setItem("formObject",JSON.stringify(allTasksArray));
    //send the object to showTasks function
    showTasks(allTasksArray);
}

//function to remove task
function removeTask(thisTask) {
    
    //get the specific task name/info
    let child = thisTask.parentNode;
    let parent = child.parentNode;

    //get the index of the item to remove, that is aligned to the data in localStorage
    let indexToRemove = Array.prototype.indexOf.call(parent.children, child);

    //check if the localStorage exists AND that it has data (more than 0)
    if (localStorage.getItem("formObject") != null && JSON.parse(localStorage.getItem("formObject")).length > 0) {

        //create temp array, remove item, then add this array as new localStorage
        let temp = JSON.parse(localStorage.getItem("formObject"));
        console.log(temp);

        temp.forEach(function (item, index) {
            if(index === indexToRemove){
                temp.splice(index, 1);
            }
        });

        localStorage.setItem("formObject",JSON.stringify(temp));
        showTasks(temp);

    }
    else {
        //clear the storage
        localStorage.removeItem("formObject");
    }


    //show the correct screen if all items are removed
    if (JSON.parse(localStorage.getItem("formObject")).length > 0) {
        localStorage.removeItem("formObject");
        noTasksAvailable.style.display = 'block';
        tasksAvailable.style.display = 'none';
    }

}

function markTask(thisTask, currentFlag) {

    //get the specific task name/info
    let child = thisTask.parentNode;
    let parent = child.parentNode;

    //get the index of the item to change, that is aligned to the data in localStorage
    let indexToChange = Array.prototype.indexOf.call(parent.children, child);
console.log(thisTask, child,parent);

    if (!currentFlag) {
        child.getElementsByClassName("taskStatus").innerHTML = "DONE";
         //create temp array, change item, then add this array as new localStorage
        let temp = JSON.parse(localStorage.getItem("formObject"));

        temp.forEach(function (item, index) {
            if(index === indexToChange){
                item.status = true;
            }
        });

        localStorage.setItem("formObject",JSON.stringify(temp));
        showTasks(temp);
        console.log(child.getElementsByClassName("taskStatus"));
    }
}
