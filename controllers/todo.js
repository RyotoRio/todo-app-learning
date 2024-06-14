const Todo = require('../models/Todo');
const moment = require('moment');


const homeController = async (req, res, next) => {
    try {
        const todos = await Todo.find().sort({
            createdAt: -1
        });

        res.locals.moment = moment;

        res.render('index', {
            title: "List Todo",
            todos
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const addTodoFormController = (req, res, next) => {
    try {
        res.render('add-todo', {
            title: "New Todo"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateTodoFormController = async (req, res, next) => {
    try {
        const {id} = req.query;
        const todo = await Todo.findById(id)

        res.render('update-todo', {
            title: "Update Todo", todo
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteTodoPageController = (req, res, next) => {
    try {
        const {id} = req.query;
        res.render('delete-todo', {
            title: "Delete Todo",
            id
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const addTodoController = async (req, res, next) => {
    try {
        const {
            title,
            descript
        } = req.body;

        const newTodo = new Todo({
            title,
            descript
        });
        await newTodo.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const updateTodoController = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const {title, descript} = req.body;

        const todo = await Todo.findById(id);
        if(!todo){
            return res.status(404).json({message: "Todo Not Found"})
        }

        todo.title = title;
        todo.descript = descript;
        await todo.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteTodoController = async (req, res, next) => {
    try {
        const {id, confirm} = req.query;

        if (confirm == "yes"){
            await Todo.findByIdAndDelete(id);
        }

        res.redirect("/");
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    homeController,
    addTodoFormController,
    updateTodoFormController,
    deleteTodoPageController,
    addTodoController,
    updateTodoController,
    deleteTodoController
};