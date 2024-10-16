const dinosaur = {
    posX: 60,
    posY: 250,
    size: 80,
    velocityY: 0,
    sprite: "",


    display() {
        if (this.sprite) {
            image(this.sprite, this.posX, this.posY - this.size / 2, this.size, this.size); // Mostrar la imagen escalada
        } else {
            fill(0);
            rect(this.posX, this.posY, this.size, this.size); // Fallback si no se carga la imagen
        }
    },

    update() {
        this.velocityY += gravity;
        this.posY += this.velocityY;

        if (this.posY > groundLevel) {
            this.posY = groundLevel;
            this.velocityY = 0;
        }
    },

    jump() {
        if (this.posY === groundLevel) {
            this.velocityY = jumpStrength;
        }
    }
};