const form = document.querySelector(".js-form");
input = form.querySelector("input"),
pendingList = document.querySelector(".js-pending"),
finishedList = document.querySelector(".js-finished");

const TASK_LS = 'task';

let tasks = [];


function deleteTask(event){
    const deleteLi = event.target.parentNode;
    const deleteUl = deleteLi.parentNode.className;
    if(deleteUl === "js-pending") {
        pendingList.removeChild(deleteLi);
    }else{
        finishedList.removeChild(deleteLi);
    }
    const cleanTask = tasks.filter(function(task){
        return task.id !== parseInt(deleteLi.id); 
    });
    tasks = cleanTask;
    saveTask();
    // 페이지 새로고침
    window.location.reload();
}

function saveTask(){
    localStorage.setItem(TASK_LS, JSON.stringify(tasks));
}

function paintTask(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deletBtn = document.createElement("button");
    let checkBtn = document.createElement("button");
    const newId = tasks.length + 1;
    span.innerText = text;
    deletBtn.innerText = "❌";
    deletBtn.addEventListener("click", deleteTask);
    checkBtn.innerText = "✅";
    // checkBtn.classList.add("checkBtn");
    checkBtn.addEventListener("click", checkedTask);
    li.appendChild(span);
    li.appendChild(deletBtn);
    li.appendChild(checkBtn);
    li.id = newId;
    pendingList.appendChild(li);
    
    const taskObj = {
        text: text,
        id: newId
    };
    tasks.push(taskObj);
    saveTask();
}

function checkedTask(event){
    const checkBtn = event.target;
    const checkLi = event.target.parentNode;
    const checkUl = checkLi.parentNode.className;
    if(checkUl === "js-pending") {
        checkBtn.innerText = "🔙";
        finishedList.appendChild(checkLi);
    }else{
        checkBtn.innerText = "✅";
        pendingList.appendChild(checkLi);
    }
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintTask(currentValue);
    input.value = "";
}

function loadTask() {
    const loadTask = localStorage.getItem(TASK_LS);
    if(loadTask !== null){
        const parsedTasks = JSON.parse(loadTask);
        parsedTasks.forEach(function(task){
            paintTask(task.text);
        });
    }
}

function init(){
    loadTask();
    form.addEventListener("submit", handleSubmit);
}

init();