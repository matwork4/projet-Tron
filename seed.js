//Création de la base de données
conn = new Mongo("localhost:27017");
db = conn.getDB("TronDB");

//SEEDING
//Ajout de users
Users = db.getCollection("Users")
Users.insertMany([
    {
        "username" : "toto",
        "password" : "totomdp",
        "nbWin" : 4
    },
    {
        "username" : "bibi",
        "password" : "bibimdp",
        "nbWin" : 13
    },    
    {
        "username" : "ouioui",
        "password" : "ouiouimdp",
        "nbWin" : 42
    }
])
// recuperation des users pour qu'ils soient référencés dans les games par la suite
var toto = db.Users.findOne({username:"toto"});
var bibi = db.Users.findOne({username:"bibi"});
var ouioui = db.Users.findOne({username:"ouioui"});

//Ajout de games
Games = db.getCollection("Games")
Games.insertMany([
    {
        "usersId" : [toto._id, bibi._id, ouioui._id],
        "winner" : toto._id,
        "date" : new Date(2022, 11, 17, 3, 52, 0).toJSON()
    },
    {
        "usersId" : [toto._id, bibi._id],
        "winner" : toto._id,
        "date" : new Date(2022, 11, 19, 4, 24, 5).toJSON()
    },
    {
        "usersId" : [toto._id, bibi._id],
        "winner" : bibi._id,
        "date" : new Date(1995, 11, 22, 8, 44, 0).toJSON()
    }
])