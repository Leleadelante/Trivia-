// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
      attempts: { type: Number, default: 0 },
        lastAttempt: { type: Date, default: null },
        });

        module.exports = mongoose.model('User', userSchema);