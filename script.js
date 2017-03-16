
var
    canvas,
    ctx,
    width,
    height,

    fgpos = 0,
    bgpos = 0,
    frames = 0,
    score = 0,
    best = 0,


    currentstate,
    states = {
        Splash: 0, Game: 1, Score: 2
    },

    bird = {

        x: 60,
        y: 50,
        frame: 0,
        animation: [0, 1],
        rotation: 0,
        velocity: 0,
        gravity: 0.25,
        _jump: 4.6,

        jump: function(){
            this.velocity = -this._jump;
        },

        update: function(ctx){
            var n = currentstate === states.Splash ? 10 : 5;
            this.frame += frames % n === 0 ? 1: 0;
            this.frame %= this.animation.length;

            if(currentstate === states.Splash){
                this.y = height - 350 + 5*Math.cos(frames/10); //adjust starting height of bird with 1st number)
                this.rotation = 0;
            } else{
                this.velocity += this.gravity;
                this.y += this.velocity;

                if( this.y >= this.height - foreground.height - 10){
                    this.y = height - foreground.height - 10;
                    if (currentstate === states.Game){
                        currentstate = states.Score;
                    }
                    this.velocity = this._jump;
                }
                if (this.velocity >= this._jump){
                    this.frame = 1;
                    this.rotation = Math.min(Math.PI/2, this.rotation + 0.1); //this is the rotation of the live bird
                } else {
                    this.rotation = -0.1; //fall rotation of live bird
                }
            }


        },

        draw: function(ctx){
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);

            var n = this.animation[this.frame];
            pinkBird[n].draw(ctx, -pinkBird[n].width/2, pinkBird[n].height/2);

            ctx.restore();



        }
    },

    obstacles = {
        update: function(){

        },

        draw: function(){

        }
    };


function onpress(evt){

    switch (currentstate) {
        case states.Splash:
            currentstate = states.Game;
            bird.jump();
            break;
        case states.Game:
            bird.jump();
            break;
        case states.Score:
            break;
    }
}


function main(){
    canvas = document.createElement("canvas");
    width = window.innerWidth;
    height = window.innerHeight;


    var evt = "touchstart"
    if(width >= 500){
        width = 380;
        height = 480;
        canvas.style.border = "1px solid #000";
        evt = "mousedown"

    }

    document.addEventListener(evt, onpress);


    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    currentstate = states.Splash;

    document.body.appendChild(canvas);

    var img = new Image();
    img.onload = function(){
        console.log("test"); //check to see if image is loading
        initSprites(this); //get the sprite sheet going
        ctx.fillStyle = background.color;
        run();
    };
    img.src = "img.png"; //Put sprite sheet URL here


}

function run(){
    var loop = function(){
        update();
        render();
        window.requestAnimationFrame(loop, canvas);
    };
    window.requestAnimationFrame(loop, canvas);
}

function update(){
    frames ++;


   if(currentstate != states.Score) {
       bgpos = (bgpos - 1) % 2000;
       fgpos = (fgpos - 2) % 2000; //foreground position. Global var. 14 controls speed. Bigger number slows it down
   }

    bird.update();
    //obstacles.update();
}

function render(){

    ctx.fillRect(0, 0, width, height);
    background.draw(ctx, bgpos, height - background.height);
    //background.draw(ctx, bgpos + background.width, height - background.height);//adjust width to background.width if it's too short

    bird.draw(ctx);
    //obstacles.draw(ctx);

    foreground.draw(ctx, fgpos, height - foreground.height); //this for when I have a foreground. This part is good, adjust in sprite.
    foreground.draw(ctx, fgpos + foreground.width, height - foreground.height); //in case I need to change width.

    var width2 = width/2;

    if( currentstate === states.Splash){
        s_splash.draw(ctx, width2 - s_splash.width/2, height - 200); //adjust placement of 'click to start' icon
    }

}

//main();



