const add = document.getElementById('add');
const task = document.getElementById('task');
const ul = document.getElementById('ul');
add.addEventListener('click', async () => {
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

    const li = document.createElement('li');
    li.textContent = task.value;
    ul.appendChild(li);

});

async function fetch_data() {
    const res = await fetch('/gettodo');
    const data = await res.json();
    data.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.task;
        ul.appendChild(li);
    });
}

fetch_data();