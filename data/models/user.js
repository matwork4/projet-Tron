const mongoose = require('mongoose');

//MODEL USER
//schema pour user
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    nbWins:{
        type:Number
    },
})

//Création d'un model user
const User = mongoose.model('User', userSchema);
module.exports = User