let livesScore = document.querySelector('.lives-count');
let totScore = document.querySelector('.score-count');
let keysScore = document.querySelector('.keys-count');

class Game {
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = Math.floor(Math.random() * 500) + 100;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemy class inherits Game entities
class Enemy extends Game {
    constructor(x, y, speed) {
        super(x, y, speed);
        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {
        this.x += this.speed * dt;
        if (this.x >= 505) {
            this.x = -100;
            this.speed = Math.floor(Math.random() * 500) + 100;
        }
        if (player.x < this.x + 60 && player.x + 60 > this.x && player.y < this.y + 25 && player.y + 30 > this.y) {
            player.resetPlayer();
            player.lives -= 1;
            gameOver();
            livesScore.innerHTML = player.lives;    
        }
    }
}

// Player class inherits Game entities
class Player extends Game {
    constructor(x, y, score, lives, winKey) {
        super(x, y);
        this.score = 0;
        this.lives = 3;
        this.winKey = 0;
        this.sprite = 'images/char-boy.png';
        livesScore.innerHTML = this.lives;
        totScore.innerHTML = this.score;
        keysScore.innerHTML = this.winKey;
    }

    update(dt){
        if (this.key === 'left' && this.x > 0) {
            this.x -= 100;
        }
        if(this.key === 'right' && this.x < 400){
            this.x += 100;
        }
        if(this.key === 'down' && this.y < 340){
            this.y += 85;
        }
        if(this.key === 'up'){
            this.y -= 85;
            if (this.y < -85) {
                this.resetPlayer();
                this.score += 1;
                totScore.innerHTML = this.score;
            }
        }
        this.key = 0;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
    }
    resetPlayer() {
        this.x = 200;
        this.y = 400;
    }

    handleInput(key) {
        this.key = key;
    }

}

class Keys extends Game {
    constructor(x, y) {
        super(x,y);
        this.sprite = 'images/Key.png';
    }

    update() {
        if(player.x < this.x + 50 && player.x + 50 > this.x && player.y < this.y + 50 && player.y + 75 > this.y) {
            this.x = Math.floor(Math.random() * 5) * 100;
            this.y = Math.floor(Math.random() * 5) * 90;
            player.winKey += 1;
            win();
            keysScore.innerHTML = player.winKey;
        }
    }
}

class Heart extends Game {
    constructor(x,y) {
        super(x,y);
        this.sprite = 'images/Heart.png'
    }

    update() {
        if(player.x < this.x + 50 && player.x + 50 > this.x && player.y < this.y + 50 && player.y + 75 > this.y) {
            this.x = Math.floor(Math.random() * 5) * 100;
            this.y = Math.floor(Math.random() * 5) * 90;
            player.lives += 1;
            livesScore.innerHTML = player.lives;
        }
    }
}

let allEnemies = [];

const gameOver = () => {
    if (player.lives <= 0) {
        swal({
        closeOnEsc: false,
        closeOnClickOutside: false,
        title: 'Well Played..!!',
        text: 'No more lives.',
        icon: 'error',
        button: 'Play again!'
        }).then(function (isConfirm) {
            if (isConfirm) {
                newGame();
            }
        })
    }
}

let displayEnemy = () => {
    allEnemies.push(new Enemy(0, 55));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 225));
}

let newGame = () => {
    player.lives = 3;
    player.score = 0;
    player.winKey = 0;
    totScore.innerHTML = player.score;
    livesScore.innerHTML = player.lives;
    keysScore.innerHTML = player.winKey;
    player.resetPlayer();
}

let win = () => {
    if(player.winKey === 8){
        swal({
        closeOnEsc: false,
        closeOnClickOutside: false,
        title: 'Well Played..!!',
        text: 'You WON..',
        button: 'Play again!'
        }).then(function (isConfirm) {
            if (isConfirm) {
                newGame();
            }
        })
    }
}

let newHeart = new Heart(200,200);
let objKey = new Keys(100, 200);
let player = new Player(200, 400);

displayEnemy();

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


