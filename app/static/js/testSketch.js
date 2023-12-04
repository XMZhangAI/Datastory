function setup() {
    let canvas = createCanvas(500, 350);
    background(255);
    canvas.parent('leftCanvasContainer');  // Here we are connecting the canvas with the index.html file
}

function draw() {
    
}

function updateCanvas(dataDict) {
    console.log('updateCircles called with:', dataDict); 

    //clear();  // remove earlier drawings
    let temperature = dataDict["Temperature"];
    console.log('Temperature:', temperature); 
    
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