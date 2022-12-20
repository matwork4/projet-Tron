# Projet de jeu Tron en utilisant Cordova

# TOUTES LES COMMANDES DOIVENT ETRE LANCEES AVEC  :
# - launchcordova lancé
# - depuis le dossier projet-Tron 


#### CREATION BASE DE DONNEES ###
mkdir data\db
# mongo daemon à lancer depuis un terminal dédié :
mongod --dbpath data\db
# Pour seeder, il faut lancer depuis un terminal dédié:
node data\seed.js  
# (Pour regarder les bases de données depuis le client mongo, il faut faire : use TronDB (puis db.users.find() etc.))
# ###############################

### LANCER LE JEU ###
# Lancer le serveur depuis un terminal dédié : 
node Serveur\ServerWS.js
# Lancer le jeu dans firefox depuis un terminal dédié :
cd Projet_Tron_Application
cordova run browser --target=firefox
# Lancer le jeu dans chrome depuis un terminal dédié :
cd Projet_Tron_Application
cordova run browser --target=chrome
# #########################################