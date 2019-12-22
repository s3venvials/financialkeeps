const mongoose = require('mongoose');
const { Schema } = mongoose;

const billsSchema = new Schema({
    title: String,
    amount: String,
    duedate: { type: Date, default: new Date() },
    isChecked: { type: Boolean, default: false },
    isReocuring: { type: Boolean, default: false },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('bills', billsSchema);