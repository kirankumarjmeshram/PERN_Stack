const express = require("express");
const app = express();
const cors = require("cors")
const pool = require('./db')

//middleware
app.use(cors());
app.use(express.json());

//CREATE 
app.post("./todos", async (req, res)=>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", [description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
});

// GET ALL
app.get("./todos",async (req, res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    }catch(err){
        console.log(err.message)
    }
})

// GET A TODO
app.get("./todos/:id", async (req, res)=>{
    try {
        const {id} = req.params;
        const toda = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.row[0])
    } catch (error) {
        console.log(error.message);
    }
})


app.listen(5000, ()=>{
    console.log('server has started on port 5000');
})