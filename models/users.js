const {Schema, model} = require('mongoose');

const userSchema = Schema ({
    fname:{
        type: String,
        required: [true, 'First Name is required']
    },
    lname:{
        type: String,
        required: [true, 'Last Name is required']
    },
    alias:{
        type: String,
        required: [true, 'Alias is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required']
    },
    created_date:{
        type: Date,
        default: Date.now
    },
    status:{
        type: Boolean,
        default: true
    }
});

module.exports = model('User', userSchema);