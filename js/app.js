 // These varibales store the character entities of our project
var allEnemies = [];
var players = ['images/char-boy.png',
               'images/char-cat-girl.png',
               'images/char-horn-girl.png',
               'images/char-pink-girl.png',
               'images/char-princess-girl.png',
               'images/Char_hip_boy.png',

             ];


// Enemies our player must avoid
// This class contains defines the enemy bug
var Enemy = function() {
    this.yPosition = [60, 145, 230, 315];
    this.speed = [100, 130, 160, 200, 250, 300, 400];
    this.x = 0;
    this.y = this.yPosition[Math.floor(Math.random()* this.yPosition.length)];
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var glide = this.speed[Math.floor(Math.random()* this.speed.length)]
    this.x = (dt * glide) + this.x;
    this.block = 0; // will be used for collision detection

    //When the enemy runs over the canvas window, update it to a new starting position
    // Update the speed... give a random value to it.
    if (this.x > 910){
      this.y = this.yPosition[Math.floor(Math.random()* this.yPosition.length)];
      this.x = 0.1;
      glide = this.speed[Math.floor(Math.random()* this.speed.length)];
    }

    // Detecting collision between an enemy and player
    if (this.x > -50 && this.x < 50) {
      this.block = 0;
    } else if (this.x > 50 && this.x < 150) {
      this.block = 101;
    } else if (this.x > 150 && this.x < 250) {
      this.block = 202;
    } else if (this.x > 250 && this.x < 350) {
      this.block = 303;
    } else if (this.x > 350 && this.x < 450) {
      this.block = 404;
    } else if (this.x > 450 && this.x < 550) {
      this.block = 505;
    } else if (this.x > 550 && this.x < 650) {
      this.block = 606;
    } else if (this.x > 650 && this.x < 750) {
      this.block = 707;
    } else if (this.x > 750 && this.x < 850) {
      this.block = 808;
    } else if (this.x > 850) {
      this.block = 0;
    }

    if (player.x === this.block && player.y === this.y) {
      player.reset();
      life.decrease();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player class definition
var Player = function(){
  this.sprite = players[Math.floor(Math.random()* players.length)]
  this.x = 404;
  this.y = 400;
}

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// a handleInput() method for handling key presses
Player.prototype.handleInput = function(key){
  if(key === 'left' && this.x > 0){
    this.x -= 101;
  }
  else if(key === 'right' && this.x < 808){
    this.x += 101;
  }
  else if(key === 'up'){
    if(this.y < 100){
      this.reset();
      life.decrease();
    }
    else{
        this.y -= 85;
    }
  }
  else if(key === 'down' && this.y < 400){
    this.y += 85;
  }
};

// Reset the player to the original position
Player.prototype.reset = function(){
  this.x = 404;
  this.y = 400;
};


// Rock class
var Rock = function(){
  var xPos = [0, 101, 202, 303, 404, 505, 606, 707, 808];
  var yPos = [60, 145, 230, 315];
  this.x = xPos[Math.floor(Math.random() * xPos.length)];
  this.y = yPos[Math.floor(Math.random() * yPos.length)];
  this.sprite = 'images/Rock.png';

};

// Rendering the rock
Rock.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Updating the rock position
Rock.prototype.update = function(){
  if(player.x === this.x && player.y === this.y){
    rock = new Rock();
    gamescore.update(rock);
  }
};


// Class definition for Gem object
var Gem = function(){
  var xPos = [0, 101, 202, 303, 404, 505, 606, 707, 808];
  var yPos = [60, 145, 230, 315];
  var gems = ['images/Gem Blue.png', 'images/Gem Orange.png', 'images/Gem Green.png'];
  this.x = xPos[Math.floor(Math.random() * xPos.length)];
  this.y = yPos[Math.floor(Math.random() * yPos.length)];
  this.sprite = gems[Math.floor(Math.random() * gems.length)];
};

Gem.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.update = function(){
  if(player.x === this.x && player.y === this.y){
    jewel = new Gem();
    gamescore.update(jewel);
  }
};

// Function takes care of the score while playing the game
var Score = function(){
  this.score = 0;
  this.x = 0;
  this.y = 30;
};

// Renders the score in the screen
Score.prototype.render = function(){
  ctx.beginPath();
  ctx.fillStyle = "#222";
  ctx.fillRect(this.x, 0, 200, 30);
  ctx.fillStyle = "#dfa778";
  ctx.font = '30px Times';
  ctx.fillText("Score: "+ this.score, this.x, this.y);
};


Score.prototype.reset = function(){
  ctx.clearText();
}

Score.prototype.update = function(obj){
  if(obj === rock){
      this.score += 1;
  }
  else if(obj === jewel){
    this.score += 4;
  }
  this.render();
  if(this.score % 25 === 0){
    allEnemies.push(new Enemy());
  }
};

// This class takes care of the lives a player has
var Life = function(){
  this.sprite = 'images/Life.png',
  this.numLives = 5;
}

Life.prototype.render = function(){
      this.x = 650;
      ctx.beginPath();
      ctx.fillStyle = "#222";
      ctx.fillRect(650, 0, 300, 50);

      for(var j = 0; j < this.numLives; j++){
        ctx.drawImage(Resources.get(this.sprite), this.x, 0);
        this.x += 50;
      }
};

Life.prototype.decrease = function(){
  this.numLives = this.numLives - 1;
}


// Below is the code for instantiation of the classes defined above

// Place all enemy objects in an array called allEnemies
var bug = new Enemy();
allEnemies.push(bug);

// Create each object of different type
var rock = new Rock();
var jewel = new Gem();
var player = new Player();
var gamescore = new Score();

var life = new Life();



// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
