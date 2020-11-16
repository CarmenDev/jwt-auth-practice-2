const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ( {
    name: { type: String, required: false },
    email: { type: String, required: true },
    hash: { type: String, required: true }
});

module.exports = UserSchema;