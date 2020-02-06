const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = "toDos";

let toDos = [];



function deleteTodo(event){
    const btn = (event.target);
    const li = btn.parentNode;
    li.style.transform="translateX(80%)";
    li.style.opacity="0";
    setTimeout(function(){
        toDoList.removeChild(li);
    },700);
    
    
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    recalculaterIndex();
    saveToDos();
    
}

function recalculaterIndex(){
    toDos.forEach(function(toDo, index){
        toDos[index].id = index+1; 
        toDoList.children[index].id = index+1;
    });
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML= "❌";
    delBtn.classList.add("btn");
    delBtn.addEventListener("click", deleteTodo);
    const span = document.createElement('span');
    span.innerText = text;
    const newId = toDos.length + 1;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: toDos.length + 1
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
        
    }
}
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);

}
init();