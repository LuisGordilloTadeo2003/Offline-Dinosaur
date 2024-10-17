const dinosaur = {
    posX: 60,
    posY: 250,
    size: 80,
    velocityY: 0,
    spriteIndex: 0, // Índice de la imagen actual
    spriteWalking: [], // Imágenes cuando camina
    spriteJumping: [], // Imágenes durante el salto
    spriteHorse: [], // Imagenes durante el boss
    isAlive: true, // Estado del dinosaurio
    isJumping: false, // Estado del salto
    jumpDurationFrames: 0, // Duración total del salto en fotogramas
    walkFrameCounter: 0, // Contador de fotogramas para el caminar
    jumpFrameCounter: 0, // Contador de fotogramas para el salto
    framesPerSprite: 35, // Cuántos fotogramas mostrar cada imagen del salto o caminar

    display() {
        if (this.boss()) {
            // Mostrar los sprites de caballo si estamos en los niveles 10 a 12
            let sprite = this.spriteHorse[this.spriteIndex];
            image(sprite, this.posX, this.posY - this.size / 2, this.size, this.size);
        } else if (this.isJumping && this.spriteJumping.length > 0) {
            // Mostrar la imagen del salto actual
            let sprite = this.spriteJumping[this.spriteIndex];
            image(sprite, this.posX, this.posY - this.size / 2, this.size, this.size);
        } else if (this.spriteWalking.length > 0) {
            // Si no está saltando y no estamos en niveles de boss, mostrar la imagen de caminar
            let sprite = this.spriteWalking[this.spriteIndex];
            image(sprite, this.posX, this.posY - this.size / 2, this.size, this.size);
        } else {
            fill(0);
            rect(this.posX, this.posY, this.size, this.size); // Fallback si no se carga la imagen
        }
    },


    update() {
        this.velocityY += gravity;
        this.posY += this.velocityY;

        // Detectar si el dinosaurio está en el suelo o en el aire
        if (this.posY >= groundLevel) {
            this.posY = groundLevel;
            this.velocityY = 0;
            this.isJumping = false; // El dinosaurio ha aterrizado
            this.jumpFrameCounter = 0; // Reiniciar el contador de fotogramas del salto

            // Lógica para cambiar de imagen mientras camina
            this.walkFrameCounter++;
            if (this.walkFrameCounter >= 15) {
                this.walkFrameCounter = 0;
                this.spriteIndex++; // Pasar al siguiente frame de caminar o caballo
                let spritesArray = this.boss() ? this.spriteHorse : this.spriteWalking;
                if (this.spriteIndex >= spritesArray.length) {
                    this.spriteIndex = 0; // Reiniciar para hacer un bucle
                }
            }
        } else {
            this.isJumping = true; // El dinosaurio está en el aire
            this.jumpFrameCounter++; // Incrementar contador de fotogramas

            // Cambiar de imagen basado en el salto
            if (this.jumpFrameCounter >= this.framesPerSprite) {
                this.jumpFrameCounter = 0; // Reiniciar el contador de fotogramas
                this.spriteIndex++; // Pasar al siguiente frame del salto
                if (this.spriteIndex >= this.spriteJumping.length) {
                    this.spriteIndex = this.spriteJumping.length - 1; // Mantener el último frame hasta aterrizar
                }
            }
        }
    },

    jump() {
        if (this.posY === groundLevel) {
            this.velocityY = jumpStrength;
            this.isJumping = true; // Iniciar estado de salto
            this.spriteIndex = 0;
            this.jumpFrameCounter = 0; // Reiniciar el contador de fotogramas del salto

            // Calcular la duración total del salto en segundos
            let jumpDurationSeconds = 2 * (-jumpStrength / gravity);

            // Convertir esa duración a fotogramas (asumiendo 60 FPS)
            this.jumpDurationFrames = Math.floor(jumpDurationSeconds * 60);

            // Calcular cuántos fotogramas mostrar cada imagen del salto
            this.framesPerSprite = Math.floor(35 / this.spriteJumping.length); // Ajuste
        }
    },

    die() {
        this.isAlive = false; // Dinosaurio muere
    },

    superpower() {
        // Implementación de una superpower futura
    },

    boss() {
        // Retorna true si estamos en un nivel de boss (niveles 10 a 12)
        return level >= 50 && level <= 60;
    }
};
