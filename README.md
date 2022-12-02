# projet-Tron
Projet de jeu Tron en utilisant Cordova

# CREATION BASE DE DONNEES :
# Les commandes sont supposées etre lancées depuis le dossier projet-Tron et avec Launchcordova lancé
mkdir data\db
# mongo daemon à lancer depuis un terminal dédié :
mongod --dbpath data\db
# depuis le premier terminal:
node data\seed.js  