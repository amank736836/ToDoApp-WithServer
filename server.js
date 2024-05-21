const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "todo.html"));
});

app.post("/addtodo", (req, res) => {
    console.log(req.body);  
    let arr = [];

    try{
        let data = fs.readFileSync("todo.txt");
        if(data.length > 0) {
            arr = JSON.parse(data);
        }
    }catch(err){
        fs.writeFileSync("todo.txt", "");
    }finally{
        arr.push(req.body);
        fs.writeFileSync("todo.txt", JSON.stringify(arr));
    }

    res.send(req.body);
});

app.get("/gettodo", (req, res) => {
    let data = fs.readFileSync("todo.txt");
    res.send(data);
});

app.get('/deletetodo', (req, res) => {
    let data = fs.readFileSync("todo.txt");
    let arr = JSON.parse(data);
    arr = arr.filter((item) => {
        return item.id != req.query.id;
    });
    fs.writeFileSync("todo.txt", JSON.stringify(arr));
    res.send("deleted");
});

app.get('/updatetodo', (req, res) => {
    let data = fs.readFileSync("todo.txt");
    let arr = JSON.parse(data);
    arr = arr.map((item) => {
        if(item.id == req.query.id){
            item.task = req.query.task;
        }
        return item;
    });
    fs.writeFileSync("todo.txt", JSON.stringify(arr));
    res.send("updated");
});

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});

