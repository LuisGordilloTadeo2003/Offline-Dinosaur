// VARIABLES GLOBALES
let gravity = 0.55;
let jumpStrength = -10;
let groundLevel = 250;

let points = 0;
let level = 1;

let cactuses;

function preload() {
  // Cargar imágenes de la animación del salto
  dinosaur.spriteJumping = [
    loadImage("./img_SpriteVol/Sprite_Frontflip/DinoFrontflip_1.png"),
    loadImage("./img_SpriteVol/Sprite_Frontflip/DinoFrontflip_2.png"),
    loadImage("./img_SpriteVol/Sprite_Frontflip/DinoFrontflip_3.png"),
    loadImage("./img_SpriteVol/Sprite_Frontflip/DinoFrontflip_4.png")
  ];

  // Cargar imágenes de la animación del caminar
  dinosaur.spriteWalking = [
    loadImage("./img_SpriteVol/Sprite_Walk/DinoWalk_1.png"),
    loadImage("./img_SpriteVol/Sprite_Walk/DinoWalk_2.png"),
    loadImage("./img_SpriteVol/Sprite_Walk/DinoWalk_3.png"),
    loadImage("./img_SpriteVol/Sprite_Walk/DinoWalk_4.png")
  ];

  // Cargar imágenes del caballo para el boss
  dinosaur.spriteHorse = [
    loadImage("./img_SpriteVol/Sprite_Horse/SpriteHorse_1.png"),
    loadImage("./img_SpriteVol/Sprite_Horse/SpriteHorse_2.png"),
    loadImage("./img_SpriteVol/Sprite_Horse/SpriteHorse_3.png"),
    loadImage("./img_SpriteVol/Sprite_Horse/SpriteHorse_4.png")
  ];

  // Cargar imagen del cactus
  let cacSprite = loadImage("cac_1.png");
  cactuses = new Cactuses();
  cactuses.sprite = cacSprite;
}

function setup() {
  createCanvas(800, 300);
}

function draw() {
  background(255);

  if (dinosaur.isAlive) {
    line(0, 265, 800, 265);
    // Actualizar y mostrar dinosaurio
    dinosaur.update();
    dinosaur.display();

    // Actualizar y mostrar cactus
    cactuses.spawnCactus();
    cactuses.update();
    cactuses.display();

    // Incrementar puntuación
    points++;
  } else {
    fill(255, 0, 0);
    textSize(32);
    text('Game Over', 300, 150); // Mostrar mensaje de "Game Over"
  }

  // Mostrar puntos y nivel
  fill(0);
  textSize(17);
  text(points, 20, 30);
  text('Level ' + level, 20, 50);

  // Incrementar dificultad por cada 100 puntos
  if (points % 100 === 0 && dinosaur.isAlive) {
    level++; // Incrementar nivel
  }
}

function keyPressed() {
  if (key == ' ') {
    dinosaur.jump(); // Hacer saltar al dinosaurio
  }
}