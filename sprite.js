class redSprite {
  constructor(animation, x, y) {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.w = this.h = this.len = this.animation.length; //this.animation[0].width; //this.animation[0].height;
    this.xspeed = 200;
    this.yspeed = 200;
    this.index = 0;
    this.lives = 3;
    this.alive = false;

    this.dir = function (x, y) {
      this.xspeed = x;
      this.yspeed = y;
    };
  }

  //größe für Sprite
  setScale(scaleVal) {
    this.w = 1 * scaleVal;
    this.h = 1 * scaleVal;
  }

  show() {
    this.update();
    if (this.alive) {
      //index kann nicht kleiner als 0 werden
      let index = this.index;
      while (index < 0) {
        index += this.len;
      }

      index = floor(index) % this.len;
      imageMode(CENTER);
      image(this.animation[index], this.x + 2, this.y + 4, this.w, this.h);
      imageMode(CORNER);
    }
  }

  update() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  }

  checkDoors() {
    if (this.alive && level < 11) {
      let redCol = colorMap[level].get(this.x, this.y);
      if (red(redCol) == 242 && green(redCol) == 56 && blue(redCol) == 71) {
        level = 1; //zu lvl 1 (shoe)
        airSound.stop();
        handSound.stop();
        make2Darray(40, 30);
        this.x = 200;
        this.y = 260;
        currentTime = millis();
        shoeSound.setVolume(0.5);
        levelUpSound.play();
        shoeSound.loop();
      } else if (
        red(redCol) == 198 &&
        green(redCol) == 156 &&
        blue(redCol) == 109
      ) {
        level = 2; //zu lvl 2 (hand)
        make2Darray(40, 30);
        airSound.stop();
        this.x = 65;
        this.y = 50;
        currentTime = millis();
        levelUpSound.play();
        handSound.loop();
      } else if (
        red(redCol) == 255 &&
        green(redCol) == 255 &&
        blue(redCol) == 0
      ) {
        level = 3; //zu lvl 3 (face)
        make2Darray(40, 30);
        score = score + 1000;
        airSound.stop();
        handSound.stop();
        this.x = 60;
        this.y = 230;
        currentTime = millis();
        levelUpSound.play();
        faceSound.setVolume(0.8);
        faceSound.loop();
      } else if (
        red(redCol) == 0 &&
        green(redCol) == 0 &&
        blue(redCol) == 255
      ) {
        level = 4; //zu lvl 4 (eye)
        make2Darray(40, 30);
        score = score + 3000;
        faceSound.stop();
        mouthSound.stop();
        this.x = 200;
        this.y = 150;
        this.resetAntiV();
        levelUpSound.play();
        eyeSound.loop();
      } else if (
        red(redCol) == 255 &&
        green(redCol) == 0 &&
        blue(redCol) == 255
      ) {
        level = 5; //zu lvl 5 (mouth)
        make2Darray(40, 30);
        score = score + 2000;
        faceSound.stop();
        
        this.x = 200;
        this.y = 165;
        this.resetAntiV();
        levelUpSound.play();
        mouthSound.loop();
      } else if (
        red(redCol) == 0 &&
        green(redCol) == 255 &&
        blue(redCol) == 0
      ) {
        level = 6; //zu lvl 5 (nose)
        make2Darray(40, 30);
        score = score + 2000;
        faceSound.stop();
        this.x = 200;
        this.y = 180;
        this.resetAntiV();
        levelUpSound.play();
        noseSound.loop();
      }
    }
  }

  animate() {
    this.checkDoors();
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

  colormap() {
    if (this.alive) {
      if(level > 11) {
        colorMap[11].loadPixels();
      } else {
      colorMap[level].loadPixels();

      //Mauerstopdefinition
      let myX = ceil(this.x + this.xspeed * 2);
      let myY = ceil(this.y + this.yspeed * 2);

      ///über Bande
      if (myX >= colorMap[level].width) {
        myX -= colorMap[level].width;
      } else if (myX < 0) {
        myX += colorMap[level].width;
      }
      if (myY >= colorMap[level].height) {
        myY -= colorMap[level].height;
      } else if (myY < 0) {
        myY += colorMap[level].height;
      }

      //Farbe abfragen
      let c = colorMap[level].get(myX, myY);
      if (lightness(c) != 0) {
        //wenn helligkeit nicht 0, dann zeigen
      } else {
        this.dir(0, 0); //ansonsten, stoppen
        wallRun.play();
      }
    }
      this.show();
    
  }
}

  isDying(enemyX, enemyY, resetX, resetY) {
    if (dist(this.x, this.y, enemyX, enemyY) < 10) {
      if (this.lives > 0) {
        this.x = resetX;
        this.y = resetY;
        this.resetAntiV();
        hurtSound.setVolume(3);
        hurtSound.play();
        this.lives--;
      } else if(level <= 6 ){
        mouthSound.stop();
        noseSound.stop();
        eyeSound.stop();
        level = 10;
        dieSound.setVolume(3);
        dieSound.play();
       this.lives = 3;
       this.alive = false;
      }
    }
  }

  resetAntiV() {
    antiV[0].reset(15, 15);
    antiV[1].reset(25, 285);
    antiV[2].reset(380, 15);
    antiV[3].reset(365, 285);
    antiV[4].reset(200, 285);

    antiVTC[0].reset(10, 90);
    antiVTC[1].reset(380, 90);
  }
}
