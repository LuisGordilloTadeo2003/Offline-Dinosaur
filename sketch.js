// VARIABLES GLOBALES
let gravity = 0.55;
let jumpStrength = -10;
let groundLevel = 250;

let points = 0;
let level = 1;

let cactuses;

function preload() {
  let dinoSprite = loadImage("dino.png")
  let cacSprite = loadImage("cac_1.png")

  dinosaur.sprite = dinoSprite;
  cactuses = new Cactuses();
  cactuses.sprite = cacSprite;
}

function setup() {
  createCanvas(800, 300);
}

function draw() {
  background(255);

  // Dibujar línea del suelo
  strokeWeight(3);
  line(0, 270, 800, 270);

  // Actualizar y mostrar dinosaurio (suponiendo que ya lo tienes implementado)
  dinosaur.update();
  dinosaur.display();

  // Actualizar y mostrar cactus
  cactuses.update();
  cactuses.display();

  // Generar cactus si el último está a cierta distancia
  cactuses.spawnCactus();

  // Incrementar puntuación
  points++;

  // Mostrar puntos y nivel
  fill(0);
  textSize(17);
  text(points, 20, 30);
  text('Level ' + level, 20, 50);

  // Incrementar dificultad por cada 100 puntos
  if (points % 100 === 0) {
    level++;
    for (let i = 0; i < cactuses.cactus.length; i++) {
      cactuses.cactus[i].velocity += 0.5; // Incrementar velocidad de los cactus
    }
  }
}

function keyPressed() {
  if (key == ' ') {
    dinosaur.jump(); // Suponiendo que tienes una función de salto
  }
}