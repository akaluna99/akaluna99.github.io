let width, height, offset;
let app, container;
let circleTexture;
const fireworks = [];
const minHeight = 530;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  offset = minHeight - height;
  if (app) app.renderer.resize(width, height);
}

function setup() {
  resize();

  // set up Pixi stage and container
  app = new PIXI.Application({
    width,
    height,
    backgroundColor: 0x070514
  });

  container = new PIXI.ParticleContainer(3000, {
    tint: true
  });

  app.stage.addChild(container);
  document.body.appendChild(app.view);

  // create a circle graphic for the sprites
  const gr = new PIXI.Graphics();
  gr.beginFill(0xffffff);
  gr.lineStyle(0);
  gr.drawCircle(10, 10, 10);
  gr.endFill();
  circleTexture = app.renderer.generateTexture(gr);

  // create 8 fireworks
  for (let i = 0; i < 8; i++) {
    fireworks.push(new Firework());
  }
}

class Particle {
  constructor() {
    this.sprite = new PIXI.Sprite(circleTexture);
    this.sprite.x = 0;
    this.sprite.y = 0;
    this.sprite.width = 5;
    this.sprite.height = 5;
    this.vx = 0;
    this.vy = 0;
    this.hue = 0;
    this.sprite.alpha = 0;
    this.active = false;
    container.addChild(this.sprite);
  }

  reset(x, y, i) {
    this.sprite.x = x;
    this.sprite.y = y;
    this.vx = Math.cos((i / 200) * Math.PI * 2) * Math.random();
    this.vy = Math.sin((i / 200) * Math.PI * 2) * Math.random();
    this.hue = this.hue;
    this.sprite.alpha = 1;
    this.sprite.width = 5;
    this.sprite.height = 5;
    this.active = true;
  }

  update() {
    // particles that have faded away are set back to inactive
    if (this.sprite.alpha <= 0) this.active = false;

    // only update active particles
    if (!this.active) return;
    // reduce alpha on each frame
    if (this.sprite.alpha >= 0) this.sprite.alpha -= 0.003;

    this.adjustHue();
    this.applyForces();
    this.reduceSize();
  }

  adjustHue() {
    this.hue += 3;
    if (this.hue > 360) this.hue = 0;
    const color = new PIXI.Color({ h: this.hue, s: 80, l: 50, a: 1 });
    this.sprite.tint = color;
  }

  applyForces() {
    // move x & y (velocity)
    this.sprite.x += this.vx;
    this.sprite.y += this.vy;
    // apply a little friction
    this.vx *= 0.994;
    this.vy *= 0.994;
    // add a little gravity
    this.vy += 0.002;
  }

  reduceSize() {
    this.sprite.width -= 0.02;
    this.sprite.height -= 0.02;
  }
}

class Firework extends Particle {
  constructor() {
    super();
    // random hue
    this.hue = Math.floor(Math.random() * 360);
    const color = new PIXI.Color({ h: this.hue, s: 80, l: 50, a: 1 });
    this.sprite.tint = color;
    this.launched = false;
    this.exploding = false;

    this.particles = [];
    for (let i = 0; i < 200; i++) {
      this.particles.push(new Particle());
    }
  }

  launch() {
    this.exploded = false;

    // set up position and velocity
    this.sprite.y = height;
    if (offset > 0) this.sprite.y += offset;
    this.sprite.x = width * 0.2 + Math.random() * width * 0.6;
    this.vx = -1 + Math.random() * 2;
    this.vy = -3 - Math.random();
    this.sprite.alpha = 1;

    this.launched = true;
  }

  explode() {
    this.exploding = true;
    this.sprite.alpha = 0;
    for (let i = 0; i < this.particles.length; i++) {
      // set all the particles in this firework to explaode from the current position
      this.particles[i].reset(this.sprite.x, this.sprite.y, i);
    }
  }

  update() {
    if (!this.launched) return;

    this.applyForces();

    // If the firework particle has slowed, explode it
    if (this.vy > -0.5 && !this.exploding) this.explode();

    let allParticlesComplete = true;
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      if (this.particles[i].active) allParticlesComplete = false;
    }

    // Once all the particles in the firework have faded out to alpha 0
    // it is set to launched = false so they are available to be launched again
    if (this.exploding && allParticlesComplete) {
      this.launched = false;
      this.exploding = false;
    }
  }
}

function launch() {
  for (let i = 0; i < fireworks.length; i++) {
    if (!fireworks[i].launched) {
      // launch the first available unlaunched firework in the array
      fireworks[i].launch();
      break;
    }
  }
  setTimeout(launch, Math.random() * 3000);
}

function animate(d) {
  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
  }

  requestAnimationFrame(animate);
}

setup();
// app.ticker.add(animate);
window.addEventListener("resize", resize);

requestAnimationFrame(animate);

// begin launching
setTimeout(launch, Math.random() * 3000);
