import Cactus from "/static/runGuy/Cactus.js";

export default class CactiController{
    ITEM_INTERVAL_MIN = 500;
    ITEM_INTERVAL_MAX = 2000;

    nextItemInterval = null;
    items = [];

    constructor(ctx, cactiImages, scaleRatio, speed){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.cactiImages = cactiImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

        this.setNextItemTime();
    }

    setNextItemTime(){
        const num = this.getRandomNumber(
            this.ITEM_INTERVAL_MIN, 
            this.ITEM_INTERVAL_MAX
            );
        this.nextItemInterval = num;
        console.log(this.nextItemInterval);
    }

    getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    createItem(){
        const index = this.getRandomNumber(0, this.cactiImages.length - 1);
        const cactusImage = this.cactiImages[index];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - cactusImage.height;
        const cactus = new Cactus(
            this.ctx, 
            x, 
            y, 
            cactusImage.width, 
            cactusImage.height, 
            cactusImage.image
            );
        this.items.push(cactus);
    }

    update(gameSpeed, frameTimeDelta) {
        if (this.nextItemInterval <= 0){
            this.createItem();
            this.setNextItemTime();
        }
        this.nextItemInterval -= frameTimeDelta;

        this.items.forEach((cactus) => {
            cactus.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
        });
    }

    draw(){
        this.items.forEach((cactus) => cactus.draw());
    }

    collideWith(sprite){
        return this.items.some((cactus) => cactus.collideWith(sprite));
    }

    reset(){
        this.items = [];
    }
}