const express = require('express');
const router = express();
const todo = require('../controllers/todo');


router.get('/', todo.homeController)

router.get('/addTodo', todo.addTodoFormController)

router.get('/updateTodo', todo.updateTodoFormController)

router.get('/deleteTodo', todo.deleteTodoPageController)

router.post("/addTodo", todo.addTodoController)

router.post("/updateTodo/:id", todo.updateTodoController)

router.get('/confirmDelete', todo.deleteTodoController)

module.exports = router