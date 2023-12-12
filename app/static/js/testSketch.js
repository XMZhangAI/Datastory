let as, bs;
let r = 255;
let g = 105;
let b = 180;
let scene2;
let weeds, rootnoise;
let padding = 25;
let yearData=0;
let oilData=0;
let otherData=0;
let tempData=0;
let hydroData=0;
let factor = 0;
let patternGenerator;
let trees=[];
let tree;
let waves=[];
let flag1 = 0;
let flag2 = 0;
function setup() {
    let canvas = createCanvas(500, 500);
    background("#fff1dd");
    canvas.parent('leftCanvasContainer');  // Here we are connecting the canvas with the index.html file
    noStroke();
    colors = [color("#3AC2C9"), color("#248796"), color("#55aba5"), color("#2d7063"), color("#3f6829"), color("#44a872"), color("#215964"), color("#cdedae")];
    pufferClr = ["#f6bd60", "#ffb4a2", "#48cae4"];
    scene2 = new Scene2();
}

function draw() {
    calculateFactor();
    scene2.temp = tempData;
    scene2.display();
    if(factor>0){
        let maxTrees = 2;  // Set your desired maximum number of trees
        let numTrees = floor(factor * maxTrees);
        for (let i = 0; i < numTrees; i++) {
            let x = random(10, 300);
            let y = random(200, 380);
            let tree = new Tree(x, y);
            trees.push(tree);
        }
    }
    if(factor<0){
        let maxTrees = 3;  // Set your desired maximum number of trees
        let numTrees = floor((-factor) * maxTrees);
        for (let i = 0; i < numTrees; i++) {
            trees.shift();
        }
    }
    for(let i=0;i<(hydroData-40);i++){
    let wave = new Wave();
        waves.push(wave);
        flag1++;
    }
    for(let i=0;i<trees.length;i++){
        trees[i].draw();
    }
    for(let k =0;k<waves.length/2;k++){
        waves[k].update();
        waves[k].display();
    }
    if(flag1>10){
        waves.pop();
        flag1--;
    }
}
class Scene2 {
    constructor() {
       this.landmark = new Landmark();
       this.temp = 0;
    }
    display() {
        this.landmark.temperature = 3.4-this.temp;
        this.landmark.display();
      }
}


function updateCanvas(dataDict) {
    console.log('updateCircles called with:', dataDict); 
    //clear();  // remove earlier drawings
    let temperature = dataDict["Temperature"];
    yearData = dataDict["Year"];
    oilData = dataDict["Oil"];
    otherData = dataDict["Gas"]+dataDict["Other industry"]+dataDict["Flaring"]+dataDict["Cement"]+dataDict["Coal"];
    tempData = dataDict["Temperature"];
    hydroData = dataDict["Hydro"];
    //console.log('Year',yearData);
    console.log('Temperature:', temperature); 
    console.log('Year:',yearData);
    console.log('Hydro:',hydroData);
    console.log('Oil:',oilData);
    console.log('other:',otherData);
    // scaling number of circles made
    let numCircles = Math.abs(temperature);

    for(let i = 0; i < numCircles; i++) {
        // Generate random coords for the circles position
        let x = random(width);
        let y = random(height);

        // The temperature varies between -0.66 og 3.39°C - (I could send this information as well)
        let radius = map(temperature, -0.66, 3.39, 10, 50);  

        // draw the circle
        ellipse(x, y, radius);  
    }
}
function calculateFactor(){
    factor = (oilData-2*otherData)*0.0000001;
    console.log('the value of factor ',factor);
}