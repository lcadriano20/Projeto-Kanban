// CAPTURAR ELEMENTOS 
const tasks = document.querySelectorAll('.tasks li'); 
let draggedTask = null;

for(let i=0;i<tasks.length;i++) {
    const task = tasks[i];

    task.addEventListener('dragstart', function(event){
        draggedTask = task;
        event.dataTransfer.effectAllowed = "move"
        event.dataTransfer.setData("text/html",task.innerHTML);
        task.classList.add('dragging');

        task.addEventListener('dragend',function() {
            draggedTask.classList.remove('dragging')
            draggedTask = null
        })


    })
}
const columns = document.querySelectorAll(".tasks")

for(let i=0; i<columns.length; i++) {
    const column = columns[i]

    column.addEventListener("dragover",function(e) {
        e.preventDefault() 
        e.dataTransfer.dropEffect= "move"
        column.classList.add("dragover")
    });

    column.addEventListener("dragleave",function() {
        column.classList.remove("dragover")

    })
    column.addEventListener("drop", function(e) {
        e.preventDefault()

        const task = document.createElement('li')
        task.innerHTML = e.dataTransfer.getData("text/html")
        task.setAttribute("draggable",true)
        task.addEventListener("dragstart",function(e) {
        draggedTask = task;
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text/html",task.innerHTML);
        task.classList.add('dragging');
        })
        column.appendChild(task)
        column.classList.remove("dragover")

        const previousColumn = draggedTask.parentNode
        previousColumn.removeChild(draggedTask)
        
    })
}

const addTaskForm = document.querySelector("#add-task-form")
const addTaskInput = document.querySelector("input")


function createAndDrag(newTaskText) {
        const newTask = document.createElement("li")
        newTask.textContent = newTaskText
        newTask.setAttribute("draggable",true)
        newTask.addEventListener("dragstart",function(e) {
        draggedTask = newTask;
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text/html",newTask.innerHTML);
        newTask.classList.add('dragging');
        })
        document.querySelector("#todo").appendChild(newTask)

        addTaskInput.value = ""


        
        
}
/*


*/


function createDeleteBtn() {
    const doneTasksUl = document.querySelectorAll('ul')

    doneTasksUl.forEach(task => {
        if(task.id === 'done') {
            const doneLiTasks = document.querySelectorAll('li')
            doneLiTasks.forEach(doneLi =>{
                doneLi.classList.add('done-li')
                const createDeleteButton = document.createElement('button')
                createDeleteButton.classList.add('delete-btn')
                createDeleteButton.textContent = 'Excluir'
                doneLi.appendChild(createDeleteButton)
                

            })
        }
    })  

    
}


function sendForm(e) {
    e.preventDefault()
    const newTaskText = addTaskInput.value.trim()

    if(newTaskText !== "") {
        createAndDrag(newTaskText)
    }
}
addTaskForm.addEventListener("submit",sendForm)
