// Enemies our player must avoid
'use strict'
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png'; 
    this.speed = this.setSpeed();
    this.x = -101;
    this.y = this.selectEnemyRow();
};

Enemy.prototype.selectEnemyRow = function() {
    const row = -33 + Math.ceil(Math.random() * 3) * 83;
    return row;
}

Enemy.prototype.setSpeed = function() {
    const minSpeed = 0.5;
    const speed = (Math.random() + minSpeed) * 300;
    return speed;
}

Enemy.prototype.reset = function() {
    this.x = -101;
    this.y = this.selectEnemyRow();
    this.speed = this.setSpeed();
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x = this.x + this.speed * dt
    } else if (this.x > 505) {
        this.reset()
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.startX = 202
    this.startY = -33 + (83 * 5)
    this.x = this.startX
    this.y = this.startY
    this.moveX = 0
    this.moveY = 0
}

Player.prototype.reset = function() {
    this.x = this.startX
    this.y = this.startY
    this.moveX = 0
    this.moveY = 0
}

Player.prototype.update = function() {
    this.x = this.x + this.moveX
    this.y = this.y + this.moveY
    this.moveX = 0
    this.moveY = 0
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        if (this.x >= 101) {
            this.moveX = -101
        } else {
            this.moveX = 0
        }
    } else if (key === 'right') {
        if (this.x <= 303) {
            this.moveX = 101
        } else {
            this.moveX = 0
        }
    } else if (key === 'up') {
        if (this.y >= 133 || this.x === star.x) {
            this.moveY = -83
        } else {
            this.moveY = 0
        }
    } else if (key === 'down') {
        if (this.y <= 299 ) {
            this.moveY = 83
        } else {
            this.moveY = 0
        }
    }
}

// Star that must collect to get more points
var Star = function() {
    this.sprite = 'images/Star.png'
    this.x = randomStar()
    this.y = -33
}

function randomStar() {
    return Math.round(Math.random() * 4) * 101
}

Star.prototype.reset = function() {
    this.x = randomStar()
}

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
function createEnemies() {
    let enemies = []
    const enemyCount = 3
    for(let i = 0; i < enemyCount; i++) {
        const enemy = new Enemy()
        enemies.push(enemy)
    }
    return enemies
}

const allEnemies = createEnemies()
const player = new Player()
const star = new Star()

// Allow player to select their favourite character before game start
const chars = document.getElementsByClassName('char-img')
const currentChar = document.getElementById('current-char')
for (let i = 0; i < chars.length; i++) {
    const char = chars[i]
    const charImg = char.getAttribute('src')

    char.onclick = function(){
        currentChar.src = char.src
        player.sprite = charImg
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});