const User = require('../data/models/user')

// Objet qui permet de gérer l'authentification
authentication = {
    // Ce qui sera retourné par handle()
    result : {
        type : 'login',
        feedback : ""
    },

    /*
    * Gère une demande de connection par un client de manière async pour pouvoir utiliser des await
    * @clientMessageData : le message envoyé par le client au serveur
    * Retourne la réponse à envoyer au client
    */
    async handle(clientMessageData){
        if (clientMessageData.password == ""){
            this.result.feedback = "le mot de passe est vide"
            return JSON.stringify(this.result);
        }       
        if (clientMessageData.username == ""){
            this.result.feedback = "l'username est vide"
            return JSON.stringify(this.result);
        }
        let user = await User.findOne({username : clientMessageData.username}).exec();
        if (user != null){
            if (user.password != clientMessageData.password){
                this.result.feedback = "le mot de passe est incorrect"
                return JSON.stringify(this.result);
            }
            // vérifier si l'utilisateur est déjà connecté ?
        }else{
            // si l'user n'existe pas, on ajoute l'username et le password à la base de données
            user = new User({
                username : clientMessageData.username, 
                password : clientMessageData.password, 
                nbWins : 0
            });
            user.save()
        }    
        this.result.feedback = "success"
        this.result.id = user.id
        return JSON.stringify(this.result);
    }
}

module.exports = authentication