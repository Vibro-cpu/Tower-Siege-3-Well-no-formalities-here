const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var score = 0;
var bg;

function preload(){
    polygonImg = loadImage("polygon.png")
}

function setup(){
    createCanvas(800,400)

    engine = Engine.create();
    world = engine.world;

    //ground

    ground = new Ground(487.5,325)

    //polygon
    polygon = Bodies.circle(200,150,20)
    World.add(world,this.polygon)

    slingshot = new SlingShot(this.polygon,{x:200, y:150});

    //level 1

    block1 = new Block(417.5,302.5)
    block2 = new Block(452.5,302.5)
    block3 = new Block(487.5,302.5)
    block4 = new Block(522.5,302.5)
    block5 = new Block(557.5,302.5)

    //level 2

    block6 = new Block(452.5,267.5)
    block7 = new Block(487.5,267.5)
    block8 = new Block(522.5,267.5)

    //level 3

    block9 = new Block(487.5,232.5)

    getTime()
}

function draw(){
    
    if(bg){
        background(bg);
    }

    text("SCORE : "+ score,700,50)
    textSize(25)

    Engine.update(engine);

    imageMode(CENTER)
    image(polygonImg,polygon.position.x,polygon.position.y,50,50)
    
    //slingshot displaying

    slingshot.display()

    //block displaying

    block1.display()
    block1.score()
    block2.display()
    block2.score()
    block3.display()
    block3.score()
    block4.display()
    block4.score()
    block5.display()
    block5.score()
    block6.display()
    block6.score()
    block7.display()
    block7.score()
    block8.display()
    block8.score()
    block9.display()
    block9.score()

    //ground displaying

    ground.display()
    
}

function mouseDragged(){
    Matter.Body.setPosition(this.polygon, {x: mouseX , y: mouseY});
}


function mouseReleased(){
    slingshot.fly();

}

function keyPressed(){
    if(keyCode === 32){
        slingshot.attach(this.polygon);
        
    }
}

async function getTime(){

    var response= await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata") 

    var responseJson= await response.json()

    var datetime= responseJson.datetime

    var hour=datetime.slice (11,13)

    if(hour>=06 && hour<=19){
        bg="white"
    }

    else {
        bg="black"
    }

}