

var pinkBird;
var background;
var cloud;
var tree;
var foreground;

var s_splash;




function Sprite(img, x, y, width, height){
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Sprite.prototype.draw = function (ctx, x, y) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
};

function initSprites(img) {
    pinkBird = [
        new Sprite (img, 1132, 383, 69, 50),
        new Sprite (img, 1132, 436, 69, 50)
    ];

    background = new Sprite(img, 1, 626, 2038, 455);   //876
    background.color = "#5bb6ff";

    cloud = new Sprite(img, 603, 504, 151, 103);

    tree = new Sprite(img, 27, 42, 148, 172);

    foreground = new Sprite (img, 1, 1116, 2038, 91); //add a foreground at some point

    s_splash = new Sprite (img, 787, 242, 324, 83);
}