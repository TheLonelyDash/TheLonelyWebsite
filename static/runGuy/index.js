import Player from "/static/runGuy/Player.js";
import Ground from "/static/runGuy/Ground.js";
import CactiController from "/static/runGuy/CactiController.js";
import Score from "/static/runGuy/Score.js";


const canvas =                      document.getElementById("game");
const ctx =                         canvas.getContext("2d");

const GAME_SPEED_START =            1.0;            //Rate of speed start
const GAME_SPEED_INCREMENT =        0.00002;        //Rate of speed change

const GAME_WIDTH =                  800;            //Width of the container
const GAME_HEIGHT =                 200;            //Height of the container
const PLAYER_WIDTH =                88/1.5;         //Player width is now 58
const PLAYER_HEIGHT =               94 / 1.5;       //Player height is now 62
const MAX_JUMP_HEIGHT =             GAME_HEIGHT;    //Long press jump
const MIN_JUMP_HEIGHT =             150;            //Short press jump
const GROUND_WIDTH =                2400;           //Ground image width
const GROUND_HEIGHT =               24;             //Ground image height
const GROUND_AND_CACTUS_SPEED =     0.5;

const CACTI_CONFIG = [
    {width:48 / 1.5, height: 100 / 1.5, image: "/static/img/IntroGame/cactus_1.png"},     //Cactus1 width and height
    {width:98 / 1.5, height: 100 / 1.5, image: "/static/img/IntroGame/cactus_2.png"},     //Cactus2 width and height
    {width:48 / 1.5, height: 100 / 1.5, image: "/static/img/IntroGame/cactus_3.png"}      //Cactus3 width and height
]

//All GAME OBJECTS
let player =            null;
let ground =            null;
let cactiController =   null;
let score =             null;

let scaleRatio =        null;
let previousTime =      null;
let gameSpeed =         GAME_SPEED_START;
let gameOver =          false;
let hAELFR =            false;
let waitingToStart =    true;

function createSprites(){
    const playerWidthInGame =   PLAYER_WIDTH * scaleRatio;
    const playerHeightInGame =  PLAYER_HEIGHT * scaleRatio;
    const minJumpHeight =       MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeight =       MAX_JUMP_HEIGHT * scaleRatio;

    const groundWidthInGame =   GROUND_WIDTH * scaleRatio;
    const groundHeightInGame =  GROUND_HEIGHT * scaleRatio;

    player = new Player(
        ctx, 
        playerWidthInGame,
        playerHeightInGame, 
        minJumpHeight, 
        maxJumpHeight, 
        scaleRatio
        );

    ground = new Ground(
        ctx, 
        groundWidthInGame, 
        groundHeightInGame, 
        GROUND_AND_CACTUS_SPEED, 
        scaleRatio
        );

    const cactiImages =     CACTI_CONFIG.map(cactus =>{
        const image =       new Image();
        image.src =         cactus.image;
        return {
            image:          image,
            width:          cactus.width * scaleRatio,
            height:         cactus.height * scaleRatio,
        };
    });

    cactiController = new CactiController(
        ctx, 
        cactiImages, 
        scaleRatio, 
        GROUND_AND_CACTUS_SPEED
        );
    
    score = new Score(ctx, scaleRatio);
}

function setScreen(){
    scaleRatio =    getScaleRatio();
    canvas.width =  GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
    createSprites();
}

setScreen();

//Fixes rotation issue with safari
window.addEventListener("resize", ()=>setTimeout(setScreen, 500));

//Fixes rotation issues with chrome
if(ScreenOrientation){
    screen.orientation.addEventListener('change', setScreen);
}

//DEFINES THE WIDTH AND HEIGHT OF THE GAME
function getScaleRatio(){
    const screenHeight = Math.min(
        window.innerHeight, 
        document.documentElement.clientHeight
        );
    const screenWidth = Math.min(
        window.innerWidth, 
        document.documentElement.clientWidth
        );

    //If window is wider than game width
    if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT){
            return screenWidth/GAME_WIDTH;
    }
    else{
        return screenHeight/GAME_HEIGHT;
    }
}

function showGameOver(){
    const fontSize =    70 * scaleRatio;
    ctx.font =          `${fontSize}px Raleway`;
    ctx.fillStyle =     "gray";
    const x =           canvas.width / 4.5;
    const y =           canvas.height / 2;
    ctx.fillText("GAME OVER", x, y);
}

function setupGameReset(){
    if(!hAELFR){
        hAELFR = true;
        setTimeout(()=>{
            window.addEventListener("keyup", reset, {once:true});
            window.addEventListener("touchstart", reset, {once:true});
        }, 500);

    }
}

function reset(){
    hAELFR =            false;
    gameOver =          false;
    waitingToStart =    false;
    ground.reset();
    cactiController.reset();
    score.reset();
    gameSpeed = GAME_SPEED_START;
}

function showStartGameText() {
    const fontSize =    40 * scaleRatio;
    ctx.font =          `${fontSize}px Raleway`;
    ctx.fillStyle =     "gray";
    const x =           canvas.width / 14;
    const y =           canvas.height / 2;
    ctx.fillText("Tap Screen (mobile) or Press J to Start", x, y);
}

function showAgain() {
    const fontSize =    30 * scaleRatio;
    ctx.font =          `${fontSize}px Raleway`;
    ctx.fillStyle =     "gray";
    const x =           canvas.width / 6;
    const y =           canvas.height / 1.5;
    ctx.fillText("Tap Screen (mobile) or Press J to Start", x, y);
}

function updateGameSpeed(frameTimeDelta){
    gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
}


function clearScreen(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(currentTime){
    console.log(gameSpeed);
    if (previousTime === null){
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    clearScreen();

    if (!gameOver && !waitingToStart){
        //Update game objects
        ground.update(gameSpeed, frameTimeDelta);
        cactiController.update(gameSpeed, frameTimeDelta);
        player.update(gameSpeed, frameTimeDelta);
        score.update(frameTimeDelta);
        updateGameSpeed(frameTimeDelta);
    }

    if (!gameOver && cactiController.collideWith(player)){
        gameOver = true;
        setupGameReset();
        score.setHighScore();
    }

    //Draw game objects
    ground.draw();
    cactiController.draw();
    player.draw();
    score.draw();

    if (gameOver){
        showGameOver();
        showAgain();
    }

    if(waitingToStart){
        showStartGameText();
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener("keyup", reset, {once:true});
window.addEventListener("touchstart", reset, {once:true});