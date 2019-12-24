    
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  googleId: String,
  newuser: { type: Boolean, default: true },
  grosspay: { type: Number, default: 0.00 },
  netpay: { type: Number, default: 0.00 },
  frequencyofpay: { type: Number, default: 2 }
});

mongoose.model('users', userSchema);