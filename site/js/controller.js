var controller, player, loop, block;
// define canvas for repeated usage
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// draw background on canvas
const bg = document.getElementById("bg");

// draw player
const img = document.getElementById('player');

canvas.width  = window.innerWidth * .8;
canvas.height = 600;

function drawBG() {
    ctx.drawImage(bg, 0,0, canvas.width, 600);
}

// create sprite for block
blockImg = new Image();
blockImg.src = "img/marioBlk.png";

function createSpr (options) {
    var spr = {};
    // create references based on argument
    spr.context = options.context;
    spr.width = options.width;
    spr.height = options.height;
    spr.image = options.image;

    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = 0,
    numberOfFrames = options.numberOfFrames || 1;

    spr.loop = options.loop;
    spr.update = function () {

        tickCount += 1;
			
        if (tickCount > ticksPerFrame) {
        
        	tickCount = 0;
        	// If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {
            // Go to the next frame
            frameIndex += 1; 
        } else if (blk.loop) {
            frameIndex = 0;
            }
        }
    }; 
    spr.render = function () {
         // Draw the animation
         spr.context.drawImage(
        spr.image,
        frameIndex * blk.width / numberOfFrames,
        0,
        blk.width / numberOfFrames,
        blk.height,
        0,
        0,
        blk.width / numberOfFrames,
        blk.height);
    }

    return spr;
}
var blk = createSpr({
    context:  ctx,
    width: 100,
    height: 100,
    image: blockImg
});
// create the player object
// define the player's height, width, detect jump movement current location on axis and speeds for both the x and y-axis

 // var for player image

 blk.render();

player = 
{
    height: 150,
    jumping: true,
    width: 150,
    x: 0,
    x_spd: 0,
    y: 0,
    y_spd: 0,
    dx: 0,
    dy: 0
};

function drawPlayer() {
    ctx.drawImage(img, player.x, player.y, player.width, player.height);

}
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function newPos() {
    player.x += player.dx;
    player.y += player.dy;

  }

function update() {
    clear();
    newPos();
    drawBG();
    drawPlayer();
    requestAnimationFrame(update);
}
update();

// define controller logic

controller =
{
    // set each button press to false by default unless used
    left: false,
    right: false,
    up: false,
    keyListener:function(event)
    {
        var keyState = (event.type == "keydown")?true: false;
        // check which button is being pressed and change the state
        switch(event.keyCode) {

            case 37: // left key
                controller.left = keyState;
                break;
            case 38: // up key
                controller.up = keyState;
                break;
            case 39: // right key
                controller.right = keyState;
                break;

        }
        
    }
}
// control how movement is handled whenever these buttons are pressed
loop = function() {
    // check if the up button is pressed AND check if the player is already jumping(false)
    if (controller.up && player.jumping == false) {
    // set the build up of speed for a jump and change the state of the player to jumping
        player.y_spd -= 50;
        newPos();
        player.jumping = true;
    }
    // check if the left button is down and gradually build up speed in increments of 1.5
    if (controller.left) {
        player.x_spd -= 1.5;
    }
    // check if the right button is down and gradually build up speed in increments of 1.5
    if (controller.right) {
        
        player.x_spd += 1.5;
        
    }

    player.y_spd += 1.8 * .85;    // set the gravity
    player.x += player.x_spd;   // set speed to players current position for x
    player.y += player.y_spd;   // set speed to players current position for y
    player.x_spd *= 0.85;    // set the friction of the ground for x 
    player.y_spd *= 0.85;    // set the friction of the ground for y

    // check if player falls below the ground-- collision detection
    if (player.y > 400) {  // 400 is the bottom of the screen

        // reset player to ground, allow player to jump and reset the y speed
        player.jumping = false;
        player.y = 400;
        player.y_spd *= 0.2;
    }
    if (player.x < -32) {   // prevent player from going off the left part of screen **CHANGE**
        player.x = canvas.width * .90;
    } else if (player.x > canvas.width *.90) {    //prevent player from going off the right part of screen **CHANGE**
        player.x = -32;
    }

    // call when browser ready to draw again
    window.requestAnimationFrame(loop);

};

// create event listener for each button key press
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

