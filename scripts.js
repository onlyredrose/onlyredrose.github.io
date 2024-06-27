let particles = [];
let maxHeartSize = 50;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-canvas');
    noStroke();
}

function draw() {
    background(240);
    
    // Add a new heart at mouse position
    let heartSize = maxHeartSize;
    let heartX = mouseX;
    let heartY = mouseY;
    particles.push(new Particle(heartX, heartY, heartSize));
    
    // Update and display each particle
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        if (particles[i].isDead()) {
            particles.splice(i, 1);
        }
    }
}

class Particle {
    constructor(x, y, size) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.acceleration = createVector(0, 0);
        this.size = size;
        this.color = color('#FFC0CB');
        this.lifespan = 255; // Opacity of heart
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0); // Reset acceleration

        // Apply simple friction
        this.velocity.mult(0.99);

        // Decrease lifespan (opacity)
        this.lifespan -= 2;
    }

    display() {
        fill(red(this.color), green(this.color), blue(this.color), this.lifespan);
        this.drawHeart(this.position.x, this.position.y, this.size);
    }

    drawHeart(x, y, size) {
        beginShape();
        vertex(x, y);
        bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
        bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
        endShape(CLOSE);
    }

    isDead() {
        return this.lifespan < 0;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
