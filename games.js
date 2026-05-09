// ══════════════════════════════════════════════════════════════
//  games.js — BlackCasino · Todos los juegos internos
// ══════════════════════════════════════════════════════════════

function initGames() {
  buildPenales();
  buildSlots();
  build777();
  buildGold();
  buildCrash();
  buildRoulette();
  buildBlackjack();
  buildMines();
  buildDice();
}

// ─────────────────────────────────────────────────────────────
//  UTILIDADES GLOBALES
// ─────────────────────────────────────────────────────────────
function getBet(inputId, min = 100) {
  const v = parseInt(document.getElementById(inputId).value);
  if (isNaN(v) || v < min) return null;
  return v;
}
function fmtGs(n) { return n.toLocaleString() + ' Gs'; }
function addResult(id, txt, color) {
  const el = document.getElementById(id);
  if (el) { el.textContent = txt; el.style.color = color || 'var(--muted2)'; }
}

// ════════════════════════════════════════════════════════════════
//  1. PENALES
// ════════════════════════════════════════════════════════════════
function buildPenales() {
  document.getElementById('panel-penales').innerHTML = `
  <div class="field">
    <div class="field-grid"></div>
    <div class="goal-post">
      <div class="keeper-zone">
        <div id="keeperEl">
          <div class="kp-head"></div>
          <div class="kp-body"></div>
          <div class="kp-arm left"></div>
          <div class="kp-arm right"></div>
          <div class="kp-leg left"></div>
          <div class="kp-leg right"></div>
        </div>
      </div>
    </div>
    <div class="ball-zone"><div id="ballEl"></div></div>
    <div class="penalty-spot"></div>
    <div class="field-flash" id="penFlash"><div class="flash-text" id="penFlashTxt"></div></div>
  </div>
  <div class="history-row" id="penHistory"></div>
  <div class="dir-grid">
    <button class="dir-btn" id="pd0" onclick="shootPenal(0)">↖<span class="dir-lbl">ARR IZQ</span></button>
    <button class="dir-btn" id="pd1" onclick="shootPenal(1)">⬆<span class="dir-lbl">ARRIBA</span></button>
    <button class="dir-btn" id="pd2" onclick="shootPenal(2)">↗<span class="dir-lbl">ARR DER</span></button>
    <button class="dir-btn" id="pd3" onclick="shootPenal(3)">⬅<span class="dir-lbl">IZQ</span></button>
    <button class="dir-btn" id="pd4" onclick="shootPenal(4)">🎯<span class="dir-lbl">CENTRO</span></button>
    <button class="dir-btn" id="pd5" onclick="shootPenal(5)">➡<span class="dir-lbl">DER</span></button>
    <button class="dir-btn" id="pd6" onclick="shootPenal(6)">↙<span class="dir-lbl">BAJ IZQ</span></button>
    <button class="dir-btn" id="pd7" onclick="shootPenal(7)">⬇<span class="dir-lbl">ABAJO</span></button>
    <button class="dir-btn" id="pd8" onclick="shootPenal(8)">↘<span class="dir-lbl">BAJ DER</span></button>
  </div>
  <div class="bet-row">
    <label class="field-label">APUESTA</label>
    <input class="field-input" type="number" id="penBet" value="500" min="100" placeholder="Mín. 100">
  </div>
  <div class="result-text" id="penResult"></div>`;
}

let penShooting = false, penHistory = [];
function shootPenal(dir) {
  if (penShooting) return;
  const bet = getBet('penBet', 100);
  if (!bet) { addResult('penResult','⚠ Apuesta mínima 100 Gs','var(--red)'); return; }
  if (bet > balance) { addResult('penResult','⚠ Saldo insuficiente','var(--red)'); return; }

  penShooting = true;
  document.querySelectorAll('.dir-btn').forEach(b => b.disabled = true);

  balance -= bet; plays++; updateUI();

  const keeperDir = Math.floor(Math.random() * 9);
  const keeper = document.getElementById('keeperEl');
  const ball = document.getElementById('ballEl');
  const goalW = 170;

  // Posición keeper
  const kPos = [8, 50, 92, 8, 50, 92, 8, 50, 92];
  keeper.style.left = `calc(${kPos[keeperDir]}% - 27px)`;

  // Posición balón
  const bPos = [10, 50, 90, 10, 50, 90, 10, 50, 90];
  ball.style.left = `calc(${bPos[dir]}% - 27px)`;
  ball.style.top = dir < 3 ? '-60px' : dir < 6 ? '-20px' : '30px';
  ball.style.opacity = '0.2';
  ball.style.transform = 'scale(0.5)';

  setTimeout(() => {
    ball.style.opacity = '1';
    ball.style.transform = 'scale(1)';
  }, 50);

  const goal = keeperDir !== dir || Math.random() < 0.15;
  const mult = goal ? (Math.random() < 0.1 ? 3 : 2) : 0;

  setTimeout(() => {
    const flash = document.getElementById('penFlash');
    const ftxt = document.getElementById('penFlashTxt');
    if (goal) {
      const won = bet * mult;
      balance += won; totalWon += won;
      ftxt.textContent = mult === 3 ? '🔥 GOLAZO! x3' : '⚽ GOOOL!';
      ftxt.className = 'flash-text goal';
      addResult('penResult', `✅ GOOOOL! Ganás ${fmtGs(won)}`, 'var(--green)');
      penHistory.unshift('⚽');
    } else {
      ftxt.textContent = '🧤 ATAJADO';
      ftxt.className = 'flash-text saved';
      addResult('penResult', `❌ Atajado. Perdés ${fmtGs(bet)}`, 'var(--red)');
      penHistory.unshift('🧤');
    }
    flash.classList.add('show');
    updateUI();

    // reset history display
    if (penHistory.length > 8) penHistory.pop();
    document.getElementById('penHistory').innerHTML = penHistory.map(h => `<div class="h-tick">${h}</div>`).join('');

    setTimeout(() => {
      flash.classList.remove('show');
      ball.style.left = 'calc(50% - 27px)';
      ball.style.top = '0';
      ball.style.opacity = '1';
      ball.style.transform = 'scale(1)';
      keeper.style.left = 'calc(50% - 27px)';
      document.querySelectorAll('.dir-btn').forEach(b => b.disabled = false);
      penShooting = false;
    }, 1800);
  }, 700);
}

// ════════════════════════════════════════════════════════════════
//  2. SLOTS
// ════════════════════════════════════════════════════════════════
const SLOT_SYMS = ['🍒','🍋','🍊','🍇','⭐','💎','7️⃣','🎰'];
const SLOT_PAYS = {
  '💎💎💎': 50, '7️⃣7️⃣7️⃣': 30, '🎰🎰🎰': 20,
  '⭐⭐⭐': 10, '🍇🍇🍇': 8, '🍊🍊🍊': 5,
  '🍋🍋🍋': 4, '🍒🍒🍒': 3
};

function buildSlots() {
  document.getElementById('panel-slots').innerHTML = `
  <div class="slots-machine">
    <div class="slots-header">
      <div class="slots-brand">🎰 LUCKY SLOTS</div>
      <div class="slots-lights">
        <div class="sl-dot"></div><div class="sl-dot"></div>
        <div class="sl-dot"></div><div class="sl-dot"></div>
      </div>
    </div>
    <div class="reels">
      <div class="reel" id="s0"><div class="reel-face" id="sf0">🍒</div></div>
      <div class="reel" id="s1"><div class="reel-face" id="sf1">🍋</div></div>
      <div class="reel" id="s2"><div class="reel-face" id="sf2">🍊</div></div>
    </div>
    <div class="slots-win-display" id="slotsWin"></div>
    <div class="paytable-grid">
      <div class="pt-title">Tabla de pagos</div>
      <div class="pt-row"><span class="pt-syms">💎💎💎</span><span class="pt-mult">x50</span></div>
      <div class="pt-row"><span class="pt-syms">7️⃣7️⃣7️⃣</span><span class="pt-mult">x30</span></div>
      <div class="pt-row"><span class="pt-syms">🎰🎰🎰</span><span class="pt-mult">x20</span></div>
      <div class="pt-row"><span class="pt-syms">⭐⭐⭐</span><span class="pt-mult">x10</span></div>
      <div class="pt-row"><span class="pt-syms">Trío</span><span class="pt-mult">x3–x8</span></div>
    </div>
  </div>
  <div class="bet-row">
    <label class="field-label">APUESTA</label>
    <input class="field-input" type="number" id="slotBet" value="500" min="100">
  </div>
  <button class="btn-action primary" id="slotsBtn" onclick="spinSlots()">🎰 GIRAR</button>
  <div id="slotsResult"></div>`;
}

let slotsSpinning = false;
function spinSlots() {
  if (slotsSpinning) return;
  const bet = getBet('slotBet', 100);
  if (!bet) { addResult('slotsResult','⚠ Apuesta mínima 100 Gs','var(--red)'); return; }
  if (bet > balance) { addResult('slotsResult','⚠ Saldo insuficiente','var(--red)'); return; }

  slotsSpinning = true;
  balance -= bet; plays++; updateUI();
  document.getElementById('slotsBtn').disabled = true;
  document.getElementById('slotsWin').textContent = '';
  [0,1,2].forEach(i => document.getElementById('s'+i).classList.remove('lit'));

  const final = [0,1,2].map(() => Math.floor(Math.random() * SLOT_SYMS.length));
  let tick = 0;
  const interval = setInterval(() => {
    [0,1,2].forEach(i => {
      document.getElementById('sf'+i).textContent = SLOT_SYMS[Math.floor(Math.random()*SLOT_SYMS.length)];
    });
    tick++;
    if (tick > 18) {
      clearInterval(interval);
      final.forEach((f,i) => document.getElementById('sf'+i).textContent = SLOT_SYMS[f]);
      const key = final.map(f => SLOT_SYMS[f]).join('');
      const mult = SLOT_PAYS[key] || 0;
      if (mult) {
        const won = bet * mult;
        balance += won; totalWon += won;
        document.getElementById('slotsWin').innerHTML = `<span style="color:var(--gold)">🏆 x${mult} — ${fmtGs(won)}</span>`;
        [0,1,2].forEach(i => document.getElementById('s'+i).classList.add('lit'));
        addResult('slotsResult', `✅ Ganás ${fmtGs(won)}`, 'var(--green)');
      } else {
        document.getElementById('slotsWin').innerHTML = `<span style="color:var(--muted2)">Sin premio</span>`;
        addResult('slotsResult', `❌ Sin premio. Perdés ${fmtGs(bet)}`, 'var(--red)');
      }
      updateUI();
      document.getElementById('slotsBtn').disabled = false;
      slotsSpinning = false;
    }
  }, 60);
}

// ════════════════════════════════════════════════════════════════
//  3. 777 LIGHTNING
// ════════════════════════════════════════════════════════════════
const W7_SYMS = ['BAR','7','77','777','⚡','🔔'];
const W7_PAYS = { '777777777': 100, '77777777': 50, '7777777': 30, '777777': 20, '77777': 10, '777': 5, '⚡⚡⚡': 15, '🔔🔔🔔': 8 };

function build777() {
  document.getElementById('panel-777').innerHTML = `
  <div class="lightning-machine">
    <div class="l7-brand">⚡ LIGHTNING 777</div>
    <div class="drums">
      <div class="drum" id="d0"><div class="drum-face" id="df0"><span>7</span><span class="ds">DRUM 1</span></div></div>
      <div class="drum" id="d1"><div class="drum-face" id="df1"><span>BAR</span><span class="ds">DRUM 2</span></div></div>
      <div class="drum" id="d2"><div class="drum-face" id="df2"><span>77</span><span class="ds">DRUM 3</span></div></div>
    </div>
    <div class="l7-win" id="l7Win"></div>
    <div class="l7-pt">
      <div class="l7-pt-title">Tabla de pagos</div>
      <div class="l7-pt-row"><span class="l7-sym">777 · 777 · 777</span><span class="l7-mult">x100</span></div>
      <div class="l7-pt-row"><span class="l7-sym">⚡⚡⚡</span><span class="l7-mult">x15</span></div>
      <div class="l7-pt-row"><span class="l7-sym">🔔🔔🔔</span><span class="l7-mult">x8</span></div>
      <div class="l7-pt-row"><span class="l7-sym">777 triple</span><span class="l7-mult">x5</span></div>
    </div>
  </div>
  <div class="bet-row">
    <label class="field-label">APUESTA</label>
    <input class="field-input" type="number" id="w7Bet" value="500" min="100">
  </div>
  <button class="btn-action primary" id="w7Btn" onclick="spin777()">⚡ GIRAR</button>
  <div id="w7Result"></div>`;
}

let w7Spinning = false;
function spin777() {
  if (w7Spinning) return;
  const bet = getBet('w7Bet', 100);
  if (!bet) { addResult('w7Result','⚠ Mínimo 100 Gs','var(--red)'); return; }
  if (bet > balance) { addResult('w7Result','⚠ Saldo insuficiente','var(--red)'); return; }

  w7Spinning = true;
  balance -= bet; plays++; updateUI();
  document.getElementById('w7Btn').disabled = true;
  [0,1,2].forEach(i => { document.getElementById('d'+i).classList.remove('lit'); document.getElementById('d'+i).classList.add('rolling'); });

  const final = [0,1,2].map(() => W7_SYMS[Math.floor(Math.random()*W7_SYMS.length)]);
  let tick = 0;
  const iv = setInterval(() => {
    [0,1,2].forEach(i => document.getElementById('df'+i).querySelector('span').textContent = W7_SYMS[Math.floor(Math.random()*W7_SYMS.length)]);
    tick++;
    if (tick > 22) {
      clearInterval(iv);
      [0,1,2].forEach(i => {
        document.getElementById('d'+i).classList.remove('rolling');
        document.getElementById('df'+i).querySelector('span').textContent = final[i];
      });
      const key = final.join('');
      let mult = 0;
      for (const [pattern, m] of Object.entries(W7_PAYS)) {
        if (key.includes(pattern) || final.every(f => f === final[0]) && final[0] === pattern.slice(0,pattern.length/3)) { mult = m; break; }
      }
      if (final[0] === final[1] && final[1] === final[2]) {
        if (final[0] === '777') mult = 5;
        else if (final[0] === '⚡') mult = 15;
        else if (final[0] === '🔔') mult = 8;
        else mult = mult || 3;
      }
      if (mult) {
        const won = bet * mult;
        balance += won; totalWon += won;
        document.getElementById('l7Win').innerHTML = `<span style="color:var(--gold)">⚡ x${mult} — ${fmtGs(won)}</span>`;
        [0,1,2].forEach(i => document.getElementById('d'+i).classList.add('lit'));
        addResult('w7Result', `✅ Ganás ${fmtGs(won)}`, 'var(--green)');
      } else {
        document.getElementById('l7Win').innerHTML = `<span style="color:var(--muted2)">Sin premio</span>`;
        addResult('w7Result', `❌ Perdés ${fmtGs(bet)}`, 'var(--red)');
      }
      updateUI();
      document.getElementById('w7Btn').disabled = false;
      w7Spinning = false;
    }
  }, 65);
}

// ════════════════════════════════════════════════════════════════
//  4. GOLD RUSH
// ════════════════════════════════════════════════════════════════
const GOLD_SYMS = ['💰','🪙','💎','⭐','🏆','🎲','🔔','🍀'];
function buildGold() {
  const cells = Array(10).fill(0).map((_,i) => `<div class="gold-cell" id="gc${i}">❓</div>`).join('');
  document.getElementById('panel-gold').innerHTML = `
  <div class="gold-machine">
    <div class="gold-lights">${Array(8).fill('<div class="gl"></div>').join('')}</div>
    <div class="gold-brand">💰 GOLD RUSH</div>
    <div class="gold-grid">${cells}</div>
    <div class="gold-win-display" id="goldWin"></div>
    <div class="gold-pt">
      <div class="pt-title" style="color:#fbbf24">Premios</div>
      <div class="pt-row"><span class="pt-syms">5 iguales</span><span class="pt-mult" style="color:#fbbf24">x20</span></div>
      <div class="pt-row"><span class="pt-syms">4 iguales</span><span class="pt-mult" style="color:#fbbf24">x8</span></div>
      <div class="pt-row"><span class="pt-syms">3 iguales</span><span class="pt-mult" style="color:#fbbf24">x3</span></div>
      <div class="pt-row"><span class="pt-syms">💰 cualquiera</span><span class="pt-mult" style="color:#fbbf24">x1.5</span></div>
    </div>
  </div>
  <div class="bet-row">
    <label class="field-label">APUESTA</label>
    <input class="field-input" type="number" id="goldBet" value="500" min="100">
  </div>
  <button class="btn-action primary" id="goldBtn" onclick="spinGold()">💰 GIRAR</button>
  <div id="goldResult"></div>`;
}

let goldSpinning = false;
function spinGold() {
  if (goldSpinning) return;
  const bet = getBet('goldBet', 100);
  if (!bet) { addResult('goldResult','⚠ Mínimo 100 Gs','var(--red)'); return; }
  if (bet > balance) { addResult('goldResult','⚠ Saldo insuficiente','var(--red)'); return; }

  goldSpinning = true;
  balance -= bet; plays++; updateUI();
  document.getElementById('goldBtn').disabled = true;
  for (let i=0;i<10;i++) { document.getElementById('gc'+i).className='gold-cell'; document.getElementById('gc'+i).textContent='❓'; }
  document.getElementById('goldWin').textContent='';

  const final = Array(10).fill(0).map(() => GOLD_SYMS[Math.floor(Math.random()*GOLD_SYMS.length)]);
  let revealed = 0;
  const iv = setInterval(() => {
    document.getElementById('gc'+revealed).textContent = final[revealed];
    revealed++;
    if (revealed >= 10) {
      clearInterval(iv);
      // count matches
      const counts = {};
      final.forEach(s => counts[s] = (counts[s]||0)+1);
      const max = Math.max(...Object.values(counts));
      const hasGold = final.includes('💰');
      let mult = 0;
      if (max >= 5) mult = 20;
      else if (max >= 4) mult = 8;
      else if (max >= 3) mult = 3;
      else if (hasGold) mult = 1.5;

      // highlight winning cells
      if (max >= 3) {
        const winSym = Object.keys(counts).find(k => counts[k] === max);
        final.forEach((s,i) => { if (s===winSym) document.getElementById('gc'+i).classList.add('win-cell'); });
      }

      if (mult) {
        const won = Math.floor(bet * mult);
        balance += won; totalWon += won;
        document.getElementById('goldWin').textContent = `🏆 x${mult} — ${fmtGs(won)}`;
        addResult('goldResult', `✅ Ganás ${fmtGs(won)}`, 'var(--green)');
      } else {
        document.getElementById('goldWin').textContent = 'Sin premio';
        addResult('goldResult', `❌ Perdés ${fmtGs(bet)}`, 'var(--red)');
      }
      updateUI();
      document.getElementById('goldBtn').disabled = false;
      goldSpinning = false;
    }
  }, 130);
}

// ════════════════════════════════════════════════════════════════
//  5. CRASH (Aviator style)
// ════════════════════════════════════════════════════════════════
function buildCrash() {
  document.getElementById('panel-crash').innerHTML = `
  <div class="crash-machine">
    <div class="crash-brand">✈️ CRASH</div>
    <div class="crash-display">
      <div class="crash-grid-bg"></div>
      <div class="crash-line" id="crashLine"></div>
      <div class="crash-mult" id="crashMult">1.00x</div>
      <div class="crash-plane" id="crashPlane" style="bottom:30px;left:30px">✈️</div>
    </div>
    <div class="crash-status" id="crashStatus">Hacé tu apuesta y presioná VOLAR</div>
    <div class="crash-cashout" id="crashCashout"></div>
  </div>
  <div class="bet-row">
    <label class="field-label">APUESTA</label>
    <input class="field-input" type="number" id="crashBet" value="500" min="100">
  </div>
  <button class="btn-action primary" id="crashBtn" onclick="startCrash()">✈️ VOLAR</button>
  <button class="btn-action secondary" id="cashoutBtn" onclick="cashoutCrash()" style="display:none">💸 RETIRAR</button>
  <div id="crashResult"></div>`;
}

let crashRunning = false, crashMult = 1.0, crashInterval = null, crashBetAmt = 0, crashCashedOut = false;
function startCrash() {
  if (crashRunning) return;
  const bet = getBet('crashBet', 100);
  if (!bet) { addResult('crashResult','⚠ Mínimo 100 Gs','var(--red)'); return; }
  if (bet > balance) { addResult('crashResult','⚠ Saldo insuficiente','var(--red)'); return; }

  balance -= bet; plays++; crashBetAmt = bet; crashCashedOut = false; updateUI();
  document.getElementById('crashBtn').style.display = 'none';
  document.getElementById('cashoutBtn').style.display = 'block';
  document.getElementById('crashResult').textContent = '';

  // generate crash point
  const crashAt = 1 + Math.random() * (Math.random() < 0.3 ? 1.5 : Math.random() < 0.6 ? 4 : 10);
  crashMult = 1.0; crashRunning = true;
  const plane = document.getElementById('crashPlane');
  let planeX = 30, planeY = 30;

  crashInterval = setInterval(() => {
    crashMult += 0.02 + crashMult * 0.003;
    document.getElementById('crashMult').textContent = crashMult.toFixed(2) + 'x';
    planeX = Math.min(planeX + 2, 85);
    planeY = Math.min(planeY + 1.5, 75);
    plane.style.left = planeX + '%';
    plane.style.bottom = planeY + '%';
    if (crashMult > 3) document.getElementById('crashMult').classList.add('danger');
    document.getElementById('crashStatus').textContent = `🚀 ${crashMult.toFixed(2)}x — Retirá antes del crash!`;
    document.getElementById('crashCashout').textContent = `Retiro actual: ${fmtGs(Math.floor(crashBetAmt * crashMult))}`;

    if (crashMult >= crashAt && !crashCashedOut) {
      clearInterval(crashInterval);
      crashRunning = false;
      document.getElementById('crashMult').textContent = '💥 CRASH!';
      document.getElementById('crashMult').className = 'crash-mult crashed';
      plane.textContent = '💥';
      document.getElementById('crashStatus').textContent = `Crasheó en x${crashAt.toFixed(2)}`;
      addResult('crashResult', `❌ Crasheó x${crashAt.toFixed(2)}. Perdés ${fmtGs(bet)}`, 'var(--red)');
      document.getElementById('cashoutBtn').style.display = 'none';
      setTimeout(() => resetCrash(), 2000);
    }
  }, 100);
}

function cashoutCrash() {
  if (!crashRunning || crashCashedOut) return;
  crashCashedOut = true;
  clearInterval(crashInterval);
  crashRunning = false;
  const won = Math.floor(crashBetAmt * crashMult);
  balance += won; totalWon += won; updateUI();
  addResult('crashResult', `✅ Retirás x${crashMult.toFixed(2)} — Ganás ${fmtGs(won)}`, 'var(--green)');
  document.getElementById('cashoutBtn').style.display = 'none';
  document.getElementById('crashStatus').textContent = `Retirado en x${crashMult.toFixed(2)} ✅`;
  setTimeout(() => resetCrash(), 1500);
}

function resetCrash() {
  const plane = document.getElementById('crashPlane');
  if (plane) { plane.textContent = '✈️'; plane.style.left = '30px'; plane.style.bottom = '30px'; }
  const m = document.getElementById('crashMult');
  if (m) { m.textContent = '1.00x'; m.className = 'crash-mult'; }
  const btn = document.getElementById('crashBtn');
  if (btn) btn.style.display = 'block';
  const status = document.getElementById('crashStatus');
  if (status) status.textContent = 'Hacé tu apuesta y presioná VOLAR';
  const cc = document.getElementById('crashCashout');
  if (cc) cc.textContent = '';
}

// ════════════════════════════════════════════════════════════════
//  6. RULETA
// ════════════════════════════════════════════════════════════════
const ROU_NUMS = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
const ROU_COLORS = { 0:'green',32:'red',15:'black',19:'red',4:'black',21:'red',2:'black',25:'red',17:'black',34:'red',6:'black',27:'red',13:'black',36:'red',11:'black',30:'red',8:'black',23:'red',10:'black',5:'red',24:'black',16:'red',33:'black',1:'red',20:'black',14:'red',31:'black',9:'red',22:'black',18:'red',29:'black',7:'red',28:'black',12:'red',35:'black',3:'red',26:'black' };

function buildRoulette() {
  document.getElementById('panel-roulette').innerHTML = `
  <div class="roulette-machine">
    <div class="rou-brand">🎡 RULETA EUROPEA</div>
    <div class="wheel-wrap">
      <div class="wheel" id="rouWheel">
        ${ROU_NUMS.map((n,i) => {
          const angle = (i / ROU_NUMS.length) * 360;
          const color = ROU_COLORS[n] === 'red' ? '#b91c1c' : ROU_COLORS[n] === 'black' ? '#1f2937' : '#065f2e';
          return `<div class="wheel-segment" style="transform:rotate(${angle}deg);background:${color};color:#fff">${n}</div>`;
        }).join('')}
        <div class="wheel-center"><div class="wheel-hub">🎡</div></div>
      </div>
    </div>
    <div class="rou-result" id="rouResult2"></div>
    <div class="rou-bet-grid">
      <button class="rou-bet-btn red-btn" id="rb-red" onclick="selectRouBet(this,'red')">🔴 ROJO <br><small>x2</small></button>
      <button class="rou-bet-btn black-btn" id="rb-black" onclick="selectRouBet(this,'black')">⚫ NEGRO <br><small>x2</small></button>
      <button class="rou-bet-btn green-btn" id="rb-green" onclick="selectRouBet(this,'green')">🟢 CERO <br><small>x36</small></button>
      <button class="rou-bet-btn" id="rb-even" onclick="selectRouBet(this,'even')">PAR <br><small>x2</small></button>
      <button class="rou-bet-btn" id="rb-odd" onclick="selectRouBet(this,'odd')">IMPAR <br><small>x2</small></button>
      <button class="rou-bet-btn" id="rb-1to18" onclick="selectRouBet(this,'1to18')">1–18 <br><small>x2</small></button>
      <button class="rou-bet-btn" id="rb-19to36" onclick="selectRouBet(this,'19to36')">19–36 <br><small>x2</small></button>
      <button class="rou-bet-btn" id="rb-1to12" onclick="selectRouBet(this,'1to12')">1ª DOC <br><small>x3</small></button>
      <button class="rou-bet-btn" id="rb-2to12" onclick="selectRouBet(this,'2to12')">2ª DOC <br><small>x3</small></button>
    </div>
  </div>
  <div class="bet-row">
    <label class="field-label">APUESTA</label>
    <input class="field-input" type="number" id="rouBet" value="500" min="100">
  </div>
  <button class="btn-action primary" id="rouBtn" onclick="spinRoulette()">🎡 GIRAR</button>
  <div id="rouResult"></div>`;
}

let rouBetType = 'red', rouSpinning = false;
function selectRouBet(btn, type) {
  rouBetType = type;
  document.querySelectorAll('.rou-bet-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}
function spinRoulette() {
  if (rouSpinning) return;
  const bet = getBet('rouBet', 100);
  if (!bet) { addResult('rouResult','⚠ Mínimo 100 Gs','var(--red)'); return; }
  if (bet > balance) { addResult('rouResult','⚠ Saldo insuficiente','var(--red)'); return; }

  rouSpinning = true;
  balance -= bet; plays++; updateUI();
  document.getElementById('rouBtn').disabled = true;

  const idx = Math.floor(Math.random() * ROU_NUMS.length);
  const num = ROU_NUMS[idx];
  const col = ROU_COLORS[num];
  const totalDeg = 1800 + (idx / ROU_NUMS.length) * 360;
  document.getElementById('rouWheel').style.transform = `rotate(${totalDeg}deg)`;

  setTimeout(() => {
    const rouResult2 = document.getElementById('rouResult2');
    const colEmoji = col === 'red' ? '🔴' : col === 'black' ? '⚫' : '🟢';
    rouResult2.textContent = `${colEmoji} ${num}`;
    rouResult2.style.color = col === 'red' ? 'var(--red)' : col === 'green' ? 'var(--green)' : 'var(--text)';

    let mult = 0;
    if (rouBetType === 'red' && col === 'red') mult = 2;
    else if (rouBetType === 'black' && col === 'black') mult = 2;
    else if (rouBetType === 'green' && col === 'green') mult = 36;
    else if (rouBetType === 'even' && num > 0 && num % 2 === 0) mult = 2;
    else if (rouBetType === 'odd' && num % 2 !== 0) mult = 2;
    else if (rouBetType === '1to18' && num >= 1 && num <= 18) mult = 2;
    else if (rouBetType === '19to36' && num >= 19 && num <= 36) mult = 2;
    else if (rouBetType === '1to12' && num >= 1 && num <= 12) mult = 3;
    else if (rouBetType === '2to12' && num >= 13 && num <= 24) mult = 3;

    if (mult) {
      const won = bet * mult;
      balance += won; totalWon += won;
      addResult('rouResult', `✅ ${num} ${colEmoji} — Ganás ${fmtGs(won)}`, 'var(--green)');
    } else {
      addResult('rouResult', `❌ ${num} ${colEmoji} — Perdés ${fmtGs(bet)}`, 'var(--red)');
    }
    updateUI();
    document.getElementById('rouBtn').disabled = false;
    rouSpinning = false;
  }, 2000);
}

// ════════════════════════════════════════════════════════════════
//  7. BLACKJACK
// ════════════════════════════════════════════════════════════════
const BJ_SUITS = ['♠','♥','♦','♣'];
const BJ_VALS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
function newDeck() {
  const d = [];
  BJ_SUITS.forEach(s => BJ_VALS.forEach(v => d.push({s,v})));
  return d.sort(() => Math.random()-.5);
}
function cardVal(v) { if(v==='A') return 11; if(['J','Q','K'].includes(v)) return 10; return parseInt(v); }
function handScore(cards) {
  let s = cards.reduce((a,c) => a+cardVal(c.v), 0), aces = cards.filter(c=>c.v==='A').length;
  while(s>21 && aces>0) { s-=10; aces--; }
  return s;
}
function cardHTML(c, hidden=false) {
  if(hidden) return `<div class="card back"></div>`;
  const red = ['♥','♦'].includes(c.s);
  return `<div class="card ${red?'red-card':''}"><span class="card-suit">${c.s}</span>${c.v}</div>`;
}

function buildBlackjack() {
  document.getElementById('panel-blackjack').innerHTML = `
  <div class="bj-machine">
    <div class="bj-brand">🃏 BLACKJACK</div>
    <div class="cards-area">
      <div class="hand-section">
        <div class="hand-label">Dealer</div>
        <div class="hand-score" id="dealerScore">—</div>
        <div class="cards-display" id="dealerCards"></div>
      </div>
      <div class="hand-section">
        <div class="hand-label">Vos</div>
        <div class="hand-score" id="playerScore">—</div>
        <div class="cards-display" id="playerCards"></div>
      </div>
    </div>
    <div class="bj-status" id="bjStatus"></div>
    <div class="bj-actions">
      <button class="bj-btn" id="bjHit" onclick="bjHit()" disabled>Pedir 🃏</button>
      <button class="bj-btn" id="bjStand" onclick="bjStand()" disabled>Plantarse 🖐</button>
    </div>
  </div>
  <div class="bet-row">
    <label class="field-label">APUESTA</label>
    <input class="field-input" type="number" id="bjBet" value="500" min="100">
  </div>
  <button class="btn-action primary" id="bjDeal" onclick="bjDeal()">🃏 REPARTIR</button>
  <div id="bjResult"></div>`;
}

let bjDeck=[], bjPlayer=[], bjDealer=[], bjBetAmt=0, bjRunning=false;
function bjDeal() {
  const bet = getBet('bjBet',100);
  if(!bet) { addResult('bjResult','⚠ Mínimo 100 Gs','var(--red)'); return; }
  if(bet>balance) { addResult('bjResult','⚠ Saldo insuficiente','var(--red)'); return; }
  balance -= bet; bjBetAmt = bet; plays++; updateUI(); bjRunning = true;
  bjDeck = newDeck();
  bjPlayer = [bjDeck.pop(), bjDeck.pop()];
  bjDealer = [bjDeck.pop(), bjDeck.pop()];
  renderBJ(true);
  document.getElementById('bjDeal').disabled = true;
  document.getElementById('bjHit').disabled = false;
  document.getElementById('bjStand').disabled = false;
  addResult('bjResult','','');
  const ps = handScore(bjPlayer);
  if(ps===21) { document.getElementById('bjStatus').textContent='🎉 BLACKJACK!'; bjEnd(true, true); return; }
  document.getElementById('bjStatus').textContent='Tu turno';
}
function renderBJ(hideDealer=false) {
  document.getElementById('playerCards').innerHTML = bjPlayer.map(c=>cardHTML(c)).join('');
  document.getElementById('dealerCards').innerHTML = hideDealer
    ? cardHTML(bjDealer[0]) + cardHTML(null,true)
    : bjDealer.map(c=>cardHTML(c)).join('');
  document.getElementById('playerScore').textContent = handScore(bjPlayer);
  document.getElementById('dealerScore').textContent = hideDealer ? bjDealer[0]?cardVal(bjDealer[0].v):'?' : handScore(bjDealer);
}
function bjHit() {
  bjPlayer.push(bjDeck.pop());
  renderBJ(true);
  const ps = handScore(bjPlayer);
  document.getElementById('playerScore').textContent = ps;
  if(ps>21) { document.getElementById('bjStatus').textContent='💥 Pasaste de 21!'; bjEnd(false); }
}
function bjStand() {
  document.getElementById('bjHit').disabled = true;
  document.getElementById('bjStand').disabled = true;
  while(handScore(bjDealer)<17) bjDealer.push(bjDeck.pop());
  renderBJ(false);
  const ps=handScore(bjPlayer), ds=handScore(bjDealer);
  if(ds>21||ps>ds) bjEnd(true);
  else if(ps===ds) bjEnd(null);
  else bjEnd(false);
}
function bjEnd(win, bj=false) {
  document.getElementById('bjHit').disabled=true;
  document.getElementById('bjStand').disabled=true;
  document.getElementById('bjDeal').disabled=false;
  renderBJ(false); bjRunning=false;
  if(win===null) {
    balance+=bjBetAmt;
    document.getElementById('bjStatus').textContent='🤝 Empate';
    addResult('bjResult','Empate — recuperás tu apuesta','var(--muted2)');
  } else if(win) {
    const won = bjBetAmt*(bj?2.5:2);
    balance+=won; totalWon+=won-bjBetAmt;
    document.getElementById('bjStatus').innerHTML=`<span style="color:var(--green)">✅ Ganás ${fmtGs(won)}</span>`;
    addResult('bjResult',`✅ Ganás ${fmtGs(Math.floor(won))}`, 'var(--green)');
  } else {
    document.getElementById('bjStatus').innerHTML=`<span style="color:var(--red)">❌ Perdés ${fmtGs(bjBetAmt)}</span>`;
    addResult('bjResult',`❌ Perdés ${fmtGs(bjBetAmt)}`, 'var(--red)');
  }
  updateUI();
}

// ════════════════════════════════════════════════════════════════
//  8. MINAS
// ════════════════════════════════════════════════════════════════
function buildMines() {
  const cells = Array(25).fill(0).map((_,i)=>`<div class="mine-cell" id="mc${i}" onclick="revealMine(${i})">❓</div>`).join('');
  document.getElementById('panel-mines').innerHTML = `
  <div class="mines-machine">
    <div class="mines-brand">💣 MINAS</div>
    <div class="mines-grid">${cells}</div>
    <div class="mines-mult" id="minesMult"></div>
    <div class="bet-row">
      <label class="field-label">APUESTA</label>
      <input class="field-input" type="number" id="minesBet" value="500" min="100">
    </div>
    <div class="bet-row" style="margin-bottom:0">
      <label class="field-label">BOMBAS (3–10)</label>
      <input class="field-input" type="number" id="minesBombs" value="5" min="3" max="10">
    </div>
  </div>
  <button class="btn-action primary" id="minesStart" onclick="startMines()">💣 INICIAR</button>
  <button class="btn-action secondary" id="minesCashout" onclick="cashoutMines()" style="display:none">💸 RETIRAR</button>
  <div id="minesResult"></div>`;
}

let minesBoard=[], minesBetAmt=0, minesRunning=false, minesRevealed=0, minesGems=0;
function startMines() {
  const bet = getBet('minesBet',100);
  if(!bet) { addResult('minesResult','⚠ Mínimo 100 Gs','var(--red)'); return; }
  if(bet>balance) { addResult('minesResult','⚠ Saldo insuficiente','var(--red)'); return; }
  const bombs = parseInt(document.getElementById('minesBombs').value)||5;

  balance -= bet; minesBetAmt=bet; minesRevealed=0; minesGems=0; plays++; updateUI();
  minesBoard = Array(25).fill('gem');
  let b=bombs;
  while(b>0){const i=Math.floor(Math.random()*25);if(minesBoard[i]!=='bomb'){minesBoard[i]='bomb';b--;}}
  for(let i=0;i<25;i++){const el=document.getElementById('mc'+i);el.className='mine-cell';el.textContent='❓';el.onclick=()=>revealMine(i);}
  minesRunning=true;
  document.getElementById('minesStart').style.display='none';
  document.getElementById('minesCashout').style.display='block';
  document.getElementById('minesMult').textContent='Destapá gemas 💎';
  addResult('minesResult','','');
}
function revealMine(i) {
  if(!minesRunning) return;
  const el = document.getElementById('mc'+i);
  if(el.classList.contains('revealed')) return;
  el.classList.add('revealed');
  if(minesBoard[i]==='bomb') {
    el.classList.add('bomb'); el.textContent='💣';
    // reveal all bombs
    minesBoard.forEach((t,j)=>{if(t==='bomb'){const e=document.getElementById('mc'+j);e.classList.add('revealed','bomb');e.textContent='💣';}});
    minesRunning=false;
    document.getElementById('minesStart').style.display='block';
    document.getElementById('minesCashout').style.display='none';
    addResult('minesResult',`💥 Pisaste una mina! Perdés ${fmtGs(minesBetAmt)}`,'var(--red)');
    document.getElementById('minesMult').textContent='💥 BOOM!';
  } else {
    el.classList.add('gem'); el.textContent='💎'; minesGems++;
    const mult = (1 + minesGems*0.5).toFixed(1);
    const payout = Math.floor(minesBetAmt * parseFloat(mult));
    document.getElementById('minesMult').textContent=`💎 x${mult} — Retirás ${fmtGs(payout)}`;
  }
}
function cashoutMines() {
  if(!minesRunning||minesGems===0){addResult('minesResult','⚠ Destapá al menos 1 gema','var(--red)');return;}
  minesRunning=false;
  const mult = 1+minesGems*0.5;
  const won = Math.floor(minesBetAmt*mult);
  balance+=won; totalWon+=won-minesBetAmt; updateUI();
  addResult('minesResult',`✅ Retirás x${mult.toFixed(1)} — Ganás ${fmtGs(won)}`,'var(--green)');
  document.getElementById('minesStart').style.display='block';
  document.getElementById('minesCashout').style.display='none';
  document.getElementById('minesMult').textContent=`🏆 x${mult.toFixed(1)}`;
  // reveal remaining
  minesBoard.forEach((t,j)=>{const e=document.getElementById('mc'+j);if(!e.classList.contains('revealed')){e.classList.add('revealed',t);e.textContent=t==='bomb'?'💣':'💎';}});
}

// ════════════════════════════════════════════════════════════════
//  9. DADOS
// ════════════════════════════════════════════════════════════════
function buildDice() {
  const FACES = ['⚀','⚁','⚂','⚃','⚄','⚅'];
  document.getElementById('panel-dice').innerHTML = `
  <div class="dice-machine">
    <div class="dice-brand">🎲 DADOS</div>
    <div class="dice-display">
      <div class="die" id="die0">⚀</div>
      <div class="die" id="die1">⚄</div>
    </div>
    <div class="dice-result-num" id="diceNum"></div>
    <div style="text-align:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--muted2);margin-bottom:10px">Resultado del 2 al 12</div>
    <div class="dice-over-under">
      <button class="ou-btn" id="ou-over" onclick="selectOU(this,'over')">⬆ MAYOR a 7 · x2</button>
      <button class="ou-btn" id="ou-under" onclick="selectOU(this,'under')">⬇ MENOR a 7 · x2</button>
      <button class="ou-btn" id="ou-exact7" onclick="selectOU(this,'exact7')" style="grid-column:span 2">🎯 EXACTAMENTE 7 · x5</button>
    </div>
  </div>
  <div class="bet-row">
    <label class="field-label">APUESTA</label>
    <input class="field-input" type="number" id="diceBet" value="500" min="100">
  </div>
  <button class="btn-action primary" id="diceBtn" onclick="rollDice()">🎲 TIRAR</button>
  <div id="diceResult"></div>`;
}

let diceChoice = 'over', diceRolling = false;
function selectOU(btn, choice) {
  diceChoice = choice;
  document.querySelectorAll('.ou-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
}
function rollDice() {
  if(diceRolling) return;
  const bet = getBet('diceBet',100);
  if(!bet){addResult('diceResult','⚠ Mínimo 100 Gs','var(--red)');return;}
  if(bet>balance){addResult('diceResult','⚠ Saldo insuficiente','var(--red)');return;}

  diceRolling=true;
  balance-=bet; plays++; updateUI();
  document.getElementById('diceBtn').disabled=true;
  document.getElementById('diceNum').textContent='';
  const FACES=['⚀','⚁','⚂','⚃','⚄','⚅'];
  [0,1].forEach(i=>document.getElementById('die'+i).classList.add('rolling'));

  let tick=0;
  const iv = setInterval(()=>{
    [0,1].forEach(i=>document.getElementById('die'+i).textContent=FACES[Math.floor(Math.random()*6)]);
    tick++;
    if(tick>18){
      clearInterval(iv);
      [0,1].forEach(i=>document.getElementById('die'+i).classList.remove('rolling'));
      const d1=Math.ceil(Math.random()*6), d2=Math.ceil(Math.random()*6);
      document.getElementById('die0').textContent=FACES[d1-1];
      document.getElementById('die1').textContent=FACES[d2-1];
      const total=d1+d2;
      document.getElementById('diceNum').textContent=total;

      let mult=0;
      if(diceChoice==='over'&&total>7) mult=2;
      else if(diceChoice==='under'&&total<7) mult=2;
      else if(diceChoice==='exact7'&&total===7) mult=5;

      if(mult){
        const won=bet*mult; balance+=won; totalWon+=won;
        addResult('diceResult',`✅ ${total}! Ganás ${fmtGs(won)}`,'var(--green)');
      } else {
        addResult('diceResult',`❌ Salió ${total}. Perdés ${fmtGs(bet)}`,'var(--red)');
      }
      updateUI();
      document.getElementById('diceBtn').disabled=false;
      diceRolling=false;
    }
  },70);
}
