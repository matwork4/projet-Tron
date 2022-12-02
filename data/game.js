const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    usersId: {
        type:Array,
    },
    winner :{

    },
    date:{
        type:String
    }
})

const Game = mongoose.model('Game', gameSchema);
module.exports = Game