class Cactuses {
    constructor() {
        this.posX = 750;
        this.posY = 280;
        this.cactus = [];
        this.spawnDelay = 0; // Tiempo entre spawns
        this.sprite = ""
    }

    spawnCactus() {
        if (this.spawnDelay <= 0) {
            let rep = floor(random(1, 5));
            for (let i = 0; i < rep; i++) {
                this.cactus.push(new Cactus(this.posX + i * 15, this.posY, this.sprite));
            }
            this.spawnDelay = 100;
        }
    }

    update() {
        this.spawnDelay--; // Reduce el temporizador de espera

        // Actualizar velocidad de todos los cactus según el nivel
        for (let i = 0; i < this.cactus.length; i++) {
            this.cactus[i].move();
            this.cactus[i].checkCollision(dinosaur);
        }

        this.cactus = this.cactus.filter(c => c.posX > -c.sizeW); // Elimina los cactus fuera de pantalla
    }

    display() {
        for (let i = 0; i < this.cactus.length; i++) {
            this.cactus[i].display();
        }
    }
}