# Projet de jeu Tron en utilisant Cordova

# TOUTES LES COMMANDES DOIVENT ETRE LANCEES AVEC  :
# - launchcordova lancé
# - depuis le dossier projet-Tron 


#### CREATION BASE DE DONNEES ###
mkdir data\db
# Ajouter Websocket
npm install websocket
# Ajouter mongoose
npm install mongoose 
# mongo daemon à lancer depuis un terminal dédié :
mongod --dbpath data\db
# Pour seeder, il faut lancer depuis un nouveau terminal:
node data\seed.js  
# Pour regarder les bases de données depuis le client mongo, lancer la commande : mongo. Puis faire : use TronDB (puis db.users.find(), etc.))
# ###############################

### LANCER LE JEU ###
# Si on ne vient pas de seed et donc de lancer un mongo daemon, le lancer depuis un terminal dédié :
mongod --dbpath data\db
# Lancer le serveur depuis un terminal dédié : 
node Serveur\ServerWS.js
# Déplacez-vous dans le répertoire racine de projet
cd Projet_Tron_Application
# Lancer le jeu dans firefox depuis un terminal dédié :
cordova run browser --target=firefox
# Lancer le jeu dans chrome depuis un terminal dédié :
cd Projet_Tron_Application
cordova run browser --target=chrome
# #########################################
