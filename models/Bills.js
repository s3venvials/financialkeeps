const mongoose = require('mongoose');
const { Schema } = mongoose;

const billsSchema = new Schema({
    title: String,
    amount: String,
    duedate: Date,
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('bills', billsSchema);