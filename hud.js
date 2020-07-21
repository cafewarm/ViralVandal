class hud {
  constructor() {
    this.x = 400;
    this.y = 0;
  }

  highscore() {
    if (score > highscore) {
      highscore = score;
    } textAlign(LEFT);
    fill("#FFFFFF");
    textFont(bold);
    textSize(8);
    text(highscore, 408, 60);

    textFont(thin);
    textSize(7);
    text("Highcore", 408, 70);

    this.score();

  }

  score() {
    fill("#FFFFFF");
    textFont(bold);
    textSize(8);
    text(score, 410, 20);

    textFont(thin);
    textSize(7);
    text("Score", 410, 32);

    push();
    stroke(0, 0, 100);
    strokeWeight(2);
    noFill();
    rect(405, 5, 40, 290);
    pop();


  }

  room(raum) {
    fill("#FFFFFF");
    textFont(bold);
    textSize(8);
    text(raum, 410, 285);

    textFont(thin);
    textSize(8);

    for (let i = 0; i < herpes.lives ; i++ ) {
        image(H[0], 412, 250 - i * 20, 15, 15);
    }
  }

  timer(time, resetX, resetY) {
    countdown = floor(millis() - currentTime) / 1000;
dieSound.setVolume(3);
    if (countdown >= time) {
      this.countDownSize = 0;
      currentTime = millis();
      print("endofTimer");

     if (herpes.lives > 0) {
      herpes.x = resetX;
      herpes.y = resetY;
      this.resetAntiV();
      hurtSound.setVolume(3);
      hurtSound.play();
      herpes.lives--;
    } else if(level === 0 ){
      herpes.alive = false;
      level = 8;
      dieSound.play();
      herpes.lives = 3;
      airSound.stop();
    } else if(level === 1){
      herpes.alive = false;
      level = 8;
      shoeSound.stop();
      dieSound.play();
      herpes.lives = 3;
    } else if(level === 2){
      herpes.alive = false;
      level = 9;
      handSound.stop();
      dieSound.play();
      herpes.lives = 3;
    } else if(level === 3){
      herpes.alive = false;
      level = 11;
      faceSound.stop();
      dieSound.play();
      herpes.lives = 3;
    }
      
    } else {
      this.countdownSize = map(countdown, 0, time, -100, 0);

      fill(155, 0, 0);
      rect(435, 270, 7, this.countdownSize);
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
