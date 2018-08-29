//menu.js
//import {getSavedGames} from './menu/menuService';

const INVALID_ENTRY = 'Invalid Entry';
const CONNOT_EXIT = "Cannot Exit The Game At This Time";
const MENU_SELECTION = "Menu Selection";
const NO_SAVED_GAMES = "No Saved Games";

const menuServices = {
    startNewGame : function(){
        return "Game Started";
    },
    getSavedGames : function(){
        return "No Saved Games";
    },
    exit : function(){
        return "Exiting";
    }
};

const array={
    '0' : {
        'key' : 'New Game',
        'error' : INVALID_ENTRY,
        'success' : menuServices.startNewGame()
    },
    '1' : {
        'key' : 'Continue',
        'error' : NO_SAVED_GAMES,
        'success' : menuServices.getSavedGames()
    },
    '2' : {
        'key' : 'Exit',
        'error' : CONNOT_EXIT,
        'success' : menuServices.exit()
    }
};

function clearErrorMessage(){
    setErrorMessage('');
}

function setErrorMessage(message){
    document.getElementById('menuError').innerText = message;
}

function promptInvalid(invalidSelection){
    setErrorMessage(INVALID_ENTRY + " " + invalidSelection);
}

function menuItemSelect(input = -1){
    console.log(input);
    clearErrorMessage();
    array[input] ? array[input] : promptInvalid(MENU_SELECTION);
    if (input === 0){ //If New Game
        startGame();
    }
    else if(input === 1) { //If Continue
        //const menuService = require('./menu/menuService');
        let val = NO_SAVED_GAMES//getSavedGames(); // val is "Hello" 
        //console.log(val);
        promptInvalid(array[input].error);
    }
}

function startGame(){
    window.location.href = "./html/game.html";
}