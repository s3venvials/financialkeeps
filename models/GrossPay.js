const mongoose = require('mongoose');
const { Schema } = mongoose;

const grosspaysSchema = new Schema({
    amount: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('grosspays', grosspaysSchema);