const taskForm = document.querySelector(".js-form");
    taskInput = taskForm.querySelector("input"),
    pendingList = document.querySelector(".js-pending"),
    finishedList = document.querySelector(".js-finished");

const PENDING_LS = "PENDING",
    FINISHED_LS = "FINISHED";

let pendingArray = [];
let finishArray = [];

let listId = 1;

// Pending에 보여주는 함수
function paintPending(text) {
    // html
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deletBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    const newId = listId;
    listId += 1;
    span.innerText = text;
    deletBtn.innerText = "❌";
    deletBtn.addEventListener("click", deleteTask);
    checkBtn.innerText = "✅";
    checkBtn.addEventListener("click", checkTask);
    li.appendChild(span);
    li.appendChild(deletBtn);
    li.appendChild(checkBtn);
    li.id = newId;
    pendingList.appendChild(li);

    // localstorage
    const taskObj = {
        text: text,
        id: newId
    };
    pendingArray.push(taskObj);
    saveTask(PENDING_LS,pendingArray);
}

// finished에 보여주는 함수
function paintFinish(text){
    // html
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deletBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    const newId = listId;
    listId += 1;
    span.innerText = text;
    deletBtn.innerText = "❌";
    deletBtn.addEventListener("click", deleteTask);
    checkBtn.innerText = "🔙";
    checkBtn.addEventListener("click", backTask);
    li.appendChild(span);
    li.appendChild(deletBtn);
    li.appendChild(checkBtn);
    li.id = newId;
    finishedList.appendChild(li);

    // localstorage
    const taskObj = {
        text: text,
        id: newId
    };
    finishArray.push(taskObj);
    saveTask(FINISHED_LS,finishArray);
}

// check버튼 눌렀을 때 실행되는 함수
function checkTask(event){
    // html
    const btn = event.target;
    const li = btn.parentNode;
    const span =li.firstChild.innerText;
    paintFinish(span);
    pendingList.removeChild(li);

    // localstorage
    const checkedTask = pendingArray.filter(function(task){
        return task.id !== parseInt(li.id); 
    });
    pendingArray = checkedTask;
    saveTask(PENDING_LS, pendingArray);
}

// back버튼을 눌렀을 때 실행되는 함수
function backTask(event){
    // html
    const btn = event.target;
    const li = btn.parentNode;
    const span =li.firstChild.innerText;
    paintPending(span);
    finishedList.removeChild(li);

    // localstorage
    const checkedTask = finishArray.filter(function(task){
        return task.id !== parseInt(li.id); 
    });
    finishArray = checkedTask;
    saveTask(FINISHED_LS, finishArray);
}

// 삭제버튼 눌렀을 때 실행되는 함수
function deleteTask(event){
    const li = event.target.parentNode;
    if(li.parentNode.className == "js-finished"){
        finishedList.removeChild(li);

        const cleanTask = finishArray.filter(function(task){
            return task.id !== parseInt(li.id); 
        });
        finishArray = cleanTask;
        saveTask(FINISHED_LS, finishArray);
    }else{
        pendingList.removeChild(li);

        const cleanTask = pendingArray.filter(function(task){
            return task.id !== parseInt(li.id); 
        });
        pendingArray = cleanTask;
        saveTask(PENDING_LS, pendingArray);
    }
}

// ls에 저장하는 함수
function saveTask(key,data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// localstorage에 있는 값 로드 하는 함수
function loadTask(){
    const loadPending = localStorage.getItem(PENDING_LS),
        loadFinish = localStorage.getItem(FINISHED_LS);
    
    if (loadPending !== null || loadFinish !== null) {
        const parsedPending = JSON.parse(loadPending),
            parsedFinish = JSON.parse(loadFinish);
        
        parsedPending.forEach(function(pending){
            paintPending(pending.text);
        });
        parsedFinish.forEach(function(finish){
            paintFinish(finish.text);
        });
    }

}

// input에 값 입력시 처리하는 함수 
function handleSubmit(event){
    event.preventDefault();
    const currentValue = taskInput.value;
    paintPending(currentValue);
    taskInput.value = "";
}

function init(){
    loadTask();
    taskForm.addEventListener("submit", handleSubmit);
}

init();