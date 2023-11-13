class SnowMountain {
  display() {
    // MOUNTAIN
    
    // ice cap
    beginShape();
    noStroke();
    fill(239, 227, 211);
    vertex(248, 164);
    vertex(312, 128);
    vertex(327, 133);
    vertex(336, 132);
    vertex(349, 127);
    vertex(365, 132);
    vertex(386, 145);
    vertex(411, 162);
    vertex(461, 185);
    vertex(353, 257);
    endShape();

    // mid layer
    beginShape();
    noStroke();
    fill(155, 163, 176);
    vertex(145, 198);
    vertex(222, 177);
    vertex(248, 164);
    vertex(266, 171);
    vertex(286, 165);
    vertex(317, 176);
    vertex(350, 166);
    vertex(385, 189);
    vertex(403, 177);
    vertex(434, 192);
    vertex(461, 185);
    vertex(478, 189);
    vertex(525, 278);
    endShape();

    // base
    beginShape();
    noStroke();
    fill(111, 140, 155);
    vertex(0, 250);
    vertex(145, 198);
    vertex(228, 212);
    vertex(298, 202);
    vertex(328, 212);
    vertex(393, 220);
    vertex(463, 204);
    vertex(478, 189);
    vertex(650, 225);
    vertex(640, 360);
    vertex(0, 360);
    endShape();

    
  }
}


