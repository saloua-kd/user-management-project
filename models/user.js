const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userRoles = ['Admin', 'Salary'];
const userStates = ['active', 'inactive'];

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        default: 0,
    }
},{timestamps:true, versionKey:false});

module.exports = mongoose.model('users', UserSchema);