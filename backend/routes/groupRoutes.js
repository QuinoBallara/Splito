const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { createGroup, deleteGroup, updateGroup, addExpense, removeExpense, updateExpense, addMember, removeMember, updateMember } = require('../controllers/groupController');

router.post('/', protect, createGroup)

router.delete('/:id', protect, deleteGroup)

router.patch(':id', protect, updateGroup)

router.post(':id/expense', protect, addExpense)

router.delete(':id/:expenseId', protect, removeExpense)

router.patch(':id/:expenseId', protect, updateExpense)

router.post(':id/member', protect, addMember)

router.delete(':id/:userId', protect, addMember)

router.patch(':id/:userId', protect, updateMember)

