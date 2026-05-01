// Geometry Dash - Main Game Engine

// --- DOM Elements ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const mainMenu = document.getElementById('mainMenu');
const levelSelect = document.getElementById('levelSelect');
const deathScreen = document.getElementById('deathScreen');
const completeScreen = document.getElementById('completeScreen');
const pauseScreen = document.getElementById('pauseScreen');
const hud = document.getElementById('hud');
const hudAttempt = document.getElementById('hudAttempt');
const hudProgress = document.getElementById('hudProgress');
const hudLevelName = document.getElementById('hudLevelName');
const levelGrid = document.getElementById('levelGrid');

// --- Game State ---
let state = 'MENU'; // MENU, SELECT, PLAYING, DEAD, COMPLETE
let currentLevelData = null;
let frameCount = 0;
let attempts = 1;
let totalJumps = 0;
let isHoldingJump = false;

// --- Constants ---
const GROUND_HEIGHT = 100;
const GRAVITY = 0.85;
const JUMP_FORCE = -13.5;
const PLAYER_SIZE = 30;
const TILE_SIZE = 40;

// --- Audio System (Procedural Web Audio API) ---
const AudioSys = {
  ctx: null,
  osc: null,
  gain: null,
  playing: false,
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },
  playMusic(tempo, key, wave) {
    this.stopMusic();
    this.init();
    this.osc = this.ctx.createOscillator();
    this.gain = this.ctx.createGain();
    
    this.osc.type = wave || 'square';
    // Simple base frequency based on key roughly
    let baseFreq = 220; 
    if(key === 'D') baseFreq = 293;
    if(key === 'E') baseFreq = 329;
    if(key === 'F') baseFreq = 349;
    if(key === 'G') baseFreq = 392;
    if(key === 'A') baseFreq = 440;
    if(key === 'B') baseFreq = 493;

    this.osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
    
    // Add some LFO/Arp effect using automation for a chiptune feel
    const noteLength = 60 / tempo;
    for(let i=0; i<100; i++) {
        const time = this.ctx.currentTime + (i * noteLength);
        this.osc.frequency.setValueAtTime(baseFreq, time);
        this.osc.frequency.setValueAtTime(baseFreq * 1.5, time + noteLength*0.25);
        this.osc.frequency.setValueAtTime(baseFreq * 1.25, time + noteLength*0.5);
    }

    this.gain.gain.value = 0.05; // Keep it quiet
    this.osc.connect(this.gain);
    this.gain.connect(this.ctx.destination);
    
    this.osc.start();
    this.playing = true;
  },
  stopMusic() {
    if (this.osc && this.playing) {
      try { this.osc.stop(); } catch(e){}
      this.osc.disconnect();
      this.playing = false;
    }
  },
  playJump() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  },
  playDeath() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  },
  playWin() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.setValueAtTime(600, this.ctx.currentTime + 0.2);
    osc.frequency.setValueAtTime(800, this.ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.0);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 1.0);
  }
};

// --- Player Object ---
const player = {
  x: 100,
  y: 0,
  vy: 0,
  width: PLAYER_SIZE,
  height: PLAYER_SIZE,
  rotation: 0,
  isGrounded: false,
  color: '#00ff87',
  mode: 'cube',
  
  reset() {
    this.y = canvas.height - GROUND_HEIGHT - this.height;
    this.vy = 0;
    this.rotation = 0;
    this.isGrounded = true;
    this.mode = 'cube';
  },
  
  jump() {
    if (this.mode === 'cube' && this.isGrounded) {
      this.vy = JUMP_FORCE;
      this.isGrounded = false;
      AudioSys.playJump();
      totalJumps++;
    }
  },
  
  update() {
    if (this.mode === 'cube') {
      this.vy += GRAVITY;
      this.y += this.vy;
      
      const groundY = canvas.height - GROUND_HEIGHT;
      if (this.y + this.height >= groundY) {
        this.y = groundY - this.height;
        this.vy = 0;
        this.isGrounded = true;
        this.rotation = Math.round(this.rotation / (Math.PI/2)) * (Math.PI/2);
      } else {
        this.isGrounded = false;
        this.rotation += 0.1;
      }
    } else if (this.mode === 'ship') {
      if (isHoldingJump) {
        this.vy -= GRAVITY * 1.5; // Thrust
      } else {
        this.vy += GRAVITY;
      }
      
      if (this.vy < -8) this.vy = -8;
      if (this.vy > 8) this.vy = 8;
      
      this.y += this.vy;
      this.rotation = this.vy * 0.05; // Pitch based on velocity
      
      const groundY = canvas.height - GROUND_HEIGHT;
      if (this.y + this.height >= groundY) {
        this.y = groundY - this.height;
        this.vy = 0;
        this.rotation = 0;
      }
      if (this.y <= 0) {
        this.y = 0;
        this.vy = 0;
      }
    }
  },
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width/2, this.y + this.height/2);
    ctx.rotate(this.rotation);
    
    if (this.mode === 'cube') {
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
      
      ctx.fillStyle = '#fff';
      ctx.fillRect(-this.width/4, -this.height/4, this.width/2, this.height/2);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
    } else if (this.mode === 'ship') {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(this.width/2, 0); // Nose
      ctx.lineTo(-this.width/2, this.height/2); // Bottom tail
      ctx.lineTo(-this.width/4, 0); // Back center
      ctx.lineTo(-this.width/2, -this.height/2); // Top tail
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(this.width/8, 0, this.width/6, 0, Math.PI*2); // Window
      ctx.fill();
      
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke(); 
      
      if (isHoldingJump) {
         ctx.fillStyle = '#ff9900';
         ctx.beginPath();
         ctx.moveTo(-this.width/4 - 2, 0);
         ctx.lineTo(-this.width/2 - Math.random()*15, 0);
         ctx.lineTo(-this.width/2 - 5, -5);
         ctx.fill();
      }
    }
    
    ctx.restore();
  }
};

// --- Level System ---
let cameraX = 0;
let levelObstacles = [];

function parseObstacles(obsData) {
  const parsed = [];
  for (let o of obsData) {
    const xPos = o[0];
    const type = o[1];
    
    if (type === 's') { // Spike
      parsed.push({ type: 'spike', x: xPos, y: canvas.height - GROUND_HEIGHT - 30, w: 30, h: 30 });
    } else if (type === 'ds') { // Double spike
      parsed.push({ type: 'spike', x: xPos, y: canvas.height - GROUND_HEIGHT - 30, w: 30, h: 30 });
      parsed.push({ type: 'spike', x: xPos + 30, y: canvas.height - GROUND_HEIGHT - 30, w: 30, h: 30 });
    } else if (type === 'ts') { // Triple spike
      parsed.push({ type: 'spike', x: xPos, y: canvas.height - GROUND_HEIGHT - 30, w: 30, h: 30 });
      parsed.push({ type: 'spike', x: xPos + 30, y: canvas.height - GROUND_HEIGHT - 30, w: 30, h: 30 });
      parsed.push({ type: 'spike', x: xPos + 60, y: canvas.height - GROUND_HEIGHT - 30, w: 30, h: 30 });
    } else if (type === 'b') { // Block
      parsed.push({ type: 'block', x: xPos, y: canvas.height - GROUND_HEIGHT - TILE_SIZE, w: TILE_SIZE, h: TILE_SIZE });
    } else if (type === 'tb') { // Tall block
      parsed.push({ type: 'block', x: xPos, y: canvas.height - GROUND_HEIGHT - TILE_SIZE*2, w: TILE_SIZE, h: TILE_SIZE*2 });
    } else if (type === 'portal_ship') {
      parsed.push({ type: 'portal_ship', x: xPos, y: canvas.height - GROUND_HEIGHT - 100, w: 40, h: 100 });
    } else if (type === 'portal_cube') {
      parsed.push({ type: 'portal_cube', x: xPos, y: canvas.height - GROUND_HEIGHT - 100, w: 40, h: 100 });
    }
  }
  return parsed;
}

function loadLevel(levelId) {
  currentLevelData = LEVELS.find(l => l.id === levelId);
  if (!currentLevelData) return;
  
  player.color = currentLevelData.playerColor;
  levelObstacles = parseObstacles(currentLevelData.obs);
  
  hudLevelName.innerText = currentLevelData.name;
  
  resetAttempt();
  attempts = 1;
  totalJumps = 0;
  
  setState('PLAYING');
  AudioSys.playMusic(currentLevelData.tempo, currentLevelData.key, currentLevelData.wave);
}

function resetAttempt() {
  player.reset();
  cameraX = 0;
  frameCount = 0;
  hudAttempt.innerText = `Attempt ${attempts}`;
}

// --- Collision Detection ---
function checkCollisions() {
  const px = player.x + cameraX;
  const py = player.y;
  const pw = player.width;
  const ph = player.height;
  
  // Create a slightly smaller hitbox for fairness
  const hitbox = {
    x: px + 4,
    y: py + 4,
    w: pw - 8,
    h: ph - 8
  };

  let onBlock = false;

  for (let obs of levelObstacles) {
    // Only check nearby obstacles
    if (obs.x > px + 800 || obs.x + obs.w < px - 100) continue;

    // AABB Collision
    if (hitbox.x < obs.x + obs.w &&
        hitbox.x + hitbox.w > obs.x &&
        hitbox.y < obs.y + obs.h &&
        hitbox.y + hitbox.h > obs.y) {
      
      if (obs.type === 'spike') {
        die();
        return;
      } else if (obs.type === 'portal_ship') {
        player.mode = 'ship';
        player.rotation = 0;
      } else if (obs.type === 'portal_cube') {
        player.mode = 'cube';
        player.rotation = 0;
      } else if (obs.type === 'block') {
        if (player.mode === 'ship') {
          die();
          return;
        }
        // Simple block resolution
        // Check if coming from top
        if (player.vy >= 0 && player.y + player.height - player.vy <= obs.y + 10) {
          player.y = obs.y - player.height;
          player.vy = 0;
          player.isGrounded = true;
          player.rotation = Math.round(player.rotation / (Math.PI/2)) * (Math.PI/2);
          onBlock = true;
        } else {
          // Hit side or bottom -> die
          die();
          return;
        }
      }
    }
  }

  // If we were on a block previously but not anymore, and not on ground
  if (!onBlock && player.y + player.height < canvas.height - GROUND_HEIGHT && player.vy >= 0) {
      player.isGrounded = false;
  }
}

function die() {
  setState('DEAD');
  AudioSys.stopMusic();
  AudioSys.playDeath();
}

function win() {
  setState('COMPLETE');
  AudioSys.stopMusic();
  AudioSys.playWin();
  
  document.getElementById('completeLevelName').innerText = currentLevelData.name;
  document.getElementById('completeAttempts').innerText = `Attempts: ${attempts}`;
  document.getElementById('completeJumps').innerText = `Jumps: ${totalJumps}`;
  
  // Save progress (mock)
  localStorage.setItem(`gd_level_${currentLevelData.id}`, 'completed');
}

// --- Main Loop ---
function update() {
  if (state === 'PLAYING') {
    cameraX += currentLevelData.speed;
    player.update();
    checkCollisions();
    
    // Update progress bar
    const progress = Math.min(100, (cameraX / currentLevelData.length) * 100);
    hudProgress.style.width = `${progress}%`;
    
    if (cameraX >= currentLevelData.length) {
      win();
    }
  }
}

function drawBackground() {
  if (!currentLevelData) return;
  
  // Sky
  ctx.fillStyle = currentLevelData.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  const bgOffsetX = -(cameraX * 0.2) % 100;
  for(let i=0; i<canvas.width + 100; i+=100) {
    ctx.beginPath();
    ctx.moveTo(i + bgOffsetX, 0);
    ctx.lineTo(i + bgOffsetX, canvas.height - GROUND_HEIGHT);
    ctx.stroke();
  }
}

function drawGround() {
  if (!currentLevelData) return;
  
  const groundY = canvas.height - GROUND_HEIGHT;
  
  // Ground background
  ctx.fillStyle = currentLevelData.ground;
  ctx.fillRect(0, groundY, canvas.width, GROUND_HEIGHT);
  
  // Ground grid/lines
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.lineWidth = 2;
  const groundOffsetX = -cameraX % TILE_SIZE;
  for(let i=0; i<canvas.width + TILE_SIZE; i+=TILE_SIZE) {
    ctx.strokeRect(i + groundOffsetX, groundY, TILE_SIZE, TILE_SIZE);
  }
  
  // Line separating ground and sky
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, groundY - 2, canvas.width, 4);
}

function drawObstacles() {
  for (let obs of levelObstacles) {
    // Frustum culling
    if (obs.x > cameraX + canvas.width || obs.x + obs.w < cameraX) continue;
    
    const drawX = obs.x - cameraX;
    
    if (obs.type === 'spike') {
      ctx.fillStyle = '#ddd'; // Outer
      ctx.beginPath();
      ctx.moveTo(drawX + obs.w/2, obs.y);
      ctx.lineTo(drawX + obs.w, obs.y + obs.h);
      ctx.lineTo(drawX, obs.y + obs.h);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = currentLevelData.bg; // Inner detail
      ctx.beginPath();
      ctx.moveTo(drawX + obs.w/2, obs.y + 6);
      ctx.lineTo(drawX + obs.w - 6, obs.y + obs.h - 4);
      ctx.lineTo(drawX + 6, obs.y + obs.h - 4);
      ctx.closePath();
      ctx.fill();
    } else if (obs.type === 'block') {
      ctx.fillStyle = currentLevelData.ground;
      ctx.fillRect(drawX, obs.y, obs.w, obs.h);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.strokeRect(drawX, obs.y, obs.w, obs.h);
      
      // Inner pattern
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(drawX + 5, obs.y + 5, obs.w - 10, obs.h - 10);
    } else if (obs.type === 'portal_ship') {
      ctx.fillStyle = 'rgba(255, 100, 200, 0.5)';
      ctx.strokeStyle = '#ff64c8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(drawX + obs.w/2, obs.y + obs.h/2, obs.w/2, obs.h/2, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.stroke();
    } else if (obs.type === 'portal_cube') {
      ctx.fillStyle = 'rgba(100, 255, 200, 0.5)';
      ctx.strokeStyle = '#64ffc8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(drawX + obs.w/2, obs.y + obs.h/2, obs.w/2, obs.h/2, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.stroke();
    }
  }
}

function draw() {
  if (state === 'MENU' || state === 'SELECT') {
    // Menu background animation
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    frameCount++;
    ctx.fillStyle = '#00ff87';
    for(let i=0; i<50; i++) {
      const x = (i * 123 + frameCount) % canvas.width;
      const y = (Math.sin(i + frameCount*0.01) * 100) + canvas.height/2;
      ctx.globalAlpha = 0.5 * Math.sin(frameCount*0.05 + i);
      ctx.fillRect(x, y, 4, 4);
    }
    ctx.globalAlpha = 1.0;
    return;
  }
  
  drawBackground();
  
  ctx.save();
  // We handle camera by offsetting the drawing of obstacles instead of ctx.translate
  // to keep UI elements fixed if drawn on canvas.
  drawObstacles();
  ctx.restore();
  
  drawGround();
  player.draw(ctx);
  
  if (state === 'DEAD') {
    // Red overlay
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// --- UI & State Management ---
function hideAllOverlays() {
  mainMenu.classList.remove('active');
  levelSelect.classList.remove('active');
  deathScreen.classList.remove('active');
  completeScreen.classList.remove('active');
  pauseScreen.classList.remove('active');
  hud.style.opacity = '0';
}

function setState(newState) {
  state = newState;
  hideAllOverlays();
  
  if (state === 'MENU') {
    mainMenu.classList.add('active');
  } else if (state === 'SELECT') {
    levelSelect.classList.add('active');
  } else if (state === 'PLAYING') {
    hud.style.opacity = '1';
  } else if (state === 'DEAD') {
    deathScreen.classList.add('active');
    document.getElementById('deathAttempt').innerText = `Attempt ${attempts}`;
  } else if (state === 'COMPLETE') {
    completeScreen.classList.add('active');
  } else if (state === 'PAUSE') {
    pauseScreen.classList.add('active');
  }
}

function populateLevelSelect() {
  levelGrid.innerHTML = '';
  LEVELS.forEach(level => {
    const isCompleted = localStorage.getItem(`gd_level_${level.id}`) === 'completed';
    const card = document.createElement('div');
    card.className = 'level-card';
    card.style.borderColor = DIFF_COLORS[level.diff];
    
    card.innerHTML = `
      <div class="level-number">LEVEL ${level.id}</div>
      <div class="level-name">${level.name}</div>
      <div class="level-stats">
        <span class="difficulty-badge" style="color: ${DIFF_COLORS[level.diff]}">${level.diff}</span>
        <span class="stars">${'★'.repeat(level.stars)}</span>
      </div>
      ${isCompleted ? '<div style="color:#00ff87; font-size:0.8rem; margin-top:5px; text-align:right;">✓ COMPLETED</div>' : ''}
    `;
    
    card.addEventListener('click', () => {
      AudioSys.init(); // Init audio on user gesture
      loadLevel(level.id);
    });
    
    levelGrid.appendChild(card);
  });
}

// --- Input Handling ---
function handleInput(e) {
  if (e.type === 'keydown' && e.code === 'Escape') {
    if (state === 'PLAYING') {
      setState('PAUSE');
      if (AudioSys.ctx && AudioSys.ctx.state === 'running') {
        AudioSys.ctx.suspend();
      }
    } else if (state === 'PAUSE') {
      setState('PLAYING');
      if (AudioSys.ctx && AudioSys.ctx.state === 'suspended') {
        AudioSys.ctx.resume();
      }
    }
    return;
  }

  if (e.type === 'keydown' && e.code !== 'Space' && e.code !== 'ArrowUp') return;
  
  if (e.type === 'keydown' || e.type === 'mousedown' || e.type === 'touchstart') {
    isHoldingJump = true;
  }
  
  if (state === 'PLAYING') {
    player.jump();
  } else if (state === 'DEAD') {
    attempts++;
    resetAttempt();
    setState('PLAYING');
    AudioSys.playMusic(currentLevelData.tempo, currentLevelData.key, currentLevelData.wave);
  } else if (state === 'MENU' && e.type === 'keydown') {
    // Allow space on menu to start
    setState('SELECT');
  }
}

function handleInputRelease(e) {
  if (e.type === 'keyup' && e.code !== 'Space' && e.code !== 'ArrowUp') return;
  isHoldingJump = false;
}

window.addEventListener('keydown', handleInput);
window.addEventListener('keyup', handleInputRelease);
window.addEventListener('mousedown', handleInput);
window.addEventListener('mouseup', handleInputRelease);
window.addEventListener('touchstart', handleInput, {passive: false});
window.addEventListener('touchend', handleInputRelease);

document.getElementById('playBtn').addEventListener('click', () => {
  AudioSys.init();
  setState('SELECT');
});

document.getElementById('backBtn').addEventListener('click', () => {
  setState('MENU');
});

document.getElementById('menuReturnBtn').addEventListener('click', () => {
  setState('SELECT');
  populateLevelSelect(); // Refresh completion status
});

document.getElementById('pauseQuitBtn').addEventListener('click', () => {
  AudioSys.stopMusic();
  setState('SELECT');
});

document.getElementById('resumeBtn').addEventListener('click', () => {
  setState('PLAYING');
  if (AudioSys.ctx && AudioSys.ctx.state === 'suspended') {
    AudioSys.ctx.resume();
  }
});

document.getElementById('deathQuitBtn').addEventListener('click', () => {
  AudioSys.stopMusic();
  setState('SELECT');
});

// Resize handler
function resize() {
  const containerRatio = window.innerWidth / window.innerHeight;
  const canvasRatio = 800 / 480;
  
  if (containerRatio > canvasRatio) {
    canvas.style.height = '100vh';
    canvas.style.width = `${100 * canvasRatio}vh`;
  } else {
    canvas.style.width = '100vw';
    canvas.style.height = `${100 / canvasRatio}vw`;
  }
}
window.addEventListener('resize', resize);

// --- Initialization ---
populateLevelSelect();
resize();
setState('MENU');
requestAnimationFrame(gameLoop);
