class Cactus {
    constructor(posX, posY, sprite) {
        this.sizeH = floor(random(30, 60));
        this.sizeW = 20;
        this.posX = posX;
        this.posY = posY;
        this.velocity = 7;
        this.sprite = sprite;
    }

    checkCollision(dino) {
        // Aproximar la hitbox del cactus a un rectángulo más cercano a su tamaño
        let cactusHitbox = {
            x: this.posX,
            y: this.posY - this.sizeH,
            width: this.sizeW,
            height: this.sizeH
        };

        // Aproximar la hitbox del dinosaurio con sus dimensiones
        let dinoHitbox = {
            x: dino.posX,
            y: dino.posY - dino.size,
            width: dino.size * 0.8, // Reducir ligeramente el ancho para ajustar mejor
            height: dino.size * 0.9 // Reducir ligeramente la altura
        };

        // Verificar colisión usando un algoritmo de colisión de rectángulos
        if (cactusHitbox.x < dinoHitbox.x + dinoHitbox.width &&
            cactusHitbox.x + cactusHitbox.width > dinoHitbox.x &&
            cactusHitbox.y < dinoHitbox.y + dinoHitbox.height &&
            cactusHitbox.y + cactusHitbox.height > dinoHitbox.y) {
            dino.die(); // El dinosaurio muere si hay colisión
        }
    }

    display() {
        if (this.sprite) {
            image(this.sprite, this.posX, this.posY - this.sizeH, this.sizeW, this.sizeH);
        } else {
            fill(0);
            rect(this.posX, this.posY, this.sizeW, this.sizeH);
        }
    }

    move() {
        this.posX -= this.velocity;
    }
}