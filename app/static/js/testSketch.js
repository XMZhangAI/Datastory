let as, bs;
let r = 255;
let g = 105;
let b = 180;
let scene1;
let weeds, rootnoise;
let padding = 25;
let yearData=0;
let oilData=0;
let gasData=0;
let tempData=0;
let hydroData=0;

function preload() {
    as = loadImage(base_url + "js/assets/1.png");
    bs = loadImage(base_url + "js/assets/2.gif");
}

function setup() {
    let canvas = createCanvas(500, 500);
    background(as);
    canvas.parent('leftCanvasContainer');

    w = width;
    e = w + 200;
    noStroke();
    colors = [color("#3AC2C9"), color("#248796"), color("#55aba5"), color("#2d7063"), color("#3f6829"), color("#44a872"), color("#215964"), color("#cdedae")];
    pufferClr = ["#f6bd60", "#ffb4a2", "#48cae4"];
    scene1 = new Scene1();
    scene2 = new Scene2();
}

function draw() {
    // background(as);
    strokeWeight(0);
    if(yearData<1960){
        scene2.display();
    }
    else {
        scene1.display();
    }
     //
    
}

class Scene1 {
    constructor() {
        this.waves = [];
        this.whale = new Whale(mouseX, mouseY);
        this.pufferFishies = [];
        this.seaWeed = [];
        for (let i = 0; i < 10; i++) {
            this.pufferFishies[i] = new PufferFish();
        }
        // Create some initial waves
        for (let i = 0; i < 300; i++) {
            let wave = new Wave();
            this.waves.push(wave);
        }
        //create seaweed
        for (var k = 0; k < 20; k++) {
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
        for (let i = 0; i < this.pufferFishies.length; i++) {
            this.pufferFishies[i].move();
            this.pufferFishies[i].display();

            if (!this.pufferFishies[i].isInside()) {
                this.pufferFishies[i].direction = this.pufferFishies[i].direction.mult(-1)
                this.pufferFishies[i].x = this.pufferFishies[i].x + this.pufferFishies[i].direction.x;
                this.pufferFishies[i].y = this.pufferFishies[i].y + this.pufferFishies[i].direction.y;
            }

            this.pufferFishies[i].updateVel();

            if (this.pufferFishies[i].vel < 0.05) {
                this.pufferFishies[i].changeVel();
                this.pufferFishies[i].changeDirection();
            }
        }
        for (var k = 0; k < this.seaWeed.length; k++) {
            this.seaWeed[k].display();
        }
    }
}

class Scene2 {
    constructor() {
        this.landmark = new Landmark();
    }
    display() {
        this.landmark.display();
        this.updataTree();
        this.updateFish();
    }
    updataTree(dataDict){

    }
    updateFish(dataDict){

    }
}
class Scene3 {
    constructor() {
        this.landmark = new Landmark();
    }
    display() {
        this.landmark.display();
    }
}

function updateCo2(dataDict) {
    console.log('Updating CO2 data in P5.js:', dataDict);
    yearData = dataDict["Year"];
    oilData = dataDict["Oil"];
    gasData = dataDict["Gas"];
    console.log('Year',yearData);
    console.log('Oil',oilData);

  }
function updateTemp(dataDict) {
    console.log('Updating temperature data in P5.js:', dataDict);
    tempData = dataDict["Temperature"];
    console.log('Temperature:', tempData);
  }
  
function updateEnergy(dataDict) {
    console.log('Updating energy data in P5.js:', dataDict);
    hydroData = dataDict["Hydro"];
  }
function updateCircles(dataDict) {
    console.log('updateCircles called with:', dataDict);

    // clear();  // remove earlier drawings
    let temperature = dataDict["Temperature"];
    console.log('Temperature:', temperature);

    // scaling number of circles made
    let numCircles = Math.abs(temperature);

    for (let i = 0; i < numCircles; i++) {
        // Generate random coords for the circles position
        let x = random(width);
        let y = random(height);

        // The temperature varies between -0.66 og 3.39°C - (I could send this information as well) varierer mellom -0.66 og 3.39°C
        let radius = map(temperature, -0.66, 3.39, 10, 50);

        // draw the circle
        ellipse(x, y, radius);
    }
}
