class Cactuses {
    constructor() {
        this.posX = 750;
        this.posY = 250;
        this.cactus = [];
        this.spawnDelay = 0; // Tiempo entre spawns
        this.sprite = ""
    }

    spawnCactus() {
        if (this.spawnDelay <= 0) {
            let rep = floor(random(1, 5)); // Genera entre 1 y 4 cactus
            for (let i = 0; i < rep; i++) {
                this.cactus.push(new Cactus(this.posX + i * 15, this.posY, this.sprite)); // Espaciado entre cactus
            }
            this.spawnDelay = 100; // Resetea el temporizador para esperar antes de generar otro cúmulo
        }
    }

    update() {
        this.spawnDelay--; // Reduce el temporizador de espera

        // Actualizar velocidad de todos los cactus según el nivel
        for (let i = 0; i < this.cactus.length; i++) {
            this.cactus[i].move();
        }

        this.cactus = this.cactus.filter(c => c.posX > -c.sizeW); // Elimina los cactus fuera de pantalla
    }

    display() {
        for (let i = 0; i < this.cactus.length; i++) {
            this.cactus[i].display();
        }
    }
}