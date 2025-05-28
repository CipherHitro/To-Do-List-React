const express = require('express')
const router = express.Router();
const { handleAddTodo, handleDeleteTodo, handleMarkCompleteTodo,handleGetAllTodos,handleDeleteAllTodo,handleDeleteFinishedTodo} = require('../controller/todo')

router.get('/', handleGetAllTodos);
router.post('/', handleAddTodo);
router.delete('/delete/:id', handleDeleteTodo);
router.delete('/all', handleDeleteAllTodo);
router.delete('/finished', handleDeleteFinishedTodo);
router.patch('/:id', handleMarkCompleteTodo);

module.exports = router
