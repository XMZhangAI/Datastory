let r = 255;
let g = 105;
let b = 180;
let flowers = [];
let lights = [];

var OrigSize = 800;
var ScaleRate = 0;
var span = 10;
var N = 8;
var BaseHeight = 0;

var ColorMountainList = "0b2c24-0f392b-134632-185339-00115E-002254-00334A".split("-").map(a => "#" + a);
var COlorBackgroundList = "ffb5a7-fcd5ce-f8edeb-f9dcc4-fec89a".split("-").map(a => "#" + a);
// var ColorList = "ffbe0b-fb5607-ff006e-8338ec-3a86ff".split("-").map(a => "#" + a);
var Color_Mountain;
var COlor_BG;

function setup() {
  mn_sz = min(windowWidth, windowHeight);
  ScaleRate = mn_sz / OrigSize;
  createCanvas(1000, 800);
  background(random(COlorBackgroundList));
  BaseHeight = height / N;
  Color_Mountain = random(ColorMountainList);

  for (let i = 0; i < 50; i++) {
    flowers.push(new Flower());
  }
  for (let i = 0; i < 100; i++) {
    lights.push(new Light());
  }
  //CreateMountain();
  smooth();
}

function CreateMountain() {
  for (let i = 0; i < N; i++) {
    Mountain(i);
  }
}

function draw() {
  background(176, 226, 255);
  smooth();
  // Draw light particles
  for (let light of lights) {
    light.update();
    light.display();
  }

  // Draw flowers
  for (let flower of flowers) {
    flower.update();
    flower.display();
  }
  // Sun
  noStroke();
  fill(255, 255, 153);
  ellipse(90, 50, 65, 65);

  // Waves
  for (let j = 0; j < 25; j += 1) {
    for (let i = 0; i < 900; i += 40) {
      stroke(255, 255 - j * 10);
      noFill();
      strokeWeight(4);
      strokeCap(ROUND);
      line(i, 200 + (j * 20), i + 20, 215 + (j * 20));
      line(i - 20, 215 + (j * 20), i, 200 + (j * 20));
    }
  }

  // Land (Added Code)
  fill(155, 118, 83); // Land color
  rect(width / 2, 250, width / 2, height - 250);

 
  // Whale Body
  smooth();
  fill(r, g, b);

  // Flashing
  if (mouseY > 150) {
    r = r + 2;
  } else {
    r = r - 4;

    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 150;
    }
  }

  // Blue/Pink
  if (mouseX > width / 3) {
    r = r + 2;
  } else {
    r = r - 4;

    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }

    noStroke();
    beginShape();
    vertex(mouseX + 271, mouseY + 31);
    bezierVertex(mouseX + 304, mouseY + 81, mouseX + 245, mouseY + 141, mouseX + 213, mouseY + 147);
    bezierVertex(mouseX + 213, mouseY + 147, mouseX + 182, mouseY + 158, mouseX + 140, mouseY + 147);
    bezierVertex(mouseX + 116, mouseY + 141, mouseX + 99, mouseY + 133, mouseX + 88, mouseY + 119);
    bezierVertex(mouseX + 67, mouseY + 93, mouseX + 67, mouseY + 74, mouseX + 67, mouseY + 48);
    bezierVertex(mouseX + 39, mouseY + 55, mouseX + 18, mouseY + 43, mouseX, mouseY + 21);
    bezierVertex(mouseX + 25, mouseY + 31, mouseX + 31, mouseY + 7, mouseX + 56, mouseY + 5);
    bezierVertex(mouseX + 65, mouseY + 5, mouseX + 70, mouseY + 7, mouseX + 74, mouseY + 18);
    bezierVertex(mouseX + 74, mouseY + 8, mouseX + 85, mouseY + 1, mouseX + 98, mouseY + 1);
    bezierVertex(mouseX + 111, mouseY - 1, mouseX + 121, mouseY + 13, mouseX + 145, mouseY + 2);
    bezierVertex(mouseX + 133, mouseY + 37, mouseX + 98, mouseY + 48, mouseX + 86, mouseY + 48);
    bezierVertex(mouseX + 78, mouseY + 73, mouseX + 98, mouseY + 88, mouseX + 111, mouseY + 88);
    bezierVertex(mouseX + 134, mouseY + 88, mouseX + 152, mouseY + 48, mouseX + 169, mouseY + 31);
    bezierVertex(mouseX + 169, mouseY + 31, mouseX + 217, mouseY - 24, mouseX + 271, mouseY + 31);
    endShape(CLOSE);
  }

  // Mouth
  beginShape();
  noFill();
  strokeWeight(3);
  stroke(0);
  strokeCap(ROUND);
  vertex(mouseX + 263, mouseY + 107);
  bezierVertex(mouseX + 233, mouseY + 119, mouseX + 211, mouseY + 108, mouseX + 210, mouseY + 100);
  endShape();

  // Eye
  fill(0);
  noStroke();
  ellipse(mouseX + 225, mouseY + 50, 15, 20);

  // Bubbles
  if (mouseY > 350) {
    noStroke();
    fill(0, 197, 204);
    ellipse(mouseX + 230, mouseY - 60, 15, 15);
    ellipse(mouseX + 260, mouseY - 40, 10, 10);
    ellipse(mouseX + 275, mouseY - 110, 20, 20);
    ellipse(mouseX + 230, mouseY - 70, 12, 12);
    ellipse(mouseX + 245, mouseY - 30, 15, 15);
  }

  CreateMountain();
}

function Mountain(ith) {
  noStroke();
  let clr = color(Color_Mountain);
  clr.setAlpha(map(ith, 0, 5, 80, 150));

  fill(clr);
  beginShape();

  let Base = BaseHeight * (2.5 + ith) * 0.5;
  let LastX = width / 2;
  let LastY = height - map(noise(LastX, ith * 100, ith * ith * 10), 0, 1, 0, 200) - Base;
  let curSpan = span * ScaleRate * (ith + 3);
  for (let x = width / 2 + curSpan; x <= width; x += curSpan) {

    let y1 = LastY;
    let y2 = height - map(noise(x, ith * 100, ith * ith * 10), 0, 1, 0, 200) - Base;
    let slope = (y2 - y1) / curSpan;
    for (let j = LastX; j <= x; j += map(ith, 0, 5, 10, 3)) {
      vertex(j, height - LastY - slope * (j - LastX) - map(noise(j, ith * 100, ith * ith * 10), 0, 1, 0, 20));
    }

    LastX = x;
    LastY = y2;

  }
  vertex(width, height);
  vertex(width/2, height);
  endShape();
}

class Flower {
  constructor() {
    this.x = random(width);
    this.y = random(-200, -100);
    this.speed = random(1, 3);
    this.size = random(10, 20);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-200, -100);
      this.x = random(width);
    }
  }

  display() {
    fill(254, 254, 254);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

class Light {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
    this.size = random(5, 10);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = random(width);
      this.y = random(height);
    }
  }

  display() {
    fill(255, 255, 255, 128);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}
