let spritesheet;
let spritedata;
let animation = [];
let colorMap = [];
let room = [];
let deathScreen = [];
let KC = [];
let TC = [];
let H = [];

let currentTime = 0;
let countdown;
let countdownSize;

let targetX;
let targetY;

let level = 0;
let vSpeed = 4;

let introActimel ;
let introTCell;

let dSpeed = 0.6;
let dSpeedMax = 4;
let dSpeedMin = 1.5;
let TCSpeed = 0.8;

let score = 0;
let highscore = 0;
let coins_arr = [];

let antiV = [];
let antiVCount = 5;

let antiVTC = [];
let TCCount = 2;

let wallRun;
let walk;
let walkSound;
let eat;

function preload() {
  spritedataRed = loadJSON("assets/redWalkRight.json");
  spritesheetRed = loadImage("assets/redWalkRight.png");
  bold = loadFont("assets/font/Fedra09-Bold.otf");
  thin = loadFont("assets/font/Fedra09-Normal.otf");

  soundFormats("mp3");
  wallRun = loadSound("assets/sound/wallRun.mp3");
  walk = loadSound("assets/sound/walk.mp3");
  eat = loadSound("assets/sound/eat.mp3");
  shoeSound = loadSound("assets/sound/shoe.mp3");
  airSound = loadSound("assets/sound/air.mp3");
  faceSound = loadSound("assets/sound/face.mp3");
  menuSound = loadSound("assets/sound/menu.mp3");
  dieSound = loadSound("assets/sound/die.mp3");
  hurtSound = loadSound("assets/sound/hurt.mp3");
  beginSound = loadSound("assets/sound/begin.mp3");
  levelUpSound = loadSound("assets/sound/levelUp.mp3");
  eyeSound = loadSound("assets/sound/eye.mp3");
  mouthSound = loadSound("assets/sound/mouth.mp3");
  noseSound = loadSound("assets/sound/nose.mp3");
  handSound = loadSound("assets/sound/hand.mp3");


  colorMap[0] = loadImage("assets/ColorMaps/CM_air.png");
  colorMap[1] = loadImage("assets/ColorMaps/CM_shoe.png");
  colorMap[2] = loadImage("assets/ColorMaps/CM_hand.png");
  colorMap[3] = loadImage("assets/ColorMaps/CM_face.png");
  colorMap[4] = loadImage("assets/ColorMaps/CM_eye.png");
  colorMap[5] = loadImage("assets/ColorMaps/CM_mouth.png");
  colorMap[6] = loadImage("assets/ColorMaps/CM_nose.png");
  colorMap[7] = loadImage("assets/ColorMaps/black.png");
  colorMap[8] = loadImage("assets/ColorMaps/black.png");
  colorMap[9] = loadImage("assets/ColorMaps/black.png");
  colorMap[10] = loadImage("assets/ColorMaps/black.png");
  colorMap[11] = loadImage("assets/ColorMaps/white.png");

  room[0] = loadImage("assets/rooms/air.png");
  room[1] = loadImage("assets/rooms/shoe.png");
  room[2] = loadImage("assets/rooms/hand.png");
  room[3] = loadImage("assets/rooms/face.png");
  room[4] = loadImage("assets/rooms/eye.png");
  room[5] = loadImage("assets/rooms/mouth.png");
  room[6] = loadImage("assets/rooms/nose.png");

  KC[0] = loadImage("assets/Sprites/KC_pink/KO/TC_KO1.png");
  KC[1] = loadImage("assets/Sprites/KC_pink/KO/TC_KO2.png");
  KC[2] = loadImage("assets/Sprites/KC_pink/KO/TC_KO3.png");
  KC[3] = loadImage("assets/Sprites/KC_pink/WD/TC_WD1.png");
  KC[4] = loadImage("assets/Sprites/KC_pink/WD/TC_WD2.png");
  KC[5] = loadImage("assets/Sprites/KC_pink/WD/TC_WD3.png");
  KC[6] = loadImage("assets/Sprites/KC_pink/WL/TC_WL1.png");
  KC[7] = loadImage("assets/Sprites/KC_pink/WL/TC_WL2.png");
  KC[8] = loadImage("assets/Sprites/KC_pink/WL/TC_WL3.png");
  KC[9] = loadImage("assets/Sprites/KC_pink/WR/TC_WR1.png");
  KC[10] = loadImage("assets/Sprites/KC_pink/WR/TC_WR2.png");
  KC[11] = loadImage("assets/Sprites/KC_pink/WR/TC_WR3.png");
  KC[12] = loadImage("assets/Sprites/KC_pink/WU/TC_WU1.png");
  KC[13] = loadImage("assets/Sprites/KC_pink/WU/TC_WU2.png");
  KC[14] = loadImage("assets/Sprites/KC_pink/WU/TC_WU3.png");
  KC[15] = loadImage("assets/Sprites/KC_pink/TC_N.png");

  TC[0] = loadImage("assets/Sprites/TK_grey/TK_D1@4x-8.png");
  TC[1] = loadImage("assets/Sprites/TK_grey/TK_KD2@4x-8.png");
  TC[2] = loadImage("assets/Sprites/TK_grey/TK_KL1@4x-8.png");
  TC[3] = loadImage("assets/Sprites/TK_grey/TK_KL2@4x-8.png");
  TC[4] = loadImage("assets/Sprites/TK_grey/TK_KO1@4x-8.png");
  TC[5] = loadImage("assets/Sprites/TK_grey/TK_KO2@4x-8.png");
  TC[6] = loadImage("assets/Sprites/TK_grey/TK_KR1@4x-8.png");
  TC[7] = loadImage("assets/Sprites/TK_grey/TK_KR2@4x-8.png");
  TC[8] = loadImage("assets/Sprites/TK_grey/TK_KU1@4x-8.png");
  TC[9] = loadImage("assets/Sprites/TK_grey/TK_KU2@4x-8.png");
  TC[10] = loadImage("assets/Sprites/TK_grey/TK_N@4x-8.png");

  H[0] = loadImage("assets/Sprites/Herpes_red/H_N3@4x-8.png");

  deathScreen[0] = loadImage("assets/deathScreens/Artboard 1.png");
}

function setup() {
  let canv = createCanvas(450, 300);

  // console.log(window.innerWidth);
  // console.log(window.innerHeight);

  if (windowHeight < windowWidth) {
    //querformat
    canv.style("width", windowHeight * 3/2+ "px");
    canv.style("height", windowHeight + "px");
    print("höhe ist größer");
  } else if (windowHeight > windowWidth) {
    //Hochformat
    canv.style("width", windowWidth  + "px");
    canv.style("height", windowWidth * 2 / 3 + "px");
    print("weite ist größer");
  }

  frameRate(10);

  let frames = spritedataRed.frames;
  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].frame;
    let img = spritesheetRed.get(pos.x, pos.y, pos.w, pos.h);
    animation.push(img);
  }

  herpes = new redSprite(animation, 100, 100);

 
  introActimel = new KCell(280, 100, 0);
  introTCell = new TCell(350, 100, 0);

  for (let i = 0; i < antiVCount; i++) {
    let x = 10 + i * 10;
    let y = 280;
    antiV[i] = new KCell(x, y, random(dSpeedMin, dSpeedMax) * dSpeed);
  }
  for (let i = 0; i < TCCount; i++) {
    let x = 10 + i * 10;
    let y = 280;
    antiVTC[i] = new TCell(x, y, random(dSpeedMin, dSpeedMax) * TCSpeed);
    antiVTC[i].setScale(25);
  }

  hud = new hud();
  walkSound = new p5.SoundLoop(walkSoundFunk, 5);

  targetX = herpes.x;
  targetY = herpes.y;

  level = 7;
}

function walkSoundFunk() {
  walk.play();
}

function draw() {
  background(0);

  hud.highscore();
  hud.score();

  //leveldefinition
  switch (level) {
    case 0: //air
      image(colorMap[0], 0, 0);
      image(room[0], 0, 0);
      hud.room("air");
      hud.timer(30, 20, 215);
      herpes.alive = true;
      coinGrid();

      break;

    case 1: //shoe
      image(colorMap[1], 0, 0);
      image(room[1], 0, 0);

      hud.room("shoe");
      hud.timer(25, 200, 250);
      herpes.alive = true;

      coinGrid();

      break;

    case 2: //hand
      image(colorMap[2], 0, 0);
      image(room[2], 0, 0);
      herpes.alive = true;

      hud.room("hand");
      hud.timer(25, 70, 50);

      coinGrid();

      break;

    case 3: //face
      image(colorMap[3], 0, 0);
      image(room[3], 0, 0);
      herpes.alive = true;

      hud.room("face");
      hud.timer(20, 60, 215);

      coinGrid();

      break;

    case 4: //eye
      image(colorMap[4], 0, 0);
      image(room[4], 0, 0);
      hud.room("eye");
      coinGrid();

      //Auge
      push();
      noStroke();
      rectMode(CENTER);
      fill(45, 76, 27);
      rect(
        map(herpes.x, 0, 400, 185, 215),
        map(herpes.y, 0, 300, 125, 155),
        30,
        40
      );
      rect(
        map(herpes.x, 0, 400, 185, 215),
        map(herpes.y, 0, 300, 125, 155),
        40,
        30
      );
      fill(0);
      rect(
        map(herpes.x, 0, 400, 185, 215),
        map(herpes.y, 0, 300, 125, 155),
        25,
        25
      );
      pop();

      herpes.alive = true;
      herpes.setScale(15);

      for (let i = 0; i < antiVCount; i++) {
        antiV[i].alive = true;
        antiV[i].colormap(herpes.x, herpes.y);
        herpes.isDying(antiV[i].x, antiV[i].y, 200, 150);
      }

      for (let i = 0; i < TCCount; i++) {
        antiVTC[i].alive = true;
        antiVTC[i].colormap(herpes.x, herpes.y);
        herpes.isDying(antiVTC[i].x, antiVTC[i].y, 200, 150);
      }

      break;

    case 5: //mouth
      image(colorMap[5], 0, 0);
      image(room[5], 0, 0);
      hud.room("mouth");
      coinGrid();

      herpes.alive = true;
      herpes.setScale(15);

      for (let i = 0; i < antiVCount; i++) {
        antiV[i].alive = true;
        antiV[i].colormap(herpes.x, herpes.y);
        herpes.isDying(antiV[i].x, antiV[i].y, 198, 162);
      }
      for (let i = 0; i < TCCount; i++) {
        antiVTC[i].alive = true;
        antiVTC[i].colormap(herpes.x, herpes.y);
        herpes.isDying(antiVTC[i].x, antiVTC[i].y, 198, 162);
      }

      break;

    case 6: //nose
      image(colorMap[6], 0, 0);
      image(room[6], 0, 0);
      hud.room("nose");
      coinGrid();

      herpes.alive = true;
      herpes.setScale(15);

      for (let i = 0; i < antiVCount; i++) {
        antiV[i].alive = true;
        antiV[i].colormap(herpes.x, herpes.y);
        herpes.isDying(antiV[i].x, antiV[i].y, 200, 180);
      }
      for (let i = 0; i < TCCount; i++) {
        antiVTC[i].alive = true;
        antiVTC[i].colormap(herpes.x, herpes.y);
        herpes.isDying(antiVTC[i].x, antiVTC[i].y, 200, 180);
      }

      break;

    case 7: //StartScreen
      background(0);
      push();
      score = 0;
      textAlign(CENTER);
      textFont(bold);
      textSize(50);
      fill(255);
      text("Viral Vandal", 225, height / 2 +-20);
      textSize(9);
      fill(255, map(sin(millis() / 150), -1, 1, 0, 255));
      text("Press > to start the viral invasion", 225, 200);
      fill(255);
      text("Press ˇ to start the intro", width / 2, 280);
      text("Press ^ for info", width/2, 265);

      if (highscore > 0) {
        text("current Highscore", width / 2 -20, 50);
        textFont(bold);
        textAlign(LEFT);
        text(highscore, width / 2 + 50, 50);
  
  
      }
      pop();

      break;

    case 8: //DeathScreen air
      background(0);
      push();

      textAlign(RIGHT);

      fill(255);
      textSize(9);
      text("Your Score", width / 2, 80);
      textFont(bold);
      textSize(12);
      text("Highscore", width / 2, 65);
      textFont(thin);
      textSize(9);
      textAlign(LEFT);
      text(score, width / 2 + 10, 80);
      textFont(bold);
      textSize(12);
      text(highscore, width / 2 + 10, 65);
      textFont(thin);
      textSize(9);
      textAlign(CENTER);

      text("You didn't make it into a host body.", width / 2, 240);
      text("Being exposed to the harsh conditions of ", width / 2, 250);
      text("your environment for too long kills you.", width / 2, 260);
      textFont(bold);
      fill(255, map(sin(millis() / 300), -1, 1, 0, 255));
      text("Press > to continue", width / 2, 160);

      textSize(12);
      text("GAME OVER", width / 2, 150);
      fill(255);
      text("Death by air", width / 2, 225);

      pop();
      herpes.alive = false;

      break;

    case 9: //DeathScreen sanitizer
      background(0);
      push();
      textAlign(RIGHT);
      fill(255);
      textSize(9);
      text("Your Score", width / 2, 80);
      textFont(bold);
      textSize(12);
      text("Highscore", width / 2, 65);
      textFont(thin);
      textSize(9);
      textAlign(LEFT);
      text(score, width / 2 + 10, 80);
      textFont(bold);
      textSize(12);
      text(highscore, width / 2 + 10, 65);
      textFont(thin);
      textSize(9);
      textAlign(CENTER);

      text("Hand Sanitizer has been used  ", width / 2, 240);
      text("and dissolved your membrane. ", width / 2, 250);
      text("You need your membrane to survive.", width / 2, 260);
      textFont(bold);
      fill(255, map(sin(millis() / 300), -1, 1, 0, 255));
      text("Press > to continue", width / 2, 160);

      textSize(12);
      text("GAME OVER", width / 2, 150);
      fill(255);
      text("Death by hand sanitizer", width / 2, 225);

      pop();
      herpes.alive = false;

      break;

    case 10: //DeathScreen Immune System
      background(0);
      push();
      fill(255);
      textAlign(RIGHT);
      textSize(9);
      text("Your Score", width / 2, 80);
      textFont(bold);
      textSize(12);
      text("Highscore", width / 2, 65);
      textFont(thin);
      textSize(9);
      textAlign(LEFT);
      text(score, width / 2 + 10, 80);
      textFont(bold);
      textSize(12);
      text(highscore, width / 2 + 10, 65);
      textFont(thin);
      textSize(9);
      textAlign(CENTER);

      text("The immune system identified you as stranger  ", width / 2, 240);
      text("to the body and put you out of action. ", width / 2, 250);
      text("Avoid T cells to live longer.", width / 2, 260);
      textFont(bold);
      fill(255, map(sin(millis() / 300), -1, 1, 0, 255));
      text("Press > to continue", width / 2, 160);

      textSize(12);
      text("GAME OVER", width / 2, 150);
      fill(255);
      text("Death by immune system", width / 2, 225);

      pop();

      for (let i = 0; i < antiVCount; i++) {
        antiV[i].alive = false;
      }
      for (let i = 0; i < TCCount; i++) {
        antiVTC[i].alive = false;
      }
      break;

    case 11: //DeathScreen soap system
      background(0);
      push();
      textAlign(RIGHT);
      fill(255);
      textSize(9);
      text("Your Score", width / 2, 80);
      textFont(bold);
      textSize(12);
      text("Highscore", width / 2, 65);
      textFont(thin);
      textSize(9);
      textAlign(LEFT);
      text(score, width / 2 + 10, 80);
      textFont(bold);
      textSize(12);
      text(highscore, width / 2 + 10, 65);
      textFont(thin);
      textSize(9);
      textAlign(CENTER);

      text("The hand you were on was washed with soap.", width / 2, 240);
      text("This dissolved your membrane.", width / 2, 250);
      text("You need your membrane to survive.", width / 2, 260);
      textFont(bold);
      fill(255, map(sin(millis() / 300), -1, 1, 0, 255));
      text("Press > to continue", width / 2, 160);

      textSize(12);
      text("GAME OVER", width / 2, 150);
      fill(255);
      text("Death by soap", width / 2, 225);

      pop();
      herpes.alive = false;
      break;

    case 12: //Intro 1
      background(0);
      push();
      textFont(thin);
      textSize(9);
      textAlign(CENTER);
      text("You are a tiny virus.", width / 2, 240);
      text("Survive and find a body to live in.", width / 2, 250);
      text(
        "Discover your environment to collect survival points.",
        width / 2,
        260
      );
      fill(255, map(sin(millis() / 300), -1, 1, 0, 255));
      textFont(bold);
      text("Press > to continue", width / 2, 280);

      pop();
      for (let c = 0; c < coins_array.length; c++) {
        if (coins_array) {
          coins_array[c].eaten(herpes.x, herpes.y);
          coins_array[c].show();
        }

        if (herpes.x <= 10) {
          coins_array[c].alive = true;
        }
      }

      herpes.alive = true;
      break;

    case 13: //Intro 2
      background(0);
      push();
      textFont(thin);
      textSize(9);
      textAlign(CENTER);
      text(
        "The immune system is your natural opponent living inside the body.",
        width / 2,
        240
      );
      text(
        "Killer T cells identify strangers to the body and put you out of action.",
        width / 2,
        250
      );
      text(
        "Once you have been discovered, memory T Cells will attack you, too.",
        width / 2,
        260
      );
      fill(255, map(sin(millis() / 300), -1, 1, 0, 255));
      textFont(bold);
      text("Press > to start playing", width / 2, 280);
      fill(255);
      textFont(thin);
      text("you – the virus", 100, 150);
      text("killer T cell     memory T cell", 320, 150);



      herpes.x = herpes.x + 8;
      herpes.setScale(45);
      introActimel.goLeft();;
      introTCell.goLeft();
      introActimel.setScale(45);
      introTCell.setScale(45);

    introActimel.alive = true;
    introTCell.alive = true;
      herpes.alive = true;
      break;

      case 14: // credits
      background(0);
      textFont(bold);
      textAlign(LEFT);
      textSize(12);
      text("disclaimer",20, 30 );
      text("credits", 20, 100);
textSize(7);
      text("map & level design ", 20, 130);
      text("character design ", 180, 130);
      text("programming", 20, 190);
      text("sound", 180, 190);
      text("programming support", 20, 250);
      text("software", 340, 130);



      textFont(thin);
      text("All depicted processes do not claim to be scientifically correct.", 20, 50);
      text("The aim is a fundamental and abstract approach to the topic.", 20, 60);

      text("Simon Kähler ", 20, 140);
      text("Simon Kähler ", 180, 140);
      text("Simon Kähler", 20, 200);
      text("Simon Kähler", 180, 200);
      text("Manuel Michel", 20, 260);
      text("P5.JS library \nVisual Studio Code \nAdobe Illustrator \nbeepbox.co \n", 340, 140)

      textAlign(CENTER);
      textFont(bold);
      fill(255, map(sin(millis() / 300), -1, 1, 0, 255));
      textFont(bold);
      text("Press ˇ to go back ", width / 2, 280);

      break;
  }
  print(keyCode);
  herpes.colormap();
  herpes.animate(vSpeed);
  herpes.setScale(25);

  for (let i = 0; i < antiVCount; i++) {
    antiV[i].animate(random(dSpeedMin, dSpeedMax) * dSpeed);
  }
  for (let i = 0; i < TCCount; i++) {
    antiVTC[i].animate(random(dSpeedMin, dSpeedMax) * TCSpeed);
  }
}

function keyReleased() {
  if (level == 7) {
    if (keyCode === RIGHT_ARROW) {
      level = 0;
      make2Darray(40, 30);
      currentTime = millis();
      menuSound.stop();
      beginSound.play();
      airSound.setVolume(0.7);
      airSound.loop();
      herpes.x = 30;
      herpes.y = 200;
    } else if (keyCode === DOWN_ARROW) {
      level = 12;
      herpes.x = 0;
      herpes.y = 100;
      herpes.dir(vSpeed, 0);
      menuSound.stop();
      coins_array = new Array(20);
      for (let c = 0; c < coins_array.length; c++) {
        let x = 5 + 20 * c;
        coins_array[c] = new Coin(x, 100);
        coins_array[c].show();
      } 
    }else if (keyCode === UP_ARROW) {
      level = 14;
      menuSound.stop();
    }
  } else if (level < 7) {
    if (keyCode === UP_ARROW) {
      herpes.dir(0, -vSpeed);
    } else if (keyCode === DOWN_ARROW) {
      herpes.dir(0, vSpeed);
    } else if (keyCode === RIGHT_ARROW) {
      herpes.dir(vSpeed, 0);
    } else if (keyCode === LEFT_ARROW) {
      herpes.dir(-vSpeed, 0);
    } else if (keyCode === ENTER) {
      airSound.stop();
      faceSound.stop();
      shoeSound.stop();
      menuSound.loop();
      mouthSound.stop();
      noseSound.stop();
      eyeSound.stop();

      level = 7;
      herpes.alive = false;
      herpes.dir(0, 0);
      for (let i = 0; i < antiVCount; i++) {
        antiV[i].alive = false;
      }
      for (let i = 0; i < TCCount; i++) {
        antiVTC[i].alive = false;
      }
    }
  }else if( level < 12) {
    if (keyCode === RIGHT_ARROW) {
    level = 7;

    }
  }else if (level == 12) {
    if (keyCode === RIGHT_ARROW) {
      level = 13;
      herpes.x = 100;
      herpes.y = 100;
      herpes.dir(-vSpeed, 0);
   

    } else if (keyCode === LEFT_ARROW) {
      menuSound.loop();
      level = 7;
      herpes.alive = false;
      herpes.dir(0, 0);
    }
  } else if (level == 13) {
    if (keyCode === RIGHT_ARROW) {
      level = 0;
      make2Darray(40, 30);
      currentTime = millis();
      menuSound.stop();
      beginSound.play();
      airSound.setVolume(0.7);
      airSound.loop();
      herpes.x = 30;
      herpes.y = 200;
    } else if (keyCode === LEFT_ARROW) {
      level = 12;
      herpes.x = 0;
      herpes.y = 100;
      herpes.dir(vSpeed, 0);
      menuSound.stop();
      coins_array = new Array(20);
      for (let c = 0; c < coins_array.length; c++) {
        let x = 5 + 20 * c;
        coins_array[c] = new Coin(x, 100);
        coins_array[c].show();
      }
    }
  } else if (level == 14) {
    if (keyCode === DOWN_ARROW) {
      menuSound.loop();
      level = 7;
      herpes.alive = false;
      herpes.dir(0, 0);    }
  }
  //additional leveltasten

  if (keyCode === 52) {
    //taste 4, eye
    level = 4;
    make2Darray(40, 30);
    herpes.dir(0, 0);
    herpes.x = 200;
    herpes.y = 150;

    antiV[0].reset(15, 15);
    antiV[1].reset(25, 285);
    antiV[2].reset(380, 15);
    antiV[3].reset(365, 285);
    antiV[4].reset(200, 285);
    for (let i = 0; i < antiVCount; i++) {
      antiV[i].dir(0, random(dSpeedMin, dSpeedMax) * dSpeed);
    }
    for (let i = 0; i < TCCount; i++) {
      antiVTC[i].dir(0, random(dSpeedMin, dSpeedMax) * TCSpeed);
    }
  } else if (keyCode === 51) {
    //taste 3, face
    level = 3;
    make2Darray(40, 30);
    herpes.dir(0, 0);
    herpes.x = 60;
    herpes.y = 230;
  } else if (keyCode === 53) {
    //taste 5,
    level = 5;
    make2Darray(40, 30);
    herpes.dir(0, 0);
    herpes.x = 200;
    herpes.y = 170;
  }
}
function make2Darray(cols, rows) {
  if (level < 7) {
    coins_arr = new Array(cols);
    for (let i = 0; i < coins_arr.length; i++) {
      coins_arr[i] = new Array(rows);
      for (let j = 0; j < coins_arr[i].length; j++) {
        let x = 5 + 10 * i;
        let y = 5 + 10 * j;

        let c = colorMap[level].get(x, y);
        if (red(c) == 193 && green(c) == 193 && blue(c) == 120) {
          coins_arr[i][j] = new Coin(x, y);
        }
      }
    }
  }
}

function coinGrid() {
  if (level < 7 && coins_arr.length > 0) {
    for (let i = 0; i < coins_arr.length; i++) {
      for (let j = 0; j < coins_arr[i].length; j++) {
        if (coins_arr[i][j]) {
          coins_arr[i][j].eaten(herpes.x, herpes.y);
          coins_arr[i][j].show();
          //coins_arr[i][j].eaten(mouseX, mouseY);
        }
      }
    }
  }
}
