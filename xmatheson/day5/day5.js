//Import expressJS module
const express = require('express');

// Create an epxress application object
const app = express()

app.set("view engine", "ejs");

class GameMatch {
  constructor() {
    this.id = gameList.length + 1000;
    this.turn = 0; //index of this.players whose turn it is
    this.players = [];
    this.round = 0;
  }
}

class Character {
  constructor(name, race, profession) {
    this.id = characterList.length + 1000;
    this.name = name
    this.race = race
    this.profession = profession
    this.equipment = {
      head: {},
      chest: {},
      legs: {},
      arm_p: {},
      arm_s: {}
    }
    this.inventory = []
    this.abilities = []
    this.stats = {
      attack: 1,
      defense: 10,
      speed: 5,
      hp_current: 43,
      hp_max: 43
    }
    //This method searches for an item in the itme list with this name
    //And adds it to this character's inventory
    this.pickupItem = function(searchName) {
      console.log(this);
      for (var item of item_list) {
        console.log(item.name);
        if (item.name == searchName) {
          console.log("Found a match!");
          this.inventory.push(item);
          break;
        }
      }
    }
    //This method searches for a given slot and overwrites
    //it with an empty object
    this.unequipItem = function(slot) {
      for (var slotName in this.equipment) {
        console.log(slotName);
        if (slotName == slot) {
          console.log("Found item slot. Removing.");
          this.equipment.slotName = {};
          break;
        }
      }
    }
  }
}

//var characterList = []
//characterList.push(new Character('Aeonium', 'Fairy', 'Rogue'))

// This holds all possible items
var item_list = [{
    name: 'Gun',
    slot: 'arm_p',
    bonuses: {
      attack: 17
    }
  },
  {
    name: 'Shield',
    slot: 'arm_s',
    bonuses: {
      defense: 3
    }
  }
];

//create character list with 2 default characters

var gameList = []
var characterList = []
characterList.push(new Character('Gunter', 'Owl', 'Ranger'))
characterList.push(new Character('Aeonium', 'Fairy', 'Rogue'))

for (var character of characterList) {
  character.pickupItem('Gun');
}
characterList[0].pickupItem('Gun');

// Create a GET endpoint
app.get('/game', (req, res) => {
  //search for the game in the gamelist
  var foundGame = gameList.find(game => game.id == req.query.gameid)
  //if a game was found, we can manipulate it
  if (foundGame) {
    //check to see if the user sent the addcharacter query param (&addcharacter=xxxx)
    if (req.query.addcharacter) {
      //check to see if there is room in this game's player list to add a character
      if (foundGame.players.length < 2) {
        //find the character with the given addcharacter id
        var foundProfile = characterList.find(character => character.id == req.query.addcharacter)
        //if the character exists, add its id to this game's character list
        if (foundProfile) {
          foundGame.players.push(foundProfile.id)
        }
      }
    }
    //render template called 'game' from views folder
    //and send it a variable called sendData
    res.render('game', {
      sendData: foundGame
    })
  } else {
    res.redirect('/newgame');
  }
});

//this endpoint creates a new game
app.get('/newgame', (req, res) => {
  gameList.push(new GameMatch())
  res.redirect('/game/?gameid=' + gameList[gameList.length - 1].id)
})

// Create a GET endpoint
app.get('/profile', (req, res) => {
  var foundProfile = characterList.find(character => character.id == req.query.characterid)
  if (foundProfile) {

    //render template called 'profile' from views folder and send it a variable called sendData
    res.render('profile', {
      sendData: foundProfile
    })
  } else {
    res.redirect('/newProfile');
  }
});

//this endpoint creates a new character
app.get('/newProfile', (req, res) => {
  //characterList.push(new Character('Gunter', 'Owl', 'Ranger'))
  res.redirect('/profile/?characterid=' + characterList[characterList.length - 1].id)
})

//Start an http listen server
app.listen(3000);
