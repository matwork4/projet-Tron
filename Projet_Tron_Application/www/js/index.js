/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

// Cordova is now initialized. Have fun!
const ws = new WebSocket('ws://127.0.1:9898/');

ws.onopen = function () {
    console.log("client connecté");
    //on vérifie si le client était en pleine partie la derniere fois qu'il s'est déconnecté
    let gameId = window.localStorage.getItem('gameId');
    if (gameId == null)
        return;
    //Le client s'est déconnecté en pleine partie. Il demande au serveur les informations nécessaires pour réinitialiser son jeu
    let message = {
        type : 'returnToGame',
        gameId : gameId,
        playerId : window.localStorage.getItem('id')
    }
    ws.send(JSON.stringify(message));
};

/***** RECEPTION D'UN MESSAGE PROVENANT DU SERVEUR *****/
ws.onmessage = function (e) {
    let serverMessage = JSON.parse(e.data);
    switch (serverMessage.type) {
        // LOGIN
        case "login":
            console.log("feedback concernant login : " + serverMessage.feedback)
            if (serverMessage.feedback == "success") {
                ui.displayMainMenuView();
                window.localStorage.setItem('id', serverMessage.id);
            }
            break;

        // LOBBY
        case "lobby":
            // Le lobby est plein, on lance le jeu
            if (serverMessage.isLobbyFull) {
                ui.displayGameView();
                //Sauvegarde de la game id dans le local storage du navigateur
                window.localStorage.setItem('gameId', serverMessage.gameId);
                //demarrage de la partie 
                jeu.init(serverMessage.dim, serverMessage.ids);
                jeu.start();
            } // le lobby n'est pas encore plein, on affiche simplement la vue du lobby
            else {
                ui.displayLobbyView();
            }
            break;

        //MOUVEMENT D'UN JOUEUR
        case "move":
            // on change la direction d'un joueur 
            movingPlayer = jeu.players.find(player => player.id == serverMessage.playerId);
            movingPlayer.setDirection(serverMessage.direction);
            break;

        // LE SERVEUR A ENVOYE L'ETAT DE JEU D'UN AUTRE JOUEUR DE LA PARTIE
        case "sendGame":
            ui.displayGameView();
            //redémarrage de la partie grace aux données d'un autre client transmises par le serveur
            jeu.initFromOtherPlayer(serverMessage.grille, serverMessage.players);
            jeu.start();
            break;

        // LE SERVEUR DEMANDE L'ETAT DE LA PARTIE
        case "askGame":
            let message = {
                type : 'sendGame',
                grille : jeu.T.tab,
                players : jeu.players
            }
            ws.send(JSON.stringify(message));
            break;
    }
};
/*******************************************************/

