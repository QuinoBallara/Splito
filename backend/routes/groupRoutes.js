const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { createGroup, deleteGroup, updateGroup, addExpense, removeExpense, updateExpense, addMember, removeMember, updateMember } = require('../controllers/groupController');


/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new group
 *     description: Creates a new group with the provided details.
 *     tags:
 *       - Groups
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the group
 *               groupPicture:
 *                 type: string
 *                 description: URL of the group picture
 *     responses:
 *       201:
 *         description: Group created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', protect, createGroup);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a group
 *     description: Deletes the group with the specified ID.
 *     tags:
 *       - Groups
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group to delete
 *     responses:
 *       200:
 *         description: Group deleted successfully
 *       404:
 *         description: Group not found
 *       400:
 *         description: Bad request
 */
router.delete('/:id', protect, deleteGroup);

/**
 * @swagger
 * /{id}:
 *   patch:
 *     summary: Update a group
 *     description: Updates the group details for the specified ID.
 *     tags:
 *       - Groups
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the group
 *               groupPicture:
 *                 type: string
 *                 description: New URL of the group picture
 *     responses:
 *       200:
 *         description: Group updated successfully
 *       404:
 *         description: Group not found
 *       400:
 *         description: Bad request
 */
router.patch('/:id', protect, updateGroup);

/**
 * @swagger
 * /{id}/expense:
 *   post:
 *     summary: Add an expense to a group
 *     description: Adds a new expense to the specified group.
 *     tags:
 *       - Expenses
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group to add the expense to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Description of the expense
 *               amount:
 *                 type: number
 *                 description: Amount of the expense
 *               paidBy:
 *                 type: string
 *                 description: User who paid for the expense
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the expense
 *     responses:
 *       201:
 *         description: Expense added successfully
 *       404:
 *         description: Group not found
 *       400:
 *         description: Bad request
 */
router.post('/:id/expense', protect, addExpense);

/**
 * @swagger
 * /{id}/{expenseId}:
 *   delete:
 *     summary: Remove an expense
 *     description: Deletes the specified expense from the group.
 *     tags:
 *       - Expenses
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group
 *       - in: path
 *         name: expenseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the expense to delete
 *     responses:
 *       200:
 *         description: Expense removed successfully
 *       404:
 *         description: Group or expense not found
 *       400:
 *         description: Bad request
 */
router.delete('/:id/:expenseId', protect, removeExpense);

/**
 * @swagger
 * /{id}/{expenseId}:
 *   patch:
 *     summary: Update an expense
 *     description: Updates the details of a specified expense in the group.
 *     tags:
 *       - Expenses
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group
 *       - in: path
 *         name: expenseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the expense to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Updated description
 *               amount:
 *                 type: number
 *                 description: Updated amount
 *               paidBy:
 *                 type: string
 *                 description: Updated payer
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Updated date
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       404:
 *         description: Group or expense not found
 *       400:
 *         description: Bad request
 */
router.patch('/:id/:expenseId', protect, updateExpense);

/**
 * @swagger
 * /{id}/member:
 *   post:
 *     summary: Add a member to a group
 *     description: Adds a new member to the specified group.
 *     tags:
 *       - Members
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID of the new member
 *               isAdmin:
 *                 type: boolean
 *                 description: Whether the new member is an admin
 *     responses:
 *       201:
 *         description: Member added successfully
 *       404:
 *         description: Group not found
 *       400:
 *         description: Bad request
 */
router.post('/:id/member', protect, addMember);

/**
 * @swagger
 * /{id}/{userId}:
 *   delete:
 *     summary: Remove a member from a group
 *     description: Removes the specified member from the group.
 *     tags:
 *       - Members
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID of the member to remove
 *     responses:
 *       200:
 *         description: Member removed successfully
 *       404:
 *         description: Group or member not found
 *       400:
 *         description: Bad request
 */
router.delete('/:id/:userId', protect, removeMember);

/**
 * @swagger
 * /{id}/{userId}:
 *   patch:
 *     summary: Update a group member
 *     description: Updates the details of a specified group member.
 *     tags:
 *       - Members
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID of the member to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isAdmin:
 *                 type: boolean
 *                 description: Updated admin status
 *     responses:
 *       200:
 *         description: Member updated successfully
 *       404:
 *         description: Group or member not found
 *       400:
 *         description: Bad request
 */
router.patch('/:id/:userId', protect, updateMember);

