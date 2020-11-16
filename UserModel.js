const mongoose = require('mongoose');
// create a UserSchema model by requiring the module
const UserSchema = require('./UserSchema');

// model based on the imported schema
const User = mongoose.model('User', UserSchema); 

// export model
module.exports = User; 
