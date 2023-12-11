class Tree {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }

  draw() {
      // Draw the tree
      fill('#B2DC98');
      triangle(this.x + 10, this.y, this.x + 20, this.y + 16, this.x, this.y +16); // branches (reversed for an upright tree)
      fill('#2C2F2A'); // brown
      rect(this.x + 8, this.y + 16, 4, 16); // trunk
  }
}