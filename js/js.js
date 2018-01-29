
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var plCanvas = document.getElementById('player');
var ctxPl = plCanvas.getContext('2d');

var blt = document.getElementById('bullet');
var ctxBlt = blt.getContext('2d');

var enCanvas = document.getElementById('enemy');
var ctxEn = enCanvas.getContext('2d');

var bg = new Image();
bg.src = 'img/bg.png';

var pl = new Image();
pl.src = 'img/pla.png';

var en = new Image();
en.src = 'img/enemy.png'

var player = {
	pos: [600,472]
}

var enemy = {
	pos: [1300, 472]
}

var requestFrame = 	window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame;

var bullets1 = [];
var bullets = [];
var side = true;

var gameWidth = 1300;
var gameHeight = 650;
var heroWidth = 125;
var heroHeight = 125; 
var sx = 0; 
var sy = 0; 
var enSx = 0;
var enSy = 0; 
var b = 0;
var b1 = 0;
canvas.width = gameWidth;
canvas.height = gameHeight;
plCanvas.width = gameWidth;
plCanvas.height = gameHeight;
blt.width = gameWidth;
blt.height = gameHeight;
enCanvas.width = gameWidth;
enCanvas.height = gameHeight;

function Enemy() {

}

document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    switch(e.keyCode) {
    	case 39: { 
    		side = true;
    		sy = 0;
    		if(player.pos[0]<canvas.width-120){
	    		if(sx<=625){
	    		player.pos[0] += 25;
	    		sx +=125;
	    		} else {
	    			player.pos[0] += 25;
	    			sx = 125;
	    		}
    		}
    	}
    	break;
    	case 37: {
    		side = false;
    		sy = 125;
    		if(player.pos[0]>0){
	    		if (sx<625) {
	    			sx+=125;
	    			player.pos[0] -= 25;
	    		} else  {
	    			sx = 125;
	    			player.pos[0] -=25;
	    		}
    		}
    	}
    	break;
    	case 40: { //jump

    	}
    	break;
    	case 38: { // crouch

    	}
    	break;
    	case 32: {
    		if(side){
	    		bullets.push('+');
	    			bullets[b] = new Bullet(player.pos[0], player.pos[1]);	 
	    			b++;
	    	} else {
	    			bullets1[b1] = new Bullet(player.pos[0], player.pos[1]);
	    			b1++;
	    	}
	    }
	    default: 
	    if(side)
	    sx = 0; 
		else sx = 750;
    }
}

 function draw() {
	ctxPl.clearRect(0,0, gameWidth, gameHeight);
	ctx.drawImage(bg, 0,0);
	ctxPl.drawImage(pl, sx, sy, heroWidth, heroHeight, player.pos[0], player.pos[1], heroWidth, heroHeight);
}

function Bullet(x, y) {
	this.x = x;
	this.y = y;
}

function drawBullet() {
	ctxBlt.beginPath();
	for(var i=0; i<bullets.length; i++){
    ctxBlt.arc(bullets[i].x + 101, bullets[i].y + 42, 4, 0, Math.PI*2);
    ctxBlt.fillStyle = "#FF9900";
    ctxBlt.fill();
    ctxBlt.closePath();
}
}

function drawBullet1() {
	ctxBlt.beginPath();
	for(var i=0; i<bullets1.length; i++){
    ctxBlt.arc(bullets1[i].x + 29, bullets1[i].y + 42, 4, 0, Math.PI*2);
    ctxBlt.fillStyle = "#FF9900";
    ctxBlt.fill();
    ctxBlt.closePath();
	}
}
function drawEnemy() {
	ctxEn.clearRect(0,0, gameWidth, gameHeight);
	ctxEn.drawImage(en, enSx, enSy, heroWidth, heroHeight, enemy.pos[0], enemy.pos[1], heroWidth, heroHeight);
	if(enSx < 625)
	enSx += 125; 
	else enSx = 125;
	enemy.pos[0] -= 25;
}

function checkKill() {
	for(var i = 0; i<bullets.length; i++) {
		if(bullets[i].x >= enemy.pos[0] - 10 &&bullets[i].x <= enemy.pos[0] + 20) {
			delete bullets[i].x;
			delete bullets[i].y;
			}
		}

	for(var i = 0; i<bullets1.length; i++) {
		if(bullets1[i].x >= enemy.pos[0] && bullets1[i].x <= enemy.pos[0]+ 45) {
			delete bullets1[i].x;
			delete bullets1[i].y;
			}
		}
}

function init(){
	draw();
	requestFrame(init); 
	ctxBlt.clearRect(0,0, gameWidth, gameHeight);	
	for(var i = 0; i<bullets.length; i++){
		bullets[i].x = bullets[i].x + 10;
	}
	drawBullet();
	for(var i = 0; i<bullets1.length; i++){
		bullets1[i].x = bullets1[i].x - 10;
	}
	drawBullet1();
	checkKill();
}
init();

setInterval(drawEnemy, 325);
