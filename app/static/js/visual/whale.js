class Whale {
  display() {
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
      vertex((mouseX + 271) / 2, (mouseY + 31) / 2);
      bezierVertex((mouseX + 304) / 2, (mouseY + 81) / 2, (mouseX + 245) / 2, (mouseY + 141) / 2, (mouseX + 213) / 2, (mouseY + 147) / 2);
      bezierVertex((mouseX + 213) / 2, (mouseY + 147) / 2, (mouseX + 182) / 2, (mouseY + 158) / 2, (mouseX + 140) / 2, (mouseY + 147) / 2);
      bezierVertex((mouseX + 116) / 2, (mouseY + 141) / 2, (mouseX + 99) / 2, (mouseY + 133) / 2, (mouseX + 88) / 2, (mouseY + 119) / 2);
      bezierVertex((mouseX + 67) / 2, (mouseY + 93) / 2, (mouseX + 67) / 2, (mouseY + 74) / 2, (mouseX + 67) / 2, (mouseY + 48) / 2);
      bezierVertex((mouseX + 39) / 2, (mouseY + 55) / 2, (mouseX + 18) / 2, (mouseY + 43) / 2, (mouseX) / 2, (mouseY + 21) / 2);
      bezierVertex((mouseX + 25) / 2, (mouseY + 31) / 2, (mouseX + 31) / 2, (mouseY + 7) / 2, (mouseX + 56) / 2, (mouseY + 5) / 2);
      bezierVertex((mouseX + 65) / 2, (mouseY + 5) / 2, (mouseX + 70) / 2, (mouseY + 7) / 2, (mouseX + 74) / 2, (mouseY + 18) / 2);
      bezierVertex((mouseX + 74) / 2, (mouseY + 8) / 2, (mouseX + 85) / 2, (mouseY + 1) / 2, (mouseX + 98) / 2, (mouseY + 1) / 2);
      bezierVertex((mouseX + 111) / 2, (mouseY - 1) / 2, (mouseX + 121) / 2, (mouseY + 13) / 2, (mouseX + 145) / 2, (mouseY + 2) / 2);
      bezierVertex((mouseX + 133) / 2, (mouseY + 37) / 2, (mouseX + 98) / 2, (mouseY + 48) / 2, (mouseX + 86) / 2, (mouseY + 48) / 2);
      bezierVertex((mouseX + 78) / 2, (mouseY + 73) / 2, (mouseX + 98) / 2, (mouseY + 88) / 2, (mouseX + 111) / 2, (mouseY + 88) / 2);
      bezierVertex((mouseX + 134) / 2, (mouseY + 88) / 2, (mouseX + 152) / 2, (mouseY + 48) / 2, (mouseX + 169) / 2, (mouseY + 31) / 2);
      bezierVertex((mouseX + 169) / 2, (mouseY + 31) / 2, (mouseX + 217) / 2, (mouseY - 24) / 2, (mouseX + 271) / 2, (mouseY + 31) / 2);
      endShape(CLOSE);
    }

    // Mouth
    beginShape();
    noFill();
    strokeWeight(3);
    stroke(0);
    strokeCap(ROUND);
    vertex((mouseX + 263) / 2, (mouseY + 107) / 2);
    bezierVertex((mouseX + 233) / 2, (mouseY + 119) / 2, (mouseX + 211) / 2, (mouseY + 108) / 2, (mouseX + 210) / 2, (mouseY + 100) / 2);
    endShape();

    // Eye
    fill(0);
    noStroke();
    ellipse((mouseX + 225) / 2, (mouseY + 50) / 2, 15, 20);

    // Bubbles
    if (mouseY > 350) {
      noStroke();
      fill(0, 197, 204);
      ellipse((mouseX + 230) / 2, (mouseY - 60) / 2, 15, 15);
      ellipse((mouseX + 260) / 2, (mouseY - 40) / 2, 10, 10);
      ellipse((mouseX + 275) / 2, (mouseY - 110) / 2, 20, 20);
      ellipse((mouseX + 230) / 2, (mouseY - 70) / 2, 12, 12);
      ellipse((mouseX + 245) / 2, (mouseY - 30) / 2, 15, 15);
    }
  }
};