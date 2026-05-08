// ── CURSOR
const cur = document.getElementById('cur');
const ring = document.getElementById('ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx+'px'; cur.style.top = my+'px';
});
(function loop(){
  rx += (mx-rx)*.11; ry += (my-ry)*.11;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a,button,.proj,.sk').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ ring.style.transform='translate(-50%,-50%) scale(1.8)'; ring.style.opacity='.25'; });
  el.addEventListener('mouseleave',()=>{ ring.style.transform='translate(-50%,-50%) scale(1)'; ring.style.opacity='1'; });
});

let playing = false;

function openPlayer() {
  document.getElementById('audio').play();
  document.getElementById('music-bar').style.display = 'none';
  document.getElementById('player').style.display = 'flex';
  playing = true;
}

function toggleMusic() {
  const audio = document.getElementById('audio');
  const btn = document.getElementById('pause-btn');
  if (playing) {
    audio.pause();
    btn.textContent = '[ resume ]';
    playing = false;
  } else {
    audio.play();
    btn.textContent = '[ pause ]';
    playing = true;
  }
}

function closePlayer() {
  const audio = document.getElementById('audio');
  audio.pause();
  audio.currentTime = 0;
  document.getElementById('player').style.display = 'none';
  playing = false;
}

function dismissBar() {
  document.getElementById('music-bar').style.display = 'none';
}

// ── TYPEWRITER for terminal lines
function typewriterLines() {
  const lines = document.querySelectorAll('#term-lines .tl');
  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add('visible'), 900 + i * 300);
  });
}
window.addEventListener('load', typewriterLines);

// ── SCROLL REVEAL
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => obs.observe(el));

// ── SKILLS TOGGLE
function toggleSkills() {
  const extra = document.getElementById('sk-extra');
  const btn   = document.getElementById('sk-btn');
  const open  = extra.classList.toggle('open');
  btn.textContent = open ? 'show less' : 'show more';
  btn.classList.toggle('open', open);
}

// ── PARTICLES
function spawnParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random()*3+1.5;
  const dur  = Math.random()*14+8;
  p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}vw;background:rgba(251,146,60,${Math.random()*.3+.1});animation-duration:${dur}s;animation-delay:${Math.random()*4}s;`;
  document.body.appendChild(p);
  setTimeout(()=>p.remove(),(dur+4)*1000);
}
for(let i=0;i<14;i++) spawnParticle();
setInterval(spawnParticle, 2500);

// ── 3D PC on Canvas (Three.js style via raw WebGL-inspired Canvas2D)


// ── CHATBOT LOGIC (keyword tracker version)
// question/answer data lives in chat-data.js; use getChatReply(text) to obtain responses


function toggleChat() {
  document.getElementById('chatWindow').classList.toggle('open');
}

function sendMsg() {
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  let text = input.value.trim().toLowerCase();
  if (!text) return;

  messages.innerHTML += `<div class="msg user">${text}</div>`;
  input.value = '';
  messages.innerHTML += `<div class="msg bot typing" id="typing">Typing...</div>`;
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    document.getElementById('typing').remove();
    const reply = window.getChatReply ? getChatReply(text) : "I don't have that info yet, contact Zakaria directly!";
    messages.innerHTML += `<div class="msg bot">${reply}</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 800);
}

