let as, bs;
let r = 255;
let g = 105;
let b = 180;
let scene1;
let weeds,rootnoise;
let padding = 25; 

function preload() {
  as = loadImage("assets/1.png");
  bs = loadImage("assets/2.gif");
}
function setup() {
  createCanvas(500, 500);
  w = width;
  e = w + 200;
  noStroke();
  colors = [color("#3AC2C9"), color("#248796"), color("#55aba5"), color("#2d7063"), color("#3f6829"), color("#44a872"), color("#215964"), color("#cdedae")];  
  pufferClr = ["#f6bd60", "#ffb4a2", "#48cae4"];
  scene1 = new Scene1();
  scene2 = new Scene2();
}

function draw() {
  //background(as);
  strokeWeight(0);
  //scene1.display();
  scene2.display();
}
class Scene1 {
  constructor() {
    this.waves = [];
    this.whale = new Whale(mouseX, mouseY);
    this.pufferFishies=[];
    this.seaWeed = [];
    for(let i=0; i<10; i++){
	this.pufferFishies[i] = new PufferFish();
	}
    // Create some initial waves
    for (let i = 0; i < 300; i++) {
      let wave = new Wave();
      this.waves.push(wave);
    }
    //create seaweed
    for(var k=0; k<20; k++){
		this.seaWeed[k] = new SeaWeed();
	}
  }

  display() {
    background(as);
    strokeWeight(0);

    this.whale.display();

    for (let i = 0; i < this.waves.length / 2; i++) {
      this.waves[i].update();
      this.waves[i].display();
    }
    for(let i=0; i<this.pufferFishies.length; i++){		
		this.pufferFishies[i].move();
		this.pufferFishies[i].display();
		
		if(!this.pufferFishies[i].isInside()){
			this.pufferFishies[i].direction = this.pufferFishies[i].direction.mult(-1)
			this.pufferFishies[i].x = this.pufferFishies[i].x + this.pufferFishies[i].direction.x ;
			this.pufferFishies[i].y = this.pufferFishies[i].y + this.pufferFishies[i].direction.y ;
		}
		
		this.pufferFishies[i].updateVel();
		
		if(this.pufferFishies[i].vel < 0.05){
			this.pufferFishies[i].changeVel();
			this.pufferFishies[i].changeDirection();
		}
	}
    for(var k=0; k<this.seaWeed.length; k++){
		this.seaWeed[k].display();
	}
  }
}

class Scene2{
  constructor(){
    this.landmark= new Landmark();
  }
  display(){
    this.landmark.display();
  }
}



