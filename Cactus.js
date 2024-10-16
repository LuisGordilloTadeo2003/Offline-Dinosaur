class Cactus {
    constructor(posX, posY, sprite) {
        this.sizeH = floor(random(30, 60));
        this.sizeW = 20;
        this.posX = posX;
        this.posY = posY;
        this.velocity = 7;
        this.sprite = sprite;
    }

    display() {
        if (this.sprite) {
            image(this.sprite, this.posX, this.posY - this.sizeH / 2, this.sizeW, this.sizeH); // Mostrar la imagen escalada
        } else {
            fill(0);
            rect(this.posX, this.posY, this.sizeW, this.sizeH); // Fallback si no se carga la imagen
        }
    }

    move() {
        this.posX -= this.velocity;
    }
}