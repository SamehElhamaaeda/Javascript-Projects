//Arrting Up Varaibles
let InputElement = document.querySelector(".add-task .text");
let AddButton = document.querySelector(".add-task .plus");
let TaskContainer = document.querySelector(".todo-container .tasks-content");
let NoTasks = document.querySelector(".tasks-content .no-task-message");
let TasksCount = document.querySelector(".task-status .tasks-count span");
let CompletedTasks = document.querySelector(
  ".task-status .completed-tasks span"
);
let deleteAll = document.querySelector(".all .delete-All");
let finishAll = document.querySelector(".all .finish-All");
temp = NoTasks;
let TaskArr = [];
if (window.localStorage.getItem("tasks")) {
  TaskArr = JSON.parse(window.localStorage.getItem("tasks"));
  TaskArr.forEach(addTaskToPage);
}
// window.localStorage.clear();
window.load = function () {
  InputElement.focus();
};

//Add new task function
AddButton.onclick = function () {
  const task = {
    title: InputElement.value,
    Finished: false,
  };
  if (InputElement.value === "") {
    swal.fire("There is no data");
  } else if (
    TaskArr.some((existingTask) => existingTask.title === task.title)
  ) {
    console.log("contains");
    swal.fire("Task is already Exist");
  } else {
    //Add New Task To The Arr
    TaskArr.push(task);
    //Trigger Adding Task To Local Storage
    saveChangesToLocalStorage();
    //Trigger Addign Task To The Page
    addTaskToPage(task);
  }
};

document.addEventListener("click", function (e) {
  //Remove task
  if (e.target.className === "delete") {
    // delete task from the Arr
    TaskArr = TaskArr.filter(
      (T) => T.title !== e.target.parentNode.childNodes[0].textContent.trim()
    );
    saveChangesToLocalStorage();
    e.target.parentNode.remove();
    if (TaskArr.length == 0) {
      TaskContainer.appendChild(temp);
    }
    TaksCalc();
  }
  //Finish task
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
    const indexOFTaskToUpdate = TaskArr.findIndex(
      (tas) => tas.title === e.target.childNodes[0].textContent.trim()
    );
    // console.log(indexOFTaskToUpdate);
    TaskArr[indexOFTaskToUpdate].Finished =
      !TaskArr[indexOFTaskToUpdate].Finished;
    saveChangesToLocalStorage();
    // TaskArr
    TaksCalc();
  }
});
//Complete All Tasks Function
finishAll.onclick = function () {
  TL = TaskArr.length;
  if (TL != 0) {
    Tasks = TaskContainer.children;
    console.log(Tasks.length);
    for (var i = 0; i < TL; i++) {
      if (!Tasks[i].classList.contains("finished")) {
        TaskContainer.children[i].classList.add("finished");
      }
      TaskArr[i].Finished = true;
      saveChangesToLocalStorage();
    }
  }
  TaksCalc();
};
//Delete All Tasks
deleteAll.onclick = function () {
  TL = TaskArr.length;
  if (TL != 0) {
    TaskArr = [];
    // document.querySelector()
    TaskContainer.innerHTML = "";
    TaskContainer.appendChild(temp);
  }
  window.localStorage.clear;
};

//calc  Count and Completed Tasks function.
function TaksCalc() {
  TasksCount.innerHTML = TaskArr.length;
  CompletedTasks.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}
//Add Task To local Storage And
function saveChangesToLocalStorage() {
  if (TaskArr.length == 0) {
    window.localStorage.clear();
  } else {
    window.localStorage.setItem("tasks", JSON.stringify(TaskArr));
  }
}
function addTaskToPage(task) {
  NoTasks.remove();
  //Creating the ui elements
  let mainspan = document.createElement("span");
  let deletespan = document.createElement("span");
  let text = document.createTextNode(task.title);
  let deltetext = document.createTextNode("Delete");
  mainspan.appendChild(text);
  deletespan.appendChild(deltetext);
  mainspan.className = "task-box";
  if (task.Finished) {
    mainspan.classList.add("finished");
  }
  deletespan.className = "delete";
  mainspan.appendChild(deletespan);
  TaskContainer.appendChild(mainspan);
  InputElement.value = "";
  InputElement.focus();
  TaksCalc();
}
