class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // this.dx = dx;
    // this.dy = dy;
    this.rad = 1;
    this.coleur = 210, random(150,210), random(180, 230);
    this.alive = true;
  }

  show() {
    if (this.alive == true) {
      noStroke();
      fill(this.coleur);
      rect(this.x, this.y, this.rad * 4, this.rad * 4);
    }
  }

  eaten(dx, dy) {
    if (dist(this.x, this.y, dx, dy) < this.rad + 12) {
      if (this.alive == true) {
        score++;
        eat.play();
      }
      this.alive = false;
    }
  }
}
