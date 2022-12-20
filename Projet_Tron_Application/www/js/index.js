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

ws.onopen = function() {
    console.log("Le client s'est connecté");
};

// MESSAGE DU SERVEUR
ws.onmessage = function(e) {
    let serverMessage = JSON.parse(e.data);
    switch (serverMessage.type){
        case "login" :
            console.log(serverMessage.feedback);
            break;
    }
};

// Test d'envoi au serveur
function envoyer(){
    ws.send('test ???');
}

//Event Listener pour se login
const loginButton = document.getElementById('loginButton');
const username = document.getElementById('usernameInput');
const password = document.getElementById('passwordInput');
loginButton.addEventListener('click', logSubmit);
function logSubmit(event) {
    let message ={
        type : 'login',
        username : username.value,
        password : password.value
    }
    ws.send(JSON.stringify(message));
}