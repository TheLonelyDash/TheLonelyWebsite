export default class Player{

    WALK_ANIMATION_TIMER = 200;
    walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    runGuyImages = [];

    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    JUMP_SPEED = 0.6;
    GRAVITY = 0.4;

    constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;

        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5*scaleRatio;
        this.yStandingPosition = this.y;

        this.standingStillImage = new Image();
        this.standingStillImage.src = "static/img/IntroGame/standing_still.png";
        this.image = this.standingStillImage;

        const runGuyImage1 = new Image();
        runGuyImage1.src = "static/img/IntroGame/runGuy1.png"
    
        const runGuyImage2= new Image();
        runGuyImage2.src = "static/img/IntroGame/runGuy2.png"

        this.runGuyImages.push(runGuyImage1);
        this.runGuyImages.push(runGuyImage2);

        //Keyboard Input
        window.removeEventListener('keydown', this.keydown);
        window.removeEventListener('keyup', this.keyup);
        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);

        //Touch Input
        window.removeEventListener('touchstart', this.touchstart);
        window.removeEventListener('touchend', this.touchend);
        window.addEventListener('touchstart', this.touchstart);
        window.addEventListener('touchend', this.touchend);
    }

    touchstart = ()=>{
        this.jumpPressed = true;
    }

    touchend = ()=>{
        this.jumpPressed = false;
    }

    keydown = (event)=>{
        if (event.code === "KeyJ"){
            this.jumpPressed = true;
        }
    }

    keyup = (event)=>{
        if (event.code === "KeyJ"){
            this.jumpPressed = false;
        }
    }

    update(gameSpeed, frameTimeDelta){
        console.log(this.jumpPressed);
        this.run(gameSpeed, frameTimeDelta);
        this.jump(frameTimeDelta);
    }

    jump(frameTimeDelta){
        if (this.jumpPressed){
            this.jumpInProgress = true;
        }
        if (this.jumpInProgress && !this.falling){
            if (
                this.y > this.canvas.height - this.minJumpHeight || 
                (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)
                ) {
                this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
            } else {
                this.falling = true;
            }
        } else {
            if (this.y < this.yStandingPosition){
                this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
                if (this.y + this.height > this.canvas.height){
                    this.y = this.yStandingPosition;
                }
            }
            else {
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }

    run(gameSpeed, frameTimeDelta){
        if (this.walkAnimationTimer <= 0) {
            if (this.image === this.runGuyImages[0]){
                this.image = this.runGuyImages[1];
            }
            else {
                this.image = this.runGuyImages[0];
            }
            this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        }
        this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
    }

    draw(){
        this.ctx.drawImage(
            this.image, 
            this.x, 
            this.y, 
            this.width, 
            this.height
            );
    }
}