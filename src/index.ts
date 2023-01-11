import { v4 as uuidV4 } from "uuid"


type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
};

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const parentCheckbox = document.getElementById("parent-checkbox") as HTMLInputElement;
const deleteButton = document.getElementById("task-delete-button") as HTMLButtonElement;

const tasks: Task[] = loadTasks()

tasks.forEach(addListItem)



// ? is called optional chaining

form?.addEventListener("submit", e => {

  e.preventDefault();

  if (input?.value == "" || input?.value == null) return

  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(newTask)
  saveTasks()

  addListItem(newTask)
  input.value = "";

})

parentCheckbox?.addEventListener("change", (item) => {
  
  const parentChecboxInput = item.target as HTMLInputElement;

  tickAll(parentChecboxInput)
});

deleteButton.addEventListener("click",() => {

  const allChecked : NodeListOf<Element> = document.querySelectorAll("input[type='checkbox']:checked"); 
  // const taskss = loadTasks();

  

  const idsToRemove = Array.prototype.map.call(allChecked, function(node: Element) {
    return node.id
  });

 
  
  const filteredArray = tasks.filter(obj => !idsToRemove.includes(obj.id));

  console.log(tasks);
  
  console.log(filteredArray); // [{id: 1, name: 'foo'}]
  

  localStorage.setItem("TASKS", JSON.stringify(filteredArray))
 
  
});

function addListItem(task: Task) {

  const parse = Range.prototype.createContextualFragment.bind(document.createRange());
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  const del = document.createElement("del");
  const span = document.createElement("span");

  

  
  
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  checkbox.id = task.id;
  

  
  if(task.completed === true) {
    span.append(del);
    del.append(task.title);
    label.append(checkbox,span);
  }else {
    span.append(task.title);
    label.append(checkbox,span);
  }
  
  item.append(label)
  list?.append(item)


  checkbox.addEventListener("change", (e) => {
    task.completed = checkbox.checked;
    console.log(e.currentTarget,'current target');
    console.log(task);
    
    let span = e.target ;

    console.log(span,'hoooo');
    let w = e.target as Element;
    let y = w.parentElement as Element;
    let b = y.querySelector('span') as Element;

    console.log('asdfasfasf', y,b);
    b.innerHTML = 'asfasf';
    if(task.completed === false){
     
      b.innerHTML = `${task.title}`;
    }else{
      b.innerHTML = `<del>${task.title}</del>`;
    
    }

    saveTasks()
  })

}

function doneTaskDisplay(task : Task,label : HTMLLabelElement,checkbox : Element) : HTMLLabelElement{
  


  return label;

}

function tickAll(parentCheckboxInput : HTMLInputElement ){

  const allItemList: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
  console.log(allItemList);
  let shouldTick = false;

  if(parentCheckboxInput.checked === true) {
    shouldTick = true;
  }

  allItemList.forEach((item) => {
    item.checked = shouldTick;
  })

}



function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}



function loadTasks(): Task[] {

  const taskJson = localStorage.getItem("TASKS")
  if (taskJson == null) return []
  return JSON.parse(taskJson)
}

function deleteAllTask(){
  localStorage.removeItem("TASKS")
}