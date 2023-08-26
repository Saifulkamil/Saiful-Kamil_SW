const express = require('express');
const router = express.Router();
const helper = require(__class_dir + '/helper.class.js');
const _user = require(__module_dir + '/task.module.js');

router.post('/', async (req, res) => {
    const addUser = await _user.add(req.body);
    helper.sendResponse(res, addUser);
});

router.get('/', async (req, res) => {
    const allUsers = await _user.getAll();
    res.json(allUsers);
});

router.put('/', async (req, res) => {
    const { id, username, password } = req.body;
    const updateUser = await _user.update(id, { username, password });
    res.json(updateUser);
});

router.delete('/', async (req, res) => {
    const { id } = req.body;
    const deleteUser = await _user.delete(id);
    res.json(deleteUser);
});

router.post('/todo', async (req, res) => {
    const { userId, title, description } = req.body;
    const createTodo = await _user.createTodo(userId, { title, description });
    helper.sendResponse(res, createTodo);
});

router.get('/todo/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userTodos = await _user.getUserTodos(userId);
    helper.sendResponse(res, userTodos);
});

router.put('/todo/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    const { title, description } = req.body;
    const updateTodo = await _user.updateTodo(todoId, { title, description });
    helper.sendResponse(res, updateTodo);
});

router.delete('/todo/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    const deleteTodo = await _user.deleteTodo(todoId);
    helper.sendResponse(res, deleteTodo);
});


module.exports = router;
