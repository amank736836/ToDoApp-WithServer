const add = document.getElementById('add');
const task = document.getElementById('task');
const ul = document.getElementById('ul');

task.addEventListener("keydown",(e) => input(e));
add.addEventListener("click",  (e) => input(e));

function input(e){
    if( (e.keyCode==13 ||  e.target.id=="add") && (task.value.trim()=="" )){
        // alert("Please enter values correctly");
    }else if(e.keyCode==13 ||  e.target.id=="add"){
        add_Function();
    }
}

async function add_Function(){
    const obj = {
        task : task.value,
        id : Date.now()
    }
    await fetch('/addtodo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });
    AddTask(obj);
};

function AddTask(obj){

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = obj.task;
    li.appendChild(span);
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.addEventListener('click', async () => {
        await fetch(`/deletetodo?id=${obj.id}`);
        ul.removeChild(li);
    });
    li.appendChild(button);
    ul.appendChild(li);

}

async function fetch_data() {
    const res = await fetch('/gettodo');
    const data = await res.json();
    data.forEach((item) => {
        AddTask(item);
    });
}

fetch_data();