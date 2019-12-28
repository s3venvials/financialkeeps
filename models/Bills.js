const mongoose = require('mongoose');
const { Schema } = mongoose;

const billsSchema = new Schema({
    title: String,
    amount: String,
    duedate: String,
    isChecked: { type: Boolean, default: false },
    isRecurring: { type: Boolean, default: false },
    transactiontype: { type: String, default: "Manual" },
    paymentperiod: { type: String, default: "Bi - Weekly PayDay1" },
    paid: { type: Boolean, default: false },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('bills', billsSchema);