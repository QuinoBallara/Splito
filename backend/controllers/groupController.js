const Group = require('../models/Group');

const createGroup = async (req, res) => {
    try {
        const group = await Group.create(req.body);
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        await group.remove();
        res.status(200).json({ message: 'Group deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        group.name = req.body.name || group.name;
        group.groupPicture = req.body.groupPicture || group.groupPicture;
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const addExpense = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        group.expenses.push(req.body);
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const removeExpense = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        group.expenses = group.expenses.filter(expense => expense._id != req.params.expenseId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateExpense = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        const expense = group.expenses.find(expense => expense._id == req.params.expenseId);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        expense.description = req.body.description || expense.description;
        expense.amount = req.body.amount || expense.amount;
        expense.paidBy = req.body.paidBy || expense.paidBy;
        expense.date = req.body.date || expense.date;
        expense.split = req.body.split || expense.split;
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const addMember = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        group.members.push(req.body);
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const removeMember = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        group.members = group.members.filter(member => member.user != req.params.userId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateMember = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        const member = group.members.find(member => member.user == req.params.userId);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        member.isAdmin = req.body.isAdmin || member.isAdmin;
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createGroup, deleteGroup, updateGroup, addExpense, removeExpense, updateExpense, addMember, removeMember, updateMember };

