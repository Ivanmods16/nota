<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Casino en vivo | Blackcasino</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --green:#20c86a;
  --green-dark:#16a158;
  --gold:#d6a53b;
  --red:#e45d5d;
  --bg:#070908;
  --card:#101312;
  --card2:#151a18;
  --border:#242b28;
  --text:#f4f7f5;
  --muted:#77817b;
  --muted2:#a2aaa5;
  --shadow:0 24px 70px rgba(0,0,0,.38);
}
body{
  min-height:100vh;
  padding:28px 14px;
  font-family:'Syne',sans-serif;
  color:var(--text);
  background:
    radial-gradient(circle at 50% -12%,rgba(32,200,106,.12),transparent 34%),
    linear-gradient(180deg,#090c0b 0%,#050605 100%);
}
body::before{
  content:'';
  position:fixed;
  inset:0;
  background:
    linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.014) 1px,transparent 1px);
  background-size:42px 42px;
  mask-image:linear-gradient(to bottom,rgba(0,0,0,.45),transparent 72%);
  pointer-events:none;
}
.app{position:relative;z-index:1;max-width:1080px;margin:0 auto}
.topbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:16px;
  padding:8px 0 18px;
  border-bottom:1px solid rgba(255,255,255,.06);
}
.logo{font-size:24px;font-weight:800;letter-spacing:-.04em}
.logo span{color:var(--green)}
.nav{display:flex;gap:10px;align-items:center}
.back,.support,.logout{
  border:1px solid var(--border);
  border-radius:10px;
  padding:10px 14px;
  color:var(--text);
  background:#0a0d0c;
  text-decoration:none;
  font-size:13px;
  font-weight:700;
}
.support{background:linear-gradient(180deg,#27d677,#18aa5d);color:#041008;border:none}
.logout{cursor:pointer;font-family:'Syne',sans-serif}
.hero{padding:28px 0 20px}
.eyebrow{
  display:inline-flex;
  align-items:center;
  gap:8px;
  color:#c8f8dc;
  font-family:'Space Mono',monospace;
  font-size:12px;
  margin-bottom:12px;
}
.eyebrow::before{content:'';width:8px;height:8px;border-radius:50%;background:var(--green);box-shadow:0 0 14px var(--green)}
h1{font-size:clamp(32px,5vw,58px);line-height:.98;letter-spacing:-.04em;margin-bottom:12px}
.hero p{max-width:640px;color:var(--muted2);font-size:15px;line-height:1.7}
.layout{display:grid;grid-template-columns:1.45fr .85fr;gap:16px;align-items:start}
.panel{
  border:1px solid var(--border);
  border-radius:16px;
  background:linear-gradient(180deg,rgba(18,22,20,.98),rgba(11,14,13,.98));
  box-shadow:var(--shadow),inset 0 1px 0 rgba(255,255,255,.025);
}
.stage{overflow:hidden}
.stage-head{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  padding:18px;
  border-bottom:1px solid rgba(255,255,255,.06);
}
.table-name{font-size:18px;font-weight:800}
.status{font-family:'Space Mono',monospace;font-size:12px;color:var(--green)}
.live-view{
  min-height:360px;
  display:grid;
  place-items:center;
  position:relative;
  background:
    radial-gradient(circle at 50% 18%,rgba(32,200,106,.16),transparent 32%),
    linear-gradient(145deg,#101614,#070908);
}
.dealer{
  width:min(360px,78%);
  aspect-ratio:1.6/1;
  border:1px solid #33413b;
  border-radius:28px 28px 90px 90px;
  background:linear-gradient(180deg,#17201c,#0c100f);
  box-shadow:0 25px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.06);
  position:relative;
}
.dealer::before{
  content:'';
  position:absolute;
  left:50%;
  top:24px;
  width:72px;
  height:72px;
  transform:translateX(-50%);
  border-radius:50%;
  background:linear-gradient(180deg,#f0c39b,#c98f67);
  border:4px solid rgba(255,255,255,.72);
}
.dealer::after{
  content:'';
  position:absolute;
  left:50%;
  top:104px;
  width:160px;
  height:72px;
  transform:translateX(-50%);
  border-radius:28px 28px 12px 12px;
  background:linear-gradient(180deg,#1d4ed8,#112a65);
  border:3px solid rgba(255,255,255,.62);
}
.table-surface{
  position:absolute;
  left:8%;
  right:8%;
  bottom:22px;
  height:92px;
  border-radius:50%;
  background:linear-gradient(180deg,#13683b,#0e3f27);
  border:2px solid rgba(214,165,59,.75);
}
.chips{position:absolute;bottom:54px;display:flex;gap:8px}
.chip{width:34px;height:34px;border-radius:50%;border:5px dashed rgba(255,255,255,.75);background:#d6a53b}
.chip:nth-child(2){background:#20c86a}.chip:nth-child(3){background:#e45d5d}
.stage-foot{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:14px;background:#080b0a}
.metric{border:1px solid var(--border);border-radius:12px;padding:12px;background:#0a0d0c}
.metric .label{font-family:'Space Mono',monospace;color:var(--muted);font-size:10px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px}
.metric .value{font-weight:800;font-size:16px}
.side{padding:18px}
.side h2{font-size:18px;margin-bottom:14px}
.field{margin-bottom:12px}
.field label{display:block;font-family:'Space Mono',monospace;color:var(--muted2);font-size:11px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
.field input,.field select{
  width:100%;
  border:1px solid #26312c;
  border-radius:10px;
  background:#0a0d0c;
  color:var(--text);
  padding:12px 13px;
  font-family:'Syne',sans-serif;
  outline:none;
}
.field input:focus,.field select:focus{border-color:rgba(32,200,106,.72);box-shadow:0 0 0 3px rgba(32,200,106,.11)}
.actions{display:grid;gap:10px;margin-top:16px}
.primary,.secondary{
  width:100%;
  border:none;
  border-radius:10px;
  padding:13px 16px;
  font-family:'Syne',sans-serif;
  font-weight:800;
  cursor:pointer;
}
.primary{background:linear-gradient(180deg,#27d677,#18aa5d);color:#041008}
.secondary{background:#0a0d0c;color:var(--gold);border:1px solid rgba(214,165,59,.55)}
.notice{min-height:18px;margin-top:12px;font-family:'Space Mono',monospace;font-size:12px;color:var(--muted2);line-height:1.5}
.notice.ok{color:var(--green)}.notice.err{color:var(--red)}
.log{margin-top:16px;border-top:1px solid rgba(255,255,255,.06);padding-top:14px}
.log-title{font-family:'Space Mono',monospace;font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px}
.log-row{display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:13px;color:var(--muted2)}
.log-row strong{color:var(--text)}
@media(max-width:800px){
  body{padding:14px 10px}
  .topbar{align-items:flex-start;flex-direction:column}
  .nav{width:100%;display:grid;grid-template-columns:1fr}
  .layout{grid-template-columns:1fr}
  .stage-foot{grid-template-columns:1fr}
}
</style>
</head>
<body>
<main class="app">
  <header class="topbar">
    <div class="logo">Black<span>casino</span></div>
    <nav class="nav">
      <a class="back" href="/casino">Volver al casino</a>
      <a class="support" id="supportLink" href="#" target="_blank" rel="noopener">Soporte</a>
      <button class="logout" type="button" onclick="cerrarSesion()">Cerrar sesión</button>
    </nav>
  </header>

  <section class="hero">
    <div class="eyebrow">Mesa en vivo</div>
    <h1 id="pageTitle">Casino en vivo</h1>
    <p>Esta sala prepara el acceso a una mesa real atendida por operador. Confirmá tus datos y enviá la solicitud para coordinar el ingreso.</p>
  </section>

  <section class="layout">
    <div class="panel stage">
      <div class="stage-head">
        <div class="table-name" id="tableName">Mesa en vivo</div>
        <div class="status">Operador disponible</div>
      </div>
      <div class="live-view">
        <div class="dealer">
          <div class="table-surface"></div>
        </div>
        <div class="chips">
          <span class="chip"></span>
          <span class="chip"></span>
          <span class="chip"></span>
        </div>
      </div>
      <div class="stage-foot">
        <div class="metric"><div class="label">Mesa</div><div class="value" id="metricMesa">-</div></div>
        <div class="metric"><div class="label">Mínimo</div><div class="value" id="metricMin">-</div></div>
        <div class="metric"><div class="label">Acceso</div><div class="value">Manual</div></div>
      </div>
    </div>

    <aside class="panel side">
      <h2>Confirmar acceso</h2>
      <div class="field">
        <label>Mesa</label>
        <select id="mesaSelect">
          <option value="Ruleta en vivo" data-min="20000">Ruleta en vivo</option>
          <option value="Blackjack en vivo" data-min="30000">Blackjack en vivo</option>
          <option value="Cartas VIP" data-min="50000">Cartas VIP</option>
        </select>
      </div>
      <div class="field">
        <label>Usuario</label>
        <input id="usuarioInput" type="text" placeholder="Tu usuario">
      </div>
      <div class="field">
        <label>Saldo disponible</label>
        <input id="saldoInput" type="number" min="0" step="5000" placeholder="0">
      </div>
      <div class="actions">
        <button class="primary" type="button" onclick="solicitarAcceso()">Solicitar entrada</button>
        <button class="secondary" type="button" onclick="abrirSoporte()">Consultar disponibilidad</button>
      </div>
      <div class="notice" id="notice"></div>
      <div class="log">
        <div class="log-title">Actividad</div>
        <div class="log-row"><strong>Estado</strong><span>Esperando confirmación</span></div>
        <div class="log-row"><strong>Validación</strong><span>Saldo y cupo</span></div>
        <div class="log-row"><strong>Contacto</strong><span>WhatsApp</span></div>
      </div>
    </aside>
  </section>
</main>

<script>
const PHONE='595992809980';
const TABLES={
  'Ruleta en vivo':{min:20000,label:'Mesa 01'},
  'Blackjack en vivo':{min:30000,label:'Mesa 02'},
  'Cartas VIP':{min:50000,label:'Mesa 03'}
};

function params(){
  return new URLSearchParams(window.location.search);
}

function money(n){
  return Number(n||0).toLocaleString()+' Gs';
}

function selectedTable(){
  const select=document.getElementById('mesaSelect');
  const name=select.value;
  const opt=select.options[select.selectedIndex];
  return {name,min:Number(opt.dataset.min||TABLES[name].min||0),label:TABLES[name].label};
}

function setNotice(text,type=''){
  const notice=document.getElementById('notice');
  notice.className='notice '+type;
  notice.textContent=text;
}

function refreshTable(){
  const table=selectedTable();
  document.getElementById('pageTitle').textContent=table.name;
  document.getElementById('tableName').textContent=table.name;
  document.getElementById('metricMesa').textContent=table.label;
  document.getElementById('metricMin').textContent=money(table.min);
}

function whatsappUrl(text){
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
}

function buildMessage(kind){
  const table=selectedTable();
  const usuario=document.getElementById('usuarioInput').value.trim()||'Sin usuario';
  const saldo=Number(document.getElementById('saldoInput').value||0);
  return [
    `Hola, quiero ${kind} para ${table.name}.`,
    `Usuario: ${usuario}.`,
    `Saldo informado: ${money(saldo)}.`,
    `Mínimo de mesa: ${money(table.min)}.`
  ].join(' ');
}

function solicitarAcceso(){
  const table=selectedTable();
  const saldo=Number(document.getElementById('saldoInput').value||0);
  if(saldo<table.min){
    setNotice(`Esta mesa requiere mínimo ${money(table.min)}. Actualizá tu saldo o consultá soporte.`, 'err');
    return;
  }
  setNotice('Solicitud lista. Se abrirá WhatsApp para confirmar tu entrada.', 'ok');
  window.open(whatsappUrl(buildMessage('solicitar entrada')),'_blank','noopener');
}

function abrirSoporte(){
  setNotice('Se abrirá WhatsApp para consultar disponibilidad.', 'ok');
  window.open(whatsappUrl(buildMessage('consultar disponibilidad')),'_blank','noopener');
}

function cerrarSesion(){
  localStorage.removeItem('bc_s');
  window.location.href='/casino';
}

function init(){
  const q=params();
  const mesa=q.get('mesa');
  const saldo=q.get('saldo');
  const usuario=q.get('usuario');
  if(mesa&&TABLES[mesa])document.getElementById('mesaSelect').value=mesa;
  if(saldo)document.getElementById('saldoInput').value=saldo;
  if(usuario)document.getElementById('usuarioInput').value=usuario;
  document.getElementById('mesaSelect').addEventListener('change',refreshTable);
  document.getElementById('supportLink').href=whatsappUrl('Hola, quiero consultar por el casino en vivo.');
  refreshTable();
}

init();
</script>
</body>
</html>
