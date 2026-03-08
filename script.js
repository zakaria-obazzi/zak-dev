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
const canvas = document.getElementById('pc-canvas');
const ctx = canvas.getContext('2d');
let W, H, t = 0;

function resize() {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

function project(x, y, z, fov, cx, cy) {
  const scale = fov / (fov + z);
  return { x: cx + x * scale, y: cy + y * scale, s: scale };
}

function drawPC(t) {
  ctx.clearRect(0, 0, W, H);

  const cx = W * 0.48;
  const cy = H * 0.5;
  const fov = 500;

  // rotation
  const rotY = Math.sin(t * 0.3) * 0.25 + 0.15;
  const rotX = Math.sin(t * 0.2) * 0.08;

  function rot3D(x, y, z) {
    // Y rotation
    const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
    const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
    // X rotation
    const y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
    const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
    return [x1, y1, z2];
  }

  function p(x,y,z){ const r=rot3D(x,y,z); return project(r[0],r[1],r[2],fov,cx,cy); }

  const alpha = (base) => `rgba(251,146,60,${base})`;
  const alphaG = (base) => `rgba(200,180,140,${base})`;

  // ── MONITOR ──
  const mW=180, mH=120, mD=14;
  // front face
  const corners = [
    p(-mW/2,-mH/2,0), p(mW/2,-mH/2,0),
    p(mW/2, mH/2,0), p(-mW/2,mH/2,0)
  ];
  ctx.beginPath();
  ctx.moveTo(corners[0].x,corners[0].y);
  corners.forEach(c=>ctx.lineTo(c.x,c.y));
  ctx.closePath();
  ctx.fillStyle = 'rgba(20,18,14,0.9)';
  ctx.fill();
  ctx.strokeStyle = alpha(.5);
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // screen bezel
  const bevel=16;
  const sc = [
    p(-mW/2+bevel,-mH/2+bevel,1), p(mW/2-bevel,-mH/2+bevel,1),
    p(mW/2-bevel, mH/2-bevel,1), p(-mW/2+bevel,mH/2-bevel,1)
  ];
  ctx.beginPath();
  ctx.moveTo(sc[0].x,sc[0].y);
  sc.forEach(c=>ctx.lineTo(c.x,c.y));
  ctx.closePath();
  ctx.fillStyle = 'rgba(10,8,6,0.95)';
  ctx.fill();
  ctx.strokeStyle = alpha(.25);
  ctx.lineWidth=1;
  ctx.stroke();

  // screen glow/content
  const scMid = p(0,0,2);
  const grad = ctx.createRadialGradient(scMid.x,scMid.y,0,scMid.x,scMid.y,80*scMid.s);
  grad.addColorStop(0,'rgba(249,115,22,0.18)');
  grad.addColorStop(1,'rgba(249,115,22,0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(sc[0].x,sc[0].y);
  sc.forEach(c=>ctx.lineTo(c.x,c.y));
  ctx.closePath();
  ctx.fill();

  // fake terminal lines on screen
  const lineCount = 7;
  for(let i=0;i<lineCount;i++){
    const ly = -mH/2+bevel+18 + i*12;
    const lx1 = -mW/2+bevel+10;
    const lx2 = lx1 + (i===0 ? 60 : i===lineCount-1 ? 20 : 30+Math.sin(i*1.3)*30);
    const lp1 = p(lx1, ly, 2);
    const lp2 = p(lx2, ly, 2);
    ctx.beginPath();
    ctx.moveTo(lp1.x,lp1.y);
    ctx.lineTo(lp2.x,lp2.y);
    ctx.strokeStyle = i===0 ? alpha(.7) : alphaG(.3);
    ctx.lineWidth = i===0 ? 1.5*lp1.s : 1*lp1.s;
    ctx.stroke();
  }
  // blinking cursor on screen
  if(Math.floor(t*2)%2===0){
    const lcp = p(-mW/2+bevel+10+62, -mH/2+bevel+18, 2);
    ctx.fillStyle = alpha(.9);
    ctx.fillRect(lcp.x, lcp.y-5*lcp.s, 7*lcp.s, 10*lcp.s);
  }

  // top face
  const top = [
    p(-mW/2,-mH/2,-mD), p(mW/2,-mH/2,-mD),
    p(mW/2,-mH/2,0),    p(-mW/2,-mH/2,0)
  ];
  ctx.beginPath();
  ctx.moveTo(top[0].x,top[0].y);
  top.forEach(c=>ctx.lineTo(c.x,c.y));
  ctx.closePath();
  ctx.fillStyle='rgba(28,24,18,0.9)';
  ctx.fill();
  ctx.strokeStyle=alpha(.35);ctx.lineWidth=1;ctx.stroke();

  // right face
  const right = [
    p(mW/2,-mH/2,-mD), p(mW/2,mH/2,-mD),
    p(mW/2,mH/2,0),    p(mW/2,-mH/2,0)
  ];
  ctx.beginPath();
  ctx.moveTo(right[0].x,right[0].y);
  right.forEach(c=>ctx.lineTo(c.x,c.y));
  ctx.closePath();
  ctx.fillStyle='rgba(22,19,14,0.9)';
  ctx.fill();
  ctx.strokeStyle=alpha(.25);ctx.lineWidth=1;ctx.stroke();

  // ── STAND ──
  const stH=70,stW=16,stBaseW=80;
  // pole
  const stPts=[p(-stW/2,mH/2,0),p(stW/2,mH/2,0),p(stW/2,mH/2+stH,0),p(-stW/2,mH/2+stH,0)];
  ctx.beginPath(); ctx.moveTo(stPts[0].x,stPts[0].y);
  stPts.forEach(c=>ctx.lineTo(c.x,c.y)); ctx.closePath();
  ctx.fillStyle='rgba(24,20,16,0.95)'; ctx.fill();
  ctx.strokeStyle=alpha(.35); ctx.lineWidth=1; ctx.stroke();

  // base
  const basePts=[p(-stBaseW/2,mH/2+stH,0),p(stBaseW/2,mH/2+stH,0),p(stBaseW/2,mH/2+stH+12,0),p(-stBaseW/2,mH/2+stH+12,0)];
  ctx.beginPath(); ctx.moveTo(basePts[0].x,basePts[0].y);
  basePts.forEach(c=>ctx.lineTo(c.x,c.y)); ctx.closePath();
  ctx.fillStyle='rgba(22,18,14,0.95)'; ctx.fill();
  ctx.strokeStyle=alpha(.4); ctx.lineWidth=1; ctx.stroke();

  // ── KEYBOARD ──
  const kbY = mH/2+stH+12;
  const kbW=240, kbH=80, kbD=10;
  const kb=[
    p(-kbW/2, kbY,    -kbD),
    p( kbW/2, kbY,    -kbD),
    p( kbW/2, kbY,     0),
    p(-kbW/2, kbY,     0)
  ];
  ctx.beginPath(); ctx.moveTo(kb[0].x,kb[0].y);
  kb.forEach(c=>ctx.lineTo(c.x,c.y)); ctx.closePath();
  ctx.fillStyle='rgba(20,17,13,0.9)'; ctx.fill();
  ctx.strokeStyle=alpha(.4); ctx.lineWidth=1.5; ctx.stroke();

  // keyboard rows of keys
  for(let row=0;row<3;row++){
    for(let col=0;col<(row===2?8:10);col++){
      const kx = -kbW/2 + 18 + col*(kbW-36)/10 + (row===2?10:0);
      const kz = -kbD + 8 + row*22;
      const kSize=16;
      const kPts=[
        p(kx,kbY-1,kz),p(kx+kSize,kbY-1,kz),
        p(kx+kSize,kbY-1,kz+14),p(kx,kbY-1,kz+14)
      ];
      ctx.beginPath(); ctx.moveTo(kPts[0].x,kPts[0].y);
      kPts.forEach(k=>ctx.lineTo(k.x,k.y)); ctx.closePath();
      ctx.fillStyle='rgba(30,26,20,0.95)'; ctx.fill();
      ctx.strokeStyle=alpha(.2); ctx.lineWidth=.8; ctx.stroke();
    }
  }

  // floating code particles around monitor
  for(let i=0;i<6;i++){
    const angle = t*.4 + i*(Math.PI*2/6);
    const radius = 200+Math.sin(t*.5+i)*20;
    const px2 = Math.cos(angle)*radius;
    const pz2 = Math.sin(angle)*60;
    const py2 = Math.sin(angle*0.7)*40 - 20;
    const fp = p(px2,py2,pz2);
    const symbols=['{}','</>','[ ]','def','AI','ML','01'][i];
    ctx.save();
    ctx.globalAlpha = .25+Math.sin(t+i)*.15;
    ctx.fillStyle = alpha(1);
    ctx.font = `${Math.floor(10*fp.s)}px Share Tech Mono, monospace`;
    ctx.fillText(symbols, fp.x, fp.y);
    ctx.restore();
  }

  // outer glow ring
  const ringR = 220;
  const ringPts = 48;
  ctx.beginPath();
  for(let i=0;i<=ringPts;i++){
    const a = (i/ringPts)*Math.PI*2;
    const rx = Math.cos(a)*ringR;
    const ry2 = Math.sin(a)*ringR*0.3;
    const rz = Math.sin(a)*ringR*0.6;
    const rp = p(rx,ry2-40,rz);
    i===0 ? ctx.moveTo(rp.x,rp.y) : ctx.lineTo(rp.x,rp.y);
  }
  ctx.strokeStyle=alpha(.07);
  ctx.lineWidth=1;
  ctx.stroke();
}

function animate(){
  t += 0.016;
  drawPC(t);
  requestAnimationFrame(animate);
}
animate();

