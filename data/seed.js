const mongoose = require('mongoose');
const User = require('models/user');
const GameDB = require('models/game');
mongoose.connect('mongodb://localhost:27017/TronDB');

const seedDB = async() =>{
    //Ajout d'users
    const seedUser = [
        {
            username : "toto",
            password : "totomdp",
            nbWin: 4
        },
        {
            username : "bibi",
            password : "bibimdp",
            nbWin : 13
        },    
        {
            username : "ouioui",
            password : "ouiouimdp",
            nbWin : 42
        }
    ]
    await User.insertMany(seedUser);
    //recuperation des users pour qu'ils soient réferencés dans les games
    bibi = await User.findOne({username : "bibi"});
    toto = await User.findOne({username : "toto"});
    ouioui = await User.findOne({username : "ouioui"});

    //Ajout de games
    const seedGames=[
        {
            usersId : [toto._id, bibi._id, ouioui._id],
            winner : toto._id,
            date : new Date(2022, 11, 17, 3, 52, 0).toJSON()
        },
        {
            usersId : [toto._id, bibi._id],
            winner : toto._id,
            date : new Date(2022, 11, 19, 4, 24, 5).toJSON()
        },
        {
            usersId : [toto._id, bibi._id],
            winner : bibi._id,
            date : new Date(1995, 11, 22, 8, 44, 0).toJSON()
        }
    ];
    await GameDB.insertMany(seedGames)
}

seedDB().then(()=>{
    mongoose.connection.close();
})