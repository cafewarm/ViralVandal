class TCell {
  constructor(x, y, dSpeed) {
    this.w = this.h = this.len = 15; //= this.animation.length
    this.x = x;
    this.y = y;
    this.dSpeed = dSpeed;
    //this.targetX = targetX;
    //this.targetY = targetY;
    this.index = 0;
    this.xspeed = 1;
    this.yspeed = 1;
    this.alive = false;
    this.isShy = false;
    this.isActive = false;

    this.currentTC = 0;

  }

  dir(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  setScale(scaleVal) {
    this.w = 1 * scaleVal;
    this.h = 1 * scaleVal;
  }

  update() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  }

  goUp() {
    push();
    imageMode(CENTER);
        image(TC[this.currentTC], this.x, this.y, this.w, this.h);
        this.currentTC ++;
        if (this.currentTC > 9) {
          this.currentTC = 8;
        }
    pop();
  }

  goDown() {
    push();
    imageMode(CENTER);
        image(TC[this.currentTC], this.x, this.y, this.w, this.h);
        this.currentTC ++;
        if (this.currentTC > 1) {
          this.currentTC = 0;
        }
    pop();
  }

  goLeft() {
    push();
    imageMode(CENTER);
        image(TC[this.currentTC], this.x, this.y, this.w, this.h);
        this.currentTC ++;
        if (this.currentTC > 3) {
          this.currentTC = 2;
        }
    pop();
  }

  goRight() {
    push();
    imageMode(CENTER);
        image(TC[this.currentTC], this.x, this.y, this.w, this.h);
        this.currentTC ++;
        if (this.currentTC > 7) {
          this.currentTC = 6;
        }
    pop();
  }

  KO() {
    push();
    imageMode(CENTER);
    tint(255, 128);
        image(TC[this.currentTC], this.x, this.y, this.w, this.h);
        this.currentTC ++;
        if (this.currentTC > 5) {
          this.currentTC = 4;
        }
    pop();
  }

  neutral() {
    push();
    imageMode(CENTER);
    tint(255, 128);
    image(TC[10], this.x, this.y, this.w, this.h);
    pop();
  }

  

  animate() {
    if (this.alive) {
      this.index += this.yspeed;
      this.index += this.xspeed;

      this.y += this.yspeed;
      this.x += this.xspeed;

      //zum loopen in der box
      if (this.x > width - 50) {
        this.x = 0;
      }
      if (this.y > height) {
        this.y = 0;
      }
      if (this.x < 0) {
        this.x = width - 50;
      }
      if (this.y < 0) {
        this.y = height;
      }
    }
  }

  colormap(targetX, targetY) {
    this.KO();
if(herpes.lives < 3){
  this.isActive = true;
} else {
  this.isActive = false;
}

    if (this.alive) {
      colorMap[level].loadPixels();

      let myRight = ceil(this.x + 10);
      let myLeft = ceil(this.x - 10);
      let myUp = ceil(this.y - 10);
      let myDown = ceil(this.y + 10);
if (this.isActive){
      if (dist(this.x, this.y, targetX, targetY) < 300) {
        if (dist(this.x, 0, targetX, 0) > dist(0, this.y, 0, targetY)) {
          if (targetX > this.x) { //right
            let R = colorMap[level].get(myRight, this.y);
            if (lightness(R) != 0) {
              this.dir(this.dSpeed, 0);
              this.goRight();
            } else {
            }
          } else if (targetX < this.x) { //left
            let L = colorMap[level].get(myLeft, this.y);
            if (lightness(L) != 0) {
              this.dir(-this.dSpeed, 0);
              this.goLeft();
            } else {
            }
          }
        } else {
          if (targetY > this.y) { //down
            let D = colorMap[level].get(this.x, myDown);
            if (lightness(D) != 0) {
              this.dir(0, this.dSpeed);
              this.goDown();
            } else {
            }
          } else if (targetY < this.y) { //up
            let U = colorMap[level].get(this.x, myUp);
            if (lightness(U) != 0) {
              this.dir(0, -this.dSpeed);
              this.goUp();
            } 
          }
        }
      } else {
      this.dir(0, 0);
      this.KO();
      print("neutral");
      }

    } else {
      this.dir(0, 0);
      this.neutral();
    }
    }
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }

}