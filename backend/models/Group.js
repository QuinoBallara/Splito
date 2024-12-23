const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SplitSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    share: { type: Number, required: true }
});

const ExpenseSchema = new Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    paidBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    split: [SplitSchema]
});

const MemberSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isAdmin: { type: Boolean, default: false }
});

const GroupSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    groupPicture: { type: String },
    members: [MemberSchema],
    expenses: [ExpenseSchema]
});

module.exports = mongoose.model('Group', GroupSchema);