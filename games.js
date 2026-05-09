// ══════════════════════════════════════════════════════════
//  JUEGOS INTERNOS
// ══════════════════════════════════════════════════════════

function initGames() {
  // Inicializar juego de Penales
  initPenalGame();
  // Otros juegos aquí
}

// ════════════════════════════════════════════════════════
// JUEGO DE PENALES
// ════════════════════════════════════════════════════════

function initPenalGame() {
  const panel = document.getElementById('panel-penales');
  panel.innerHTML = `
    <div class="field">
      <div class="field-grid"></div>
      <div class="goal-post"></div>
      <div class="keeper-zone">
        <div id="keeperEl">
          <div class="kp-head"></div>
          <div class="kp-body">
            <div class="kp-arm left"></div>
            <div class="kp-arm right"></div>
          </div>
          <div class="kp-leg left"></div>
          <div class="kp-leg right"></div>
        </div>
      </div>
      <div class="ball-zone">
        <div id="ballEl"></div>
      </div>
      <div class="penalty-spot"></div>
      <div class="field-flash" id="fieldFlash">
        <div class="flash-text" id="flashText">GOOL</div>
      </div>
    </div>
    <div class="dir-grid">
      <button class="dir-btn" onclick="shootBall('left')">↖️<span class="dir-lbl">Izquierda</span></button>
      <button class="dir-btn" onclick="shootBall('center')">⬆️<span class="dir-lbl">Centro</span></button>
      <button class="dir-btn" onclick="shootBall('right')">↗️<span class="dir-lbl">Derecha</span></button>
    </div>
    <div class="bet-row">
      <label class="field-label">Apuesta</label>
      <input class="field-input" type="number" id="penalBet" placeholder="1000" value="1000" min="10">
    </div>
    <button class="btn-action primary" onclick="playPenalGame()" id="penalPlayBtn">JUGAR</button>
    <div class="result-text" id="penalResult"></div>
    <div class="history-row" id="penalHistory"></div>
  `;
}

function shootBall(dir) {
  const keeper = document.getElementById('keeperEl');
  const positions = {
    left: 'calc(50% - 70px)',
    center: 'calc(50% - 27px)',
    right: 'calc(50% + 16px)'
  };
  keeper.style.left = positions[dir];
}

function playPenalGame() {
  const bet = parseInt(document.getElementById('penalBet').value) || 1000;
  
  if (balance < bet) {
    document.getElementById('penalResult').textContent = '❌ Saldo insuficiente';
    return;
  }
  
  document.getElementById('penalPlayBtn').disabled = true;
  
  // Simulación de juego
  const playerDir = Math.random() > 0.5 ? 'left' : (Math.random() > 0.5 ? 'center' : 'right');
  const keeperDir = Math.random() > 0.5 ? 'left' : (Math.random() > 0.5 ? 'center' : 'right');
  
  setTimeout(() => {
    const result = playerDir !== keeperDir;
    
    if (result) {
      balance += bet;
      totalWon += bet;
      document.getElementById('fieldFlash').classList.add('show');
      document.getElementById('flashText').classList.add('goal');
      document.getElementById('flashText').textContent = '¡GOOL!';
      document.getElementById('penalResult').textContent = '✅ ¡GANASTE! +' + bet + ' Gs';
    } else {
      balance -= bet;
      document.getElementById('fieldFlash').classList.add('show');
      document.getElementById('flashText').classList.remove('goal');
      document.getElementById('flashText').classList.add('saved');
      document.getElementById('flashText').textContent = 'ATAJADO';
      document.getElementById('penalResult').textContent = '❌ Atajado. -' + bet + ' Gs';
    }
    
    plays++;
    updateUI();
    
    setTimeout(() => {
      document.getElementById('fieldFlash').classList.remove('show');
      document.getElementById('penalPlayBtn').disabled = false;
    }, 1500);
  }, 800);
}

// Función placeholder para otros juegos
// Puedes agregar aquí los demás juegos (Slots, Ruleta, etc.)
