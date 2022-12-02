# projet-Tron
Projet de jeu Tron en utilisant Cordova

# CREATION BASE DE DONNEES :
# Les commandes sont supposées etre lancées depuis le dossier projet-Tron et avec Launchcordova lancé
mkdir db
# depuis un terminal dédié avec Launchcordova lancé:
mongod --dbpath db 
# depuis le premier terminal:
mongo seed.js  