// Créer le canevas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
// make canvas fill the window (use window.inner* for full viewport)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.querySelector("#gameBox").appendChild(canvas);

// keep canvas size in sync with window and keep player inside bounds
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (typeof player !== 'undefined') {
        player.x = Math.min(player.x || 0, Math.max(0, canvas.width - player.width));
        player.y = Math.min(player.y || 0, Math.max(0, canvas.height - player.height));
    }
});


//Charger les sprites
// Image d'arrière-plan
var bgReady = false;
var bgImage = new Image();
bgImage.src = "img/background.png";
bgImage.onload = function () {
    bgReady = true; 
};

// Estampe gagnant
var winReady = false;
var winImage = new Image(); 
winImage.src = "img/win.png"; 
winImage.onload = function () {
    winReady = true; 
};
// Game Over frame image
var overReady = false;
var overImage = new Image();
overImage.src = "img/over.png";
overImage.onload = function () {
	overReady = true;
};

// Image du joueur
var playerReady = false;
var playerImage = new Image(); 
playerImage.src = "img/player.png"; 
playerImage.onload = function () {
    playerReady = true; 
};

// Image des goodies
var goodyReady = false;
var goodyImage = new Image(); 
goodyImage.src = "img/goody.png";
goodyImage.onload = function () {
    goodyReady = true; 
};

// Image des baddies
var badReady = false;
var badImage = new Image();
badImage.src = "img/baddy.png";
badImage.onload = function () {
  badReady = true;
};



// Créer des objets de jeu globaux 
var player = {
    speed : 5, // mouvement en pixels par tick 
    width: 110,   // a little bigger than before
    height: 110  // increased height
};

var goodies = [ // ceci est un tableau (array)
    { width: 56, height: 56 }, 
    { width: 56, height: 56 },
    { width: 56, height: 56 },
    { width: 56, height: 56 }
];

var baddies = [
  // this is an array
  { width: 66, height: 56 }, 
  { width: 66, height: 56 }, 
  { width: 66, height: 56 }  
];

//New variable to check if we have lost! We set the value in init()
var gameOver;


// Variables to hold the levels and points
var lvl;
var pts;

// Variables de vitesse
var vX = 0;
var vY = 0;


// Gérer les commandes du clavier
addEventListener("keydown", function (e) {
    //Touches
    if (e.keyCode == 38) { // HAUT
        vX = 0;
        vY = -player.speed;
    }
    if (e.keyCode == 40) { // BAS
        vX = 0;
        vY = player.speed;
    }
    if (e.keyCode == 37) { // GAUCHE
        vX = -player.speed;
        vY = 0;
    }
    if (e.keyCode == 39) { // DROITE
        vX = player.speed;
        vY = 0;
    }
    if (e.keyCode == 32) { // ARRÊT barre d’espace
        vX = 0;
        vY = 0;
    }
}, false);

// Gérer les commandes tactiles
addEventListener("touchstart", function (e) {
    if (e.target.id == "uArrow") { // HAUT
        vX = 0;
        vY = -player.speed;
    }
    else if (e.target.id == "dArrow") { // BAS
        vX = 0;
        vY = player.speed;
    }
    else if (e.target.id == "lArrow") { // GAUCHE
        vX = -player.speed;
        vY = 0;
    }
    else if (e.target.id == "rArrow") { //DROIT
        vX = player.speed;
        vY = 0;
    }
    else { // ARRÊT S’arrête si vous touchez ailleurs
        vX = 0;
        vY = 0;
    }
});


//Définir l'état initial
var init = function () {
    //Mettre le joueur au centre
    player.x = (canvas.width - player.width) / 2; 
    player.y = (canvas.height - player.height) / 2;

    //Placez des goodies à des endroits aléatoires 
    for (var i in goodies) {
        goodies[i].x = (Math.random() * (canvas.width - goodies[i].width));
        goodies[i].y = (Math.random() * (canvas.height - goodies[i].height));
    }
    	//Everything we do for the goodies, we must do for the baddies
	for (var i in baddies) {
		baddies[i].x = (Math.random() *
			(canvas.width - baddies[i].width));
		baddies[i].y = (Math.random() *
			(canvas.height - baddies[i].height));
	}
    	//Start at level 1 and with zero points
	lvl = 1;
	pts = 0;

	// Set the gameOver variable to false
	gameOver = false;
};



// La boucle de jeu principale
var main = function () {
    if (checkLevel()) {
        //Instead of winning when all goodies are grabbed
        //We Reset the goodies and...
        // use the same slightly larger size when spawning new goodies
        goodies.push({ width: 56, height: 56, x: Math.random() * (canvas.width - 56), y: Math.random() * (canvas.height - 56) });
        goodies.push({ width: 56, height: 56, x: Math.random() * (canvas.width - 56), y: Math.random() * (canvas.height - 56) });
        goodies.push({ width: 56, height: 56, x: Math.random() * (canvas.width - 56), y: Math.random() * (canvas.height - 56) });

        // remove previous baddies so old ones despawn, then spawn new baddies at random positions
        baddies.length = 0; // clear existing baddies (despawn old ones)
        baddies.push({ width: 66, height: 56, x: Math.random() * (canvas.width - 66), y: Math.random() * (canvas.height - 56) });
        baddies.push({ width: 66, height: 56, x: Math.random() * (canvas.width - 66), y: Math.random() * (canvas.height - 56) });
        baddies.push({ width: 66, height: 56, x: Math.random() * (canvas.width - 66), y: Math.random() * (canvas.height - 56) });
    }
    else {
        if (gameOver) {
            // Use the same display code as the winner: draw the win image centered
            if (winReady) {
                ctx.drawImage(winImage,img/lost.png,
                    (canvas.width - winImage.width) / 2,
                    (canvas.height - winImage.height) / 2);
            }
        }
        else {
            //Pas encore gagné, jouer le jeu
            //déplacer le joueur
            if (player.x > 0 && player.x < canvas.width - player.width) {
                player.x += vX;
            }
            else {
                player.x -= vX;
                vX = -vX; //bounce
            }
            if (player.y > 0 && player.y < canvas.height - player.height) {
                player.y += vY
            }
            else {
                player.y -= vY;
                vY = -vY; //bounce
            }
            //vérifier les collisions
            for (var i in goodies) {
                if (checkCollision(player,goodies[i])) {
                    goodies.splice(i,1);
                }
            }
            
            //Collision with the baddies
            for (var i in baddies) {
                if (checkCollision(player,baddies[i])) {
                    gameOver = true; /// Game is Over
                }
            }
        }
    }
    render();
    window.requestAnimationFrame(main);
};


// Dessinez le tout
var render = function () {
    if (bgReady) {
        // draw background to cover the canvas without stretching (maintain aspect ratio, crop if necessary)
        var imgW = bgImage.width, imgH = bgImage.height;
        var scale = Math.max(canvas.width / imgW, canvas.height / imgH); // cover
        var drawW = imgW * scale, drawH = imgH * scale;
        var drawX = (canvas.width - drawW) / 2;
        var drawY = (canvas.height - drawH) / 2;
        ctx.drawImage(bgImage, drawX, drawY, drawW, drawH);
    }
    if (playerReady) {
        // draw player scaled to player.width / player.height
        ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    }
    if (goodyReady)
        for (var i in goodies) {
        // draw goody scaled to its width/height
        ctx.drawImage(goodyImage, goodies[i].x, goodies[i].y, goodies[i].width, goodies[i].height);
    }
            //Again, same thing for baddies
    if (badReady) {
        for (var i in baddies) {
            // draw baddy scaled to its width/height
            ctx.drawImage(badImage, baddies[i].x, baddies[i].y, baddies[i].width, baddies[i].height);
        }
    }

    //Label
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "20pt Helvetica";
    ctx.fillText("Level: "+lvl, 32, 32);
    ctx.fillText("Points: "+pts, 32, 64);
};

//Fonction générique pour vérifier les collisions 
var checkCollision = function (obj1,obj2) {
    if (obj1.x < (obj2.x + obj2.width) && 
        (obj1.x + obj1.width) > obj2.x && 
        obj1.y < (obj2.y + obj2.height) && 
        (obj1.y + obj1.height) > obj2.y
        ) {
            return true;
    }
};

//Check if we get to next level (same as the old checkWin)
var checkLevel = function () {
	if (goodies.length > 0) { 
		return false;
	} else { 
		return true;
	}
};

//Démarrer le jeu
init();
window.requestAnimationFrame(main);