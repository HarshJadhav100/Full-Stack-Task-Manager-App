const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();
const auth = require('../middleware/auth');
require('dotenv').config();


router.get('/',auth,async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.json(tasks);
    } catch (error) {
        res.json({ message: 'Error fetching tasks', error: error.message });
    }});

router.post('/', auth, async (req, res) => {
    try{
        const expense = new Task({ ...req.body, user: req.userId });
        await expense.save();
        res.json({ message: 'Task created successfully' });
    }catch (error) {
        res.json({ message: 'Error creating task', error: error.message });
    }   
});

router.delete('/:id', auth, async (req, res) => {
    try{
        const tasks = await Task.findByIdAndDelete(req.params.id);
        if (!tasks) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' }); 

    }catch (error) {
        res.json({ message: 'Error deleting task', error: error.message });


    }

});


router.put('/:id', auth, async (req, res) => {
    try{
        const tasks = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tasks) {
            return res.status(404).json({ message: 'Task not found' });
        }           
        res.json({ message: 'Task updated successfully', task: tasks });

    }catch (error) {
        res.json({ message: 'Error updating task', error: error.message });
    }
});

module.exports = router;


