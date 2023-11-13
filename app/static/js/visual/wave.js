class Wave {
  constructor(x, y) {
    this.x = x || random(width);
    this.y = y || random(height);
    this.color = colors[floor(random(colors.length))];
    this.moveSpeed = 0.4;
    this.moveScale = 800;
  }

  update() {
    let angle = noise(this.x / this.moveScale, this.y / this.moveScale) * TWO_PI * this.moveScale;
    this.x += cos(angle) * this.moveSpeed;
    this.y += sin(angle) * this.moveSpeed;
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0 || random(1) < 0.001) {
      this.x = random(width);
      this.y = random(height);
    }
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, 2, 2);
  }
}
