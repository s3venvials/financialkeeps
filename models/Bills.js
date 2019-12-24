const mongoose = require('mongoose');
const { Schema } = mongoose;

const billsSchema = new Schema({
    title: String,
    amount: String,
    duedate: { type: Date, default: Date.now },
    isChecked: { type: Boolean, default: false },
    isRecurring: { type: Boolean, default: false },
    transactiontype: { type: String, default: "Manual" },
    paymentperiod: { type: String, default: "PayDay1" },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('bills', billsSchema);