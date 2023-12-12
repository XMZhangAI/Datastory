class Landmark {
  constructor() {
    this.width = 400;
    this.height = 400;
    this.temperature = 0;
  }

  display() {
    background('#F1F0EA');
    noStroke();
    // moon
    fill('rgb(238,39,39)');
    ellipse( 200, 80, 80);

    // mountains, back
    console.log("in landmark:",this.temperature);
    if (!isNaN(this.temperature)) {
      let mountainColor = color('#CCD8D9');
      mountainColor.levels[2] += this.temperature * 50; 
      fill(mountainColor);
      triangle(-100, 275, 70, 50, 300, 275);

      mountainColor = color('#B8CBCD');
      mountainColor.levels[2] += this.temperature * 50;
      fill(mountainColor);
      triangle(-200, 375, 100, 80, 200, 375);

      mountainColor = color('#94AEB2');
      mountainColor.levels[2] += this.temperature * 50;
      fill(mountainColor);
      triangle(-200, 425, 20, 180, 300, 425);

      mountainColor = color('#6E9091');
      mountainColor.levels[2] += this.temperature * 50;
      fill(mountainColor);
      triangle(0, 425, 220, 220, 500, 425);

      mountainColor = color('#416C6C');
      mountainColor.levels[2] += this.temperature * 50;
      fill(mountainColor);
      triangle(-200, 425, 0, 350, 400, 425);
    }
    else{
      let mountainColor = color('#CCD8D9');
      fill(mountainColor);
      triangle(-100, 275, 70, 50, 300, 275);

      mountainColor = color('#B8CBCD');
      fill(mountainColor);
      triangle(-200, 375, 100, 80, 200, 375);

      mountainColor = color('#94AEB2');
      fill(mountainColor);
      triangle(-200, 425, 20, 180, 300, 425);

      mountainColor = color('#6E9091');
      fill(mountainColor);
      triangle(0, 425, 220, 220, 500, 425);

      mountainColor = color('#416C6C');
      fill(mountainColor);
      triangle(-200, 425, 0, 350, 400, 425);
    }
    // water
    fill('#CEE4EA');
    rect(0, 425, 400, 400);
    // reflection on water
    fill('#B2CCD3');
    triangle(-200, 425, 0, 500, 400, 425);
    // boat, fisherman
    fill('#2A3A3A');
    quad(100, 525, 150, 525, 140, 530, 110, 530);
    fill('#AE8676');
    ellipse(140, 516, 6, 6);
    ellipse(140, 518, 3, 3);
    rect(138, 519, 4, 11);
    fill('#2A3A3A');
    rect(138, 524, 4, 11);
    triangle(134, 513, 142, 509, 146, 516);
    stroke('#2A3A3A');
    line(132, 518, 147, 531);
    stroke('white');
    line(147, 530, 190, 530);
    line(170, 533, 200, 533);
    // hills, front
    noStroke();
    fill('#2A3A3A');
    triangle(100, 400, 400, 325, 700, 400);
    fill('#B2CCD3');
    triangle(100, 400, 400, 475, 700, 400);
  }
}
