const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static("."));
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

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});