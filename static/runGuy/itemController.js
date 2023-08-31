import Item from "/static/runGuy/item.js";

export default class ItemController{
    ITEM_INTERVAL_MIN = 500;
    ITEM_INTERVAL_MAX = 2000;

    nextItemInterval = null;
    items = [];

    constructor(ctx, itemImages, scaleRatio, speed){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.itemImages = itemImages;
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
        const index = this.getRandomNumber(0, this.itemImages.length - 1);
        const itemImage = this.itemImages[index];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - itemImage.height;
        const item = new Item(
            this.ctx, 
            x, 
            y, 
            itemImage.width, 
            itemImage.height, 
            itemImage.image
            );
        this.items.push(item);
    }

    update(gameSpeed, frameTimeDelta) {
        if (this.nextItemInterval <= 0){
            this.createItem();
            this.setNextItemTime();
        }
        this.nextItemInterval -= frameTimeDelta;

        this.items.forEach((item) => {
            item.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
        });
    }

    draw(){
        this.items.forEach((item) => item.draw());
    }

    collideWith(sprite){
        return this.items.some((item) => item.collideWith(sprite));
    }

    reset(){
        this.items = [];
    }
}