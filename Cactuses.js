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
            if (dinosaur.boss()) {
                this.spawnDelay = random(40, 50);
            } else {
                if (this.spawnDelay < 50) {
                    this.spawnDelay = random(50, 60);
                } else {
                    this.spawnDelay = random(50 - level * 0.3, 100 - level * 0.3);
                }
            }
        }
    }

    update() {
        this.spawnDelay--; // Reduce el temporizador de espera
        console.log(this.spawnDelay);

        // Actualizar todos los cactus
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