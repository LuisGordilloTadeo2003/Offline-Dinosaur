const dinosaur = {
    posX: 60,
    posY: 250,
    size: 80,
    velocityY: 0,
    spriteIndex: 0, // Índice de la imagen actual
    spriteWalking: null, // Imagen cuando camina
    spriteJumping: [], // Imágenes durante el salto
    isAlive: true, // Estado del dinosaurio
    isJumping: false, // Estado del salto
    jumpDurationFrames: 0, // Duración total del salto en fotogramas
    jumpFrameCounter: 0, // Contador de fotogramas para el salto
    framesPerSprite: 0, // Cuántos fotogramas mostrar cada imagen del salto

    display() {
        if (this.isJumping && this.spriteJumping.length > 0) {
            // Mostrar la imagen del salto actual
            let sprite = this.spriteJumping[this.spriteIndex];
            console.log(this.spriteJumping.length, this.spriteIndex, sprite)
            image(sprite, this.posX, this.posY - this.size / 2, this.size, this.size);
        } else if (this.spriteWalking) {
            // Si no está saltando, mostrar la imagen de caminar
            image(this.spriteWalking, this.posX, this.posY - this.size / 2, this.size, this.size);
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
            this.spriteIndex = 0;
        } else {
            this.isJumping = true; // El dinosaurio está en el aire
            this.jumpFrameCounter++; // Incrementar contador de fotogramas

            console.log(this.jumpFrameCounter, this.framesPerSprite);
            // Cambiar de imagen basado en el salto
            if (this.jumpFrameCounter >= this.framesPerSprite) {
                this.jumpFrameCounter = 0; // Reiniciar el contador de fotogramas
                this.spriteIndex++; // Pasar al siguiente frame

                // Asegurarse de que no se exceda el número de frames de salto
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
            this.framesPerSprite = Math.floor(35 / this.spriteJumping.length); // Redondear para no exceder
        }
    },

    die() {
        this.isAlive = false; // Dinosaurio muere
    }
};