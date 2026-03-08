/* ══════════════════════════════════════════
   Alex & Samira — Our Love Story
   script.js
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ────────────────────────
     1. CUSTOM CURSOR
  ──────────────────────── */
  var cursor      = document.getElementById('cursor');
  var cursorTrail = document.getElementById('cursor-trail');
  var trailX = 0, trailY = 0, curX = 0, curY = 0;

  document.addEventListener('mousemove', function (e) {
    curX = e.clientX; curY = e.clientY;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
  });

  // Smooth trail
  function animateTrail() {
    trailX += (curX - trailX) * 0.14;
    trailY += (curY - trailY) * 0.14;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();


  /* ────────────────────────
     2. FLOATING HEART CANVAS
  ──────────────────────── */
  (function initCanvas() {
    var canvas = document.getElementById('heartCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function heartPath(ctx, x, y, size) {
      ctx.beginPath();
      ctx.moveTo(x, y + size * 0.3);
      ctx.bezierCurveTo(x, y, x - size * 0.5, y, x - size * 0.5, y + size * 0.3);
      ctx.bezierCurveTo(x - size * 0.5, y + size * 0.65, x, y + size * 0.9, x, y + size);
      ctx.bezierCurveTo(x, y + size * 0.9, x + size * 0.5, y + size * 0.65, x + size * 0.5, y + size * 0.3);
      ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.3);
      ctx.closePath();
    }

    var colors = ['#ff4d6d', '#ff85a1', '#ffb3c1', '#c77dff', '#ffca3a', '#a0c4ff'];

    for (var i = 0; i < 22; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight + window.innerHeight,
        size: 4 + Math.random() * 10,
        speedY: -(0.3 + Math.random() * 0.7),
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: 0.1 + Math.random() * 0.35,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        heartPath(ctx, -p.size / 2, -p.size / 2, p.size);
        ctx.fill();
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -30) {
          p.y = canvas.height + 30;
          p.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  })();


  /* ────────────────────────
     3. FLOATING EMOJIS (hero)
  ──────────────────────── */
  (function initFloatEmojis() {
    var container = document.getElementById('floatEmojis');
    if (!container) return;
    var emojis = ['💕','🌸','✨','💫','🌺','💖','🌷','💝','🌟','💓'];
    for (var i = 0; i < 15; i++) {
      var el = document.createElement('div');
      el.className = 'float-em';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = [
        'left:' + (Math.random() * 100) + '%',
        'animation-duration:' + (8 + Math.random() * 14) + 's',
        'animation-delay:' + (Math.random() * 16) + 's',
        'font-size:' + (0.9 + Math.random() * 1.2) + 'rem'
      ].join(';');
      container.appendChild(el);
    }
  })();


  /* ────────────────────────
     4. SCROLL TO STORY
  ──────────────────────── */
  var heroScroll = document.getElementById('heroScroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', function () {
      var target = document.getElementById('counter-section');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }


  /* ────────────────────────
     5. LOVE COUNTER (live)
  ──────────────────────── */
  // Set the exact start date of the relationship
  var startDate = new Date('2021-03-15T00:00:00');

  function updateCounter() {
    var now  = new Date();
    var diff = now - startDate; // ms

    var totalSeconds = Math.floor(diff / 1000);
    var totalMinutes = Math.floor(totalSeconds / 60);
    var totalHours   = Math.floor(totalMinutes / 60);
    var totalDays    = Math.floor(totalHours / 24);
    var totalMonths  = Math.floor(totalDays / 30.4375);
    var totalYears   = Math.floor(totalDays / 365.25);

    var el = {
      years:      document.getElementById('cYears'),
      months:     document.getElementById('cMonths'),
      days:       document.getElementById('cDays'),
      hours:      document.getElementById('cHours'),
      heartbeats: document.getElementById('cHeartbeats')
    };

    if (el.years)      el.years.textContent      = totalYears;
    if (el.months)     el.months.textContent     = totalMonths % 12;
    if (el.days)       el.days.textContent       = totalDays % 365;
    if (el.hours)      el.hours.textContent      = totalHours % 24;
    // Average heartbeats: ~70 per minute
    if (el.heartbeats) el.heartbeats.textContent = '♡';
  }

  updateCounter();
  setInterval(updateCounter, 1000);


  /* ────────────────────────
     6. SCROLL REVEAL
  ──────────────────────── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObs.observe(el);
  });


  /* ────────────────────────
     7. PHOTO WALL LIGHTBOX
  ──────────────────────── */
  var lb       = document.getElementById('lb');
  var lbImg    = document.getElementById('lbImg');
  var lbCap    = document.getElementById('lbCap');
  var lbClose  = document.getElementById('lbClose');
  var lbPrev   = document.getElementById('lbPrev');
  var lbNext   = document.getElementById('lbNext');
  var pwItems  = Array.from(document.querySelectorAll('.pw-item'));
  var lbIndex  = 0;

  function openLb(idx) {
    lbIndex = idx;
    showLb(lbIndex);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { lbImg.src = ''; }, 400);
  }
  function showLb(idx) {
    var item = pwItems[idx];
    if (!item) return;
    var src = item.getAttribute('data-src') || item.querySelector('img').src;
    var cap = item.getAttribute('data-caption') || '';
    lbImg.style.opacity = '0';
    lbImg.src = src;
    lbImg.onload = function () {
      lbImg.style.transition = 'opacity .3s';
      lbImg.style.opacity = '1';
    };
    lbCap.textContent = cap;
  }

  pwItems.forEach(function (item, i) {
    item.addEventListener('click', function () { openLb(i); });
  });
  lbClose.addEventListener('click', closeLb);
  lbPrev.addEventListener('click', function () {
    lbIndex = (lbIndex - 1 + pwItems.length) % pwItems.length;
    showLb(lbIndex);
  });
  lbNext.addEventListener('click', function () {
    lbIndex = (lbIndex + 1) % pwItems.length;
    showLb(lbIndex);
  });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLb();
    if (e.key === 'ArrowLeft')   { lbIndex = (lbIndex - 1 + pwItems.length) % pwItems.length; showLb(lbIndex); }
    if (e.key === 'ArrowRight')  { lbIndex = (lbIndex + 1) % pwItems.length; showLb(lbIndex); }
  });

  // Swipe
  var swipeX = 0;
  lb.addEventListener('touchstart', function (e) { swipeX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - swipeX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) { lbIndex = (lbIndex + 1) % pwItems.length; }
      else        { lbIndex = (lbIndex - 1 + pwItems.length) % pwItems.length; }
      showLb(lbIndex);
    }
  }, { passive: true });


  /* ────────────────────────
     8. TYPEWRITER LOVE LETTER
  ──────────────────────── */
  var letterText = [
    "Every morning I wake up grateful — grateful that of all the people in this world, I somehow ended up next to you.",
    "\n\nYou are the calm in my chaos, the laughter in my quiet moments, and the home I never knew I was looking for.",
    "\n\nThank you for every small thing — the way you say my name, the warmth of your hand in mine, the way you look at me like I am something worth looking at.",
    "\n\nI don't know what the future holds, but I know this: wherever it takes us, I want it to be with you.",
    "\n\nAll my love, all my days, all of me — forever yours."
  ].join('');

  var letterBody  = document.getElementById('letterBody');
  var letterObs   = null;
  var letterTyped = false;

  if (letterBody) {
    letterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !letterTyped) {
          letterTyped = true;
          typeWriter(letterText, letterBody, 0, 28);
          letterObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    letterObs.observe(letterBody);
  }

  function typeWriter(text, el, i, speed) {
    if (i === 0) {
      el.innerHTML = '<span class="letter-cursor"></span>';
    }
    if (i < text.length) {
      var ch = text.charAt(i);
      var cursor = el.querySelector('.letter-cursor');
      if (cursor) {
        var node = document.createTextNode(ch === '\n' ? '' : ch);
        if (ch === '\n') {
          el.insertBefore(document.createElement('br'), cursor);
        } else {
          el.insertBefore(node, cursor);
        }
      }
      setTimeout(function () { typeWriter(text, el, i + 1, speed); }, speed + Math.random() * 20);
    }
  }


  /* ────────────────────────
     9. LOVE NOTES (flip)
  ──────────────────────── */
  document.querySelectorAll('.note-envelope').forEach(function (note) {
    var msg = note.getAttribute('data-msg') || '';
    var back = note.querySelector('.note-back p');
    if (back) back.textContent = msg;

    note.addEventListener('click', function () {
      note.classList.toggle('flipped');
    });
  });


  /* ────────────────────────
     10. MUSIC PLAYER (visual)
  ──────────────────────── */
  var musicPlaying = false;
  var musicBar     = document.getElementById('musicBar');
  var musicIcon    = document.getElementById('musicIcon');
  var musicVinyl   = document.getElementById('musicVinyl');
  var progress     = 0;
  var progressInt  = null;

  // Optional: set a real audio file path here
  var audioSrc = null; // e.g. 'perfect.mp3'
  var audio    = audioSrc ? new Audio(audioSrc) : null;

  window.toggleMusic = function () {
    musicPlaying = !musicPlaying;

    if (musicIcon)  musicIcon.textContent = musicPlaying ? '⏸' : '▶';
    if (musicVinyl) musicVinyl.classList.toggle('spinning', musicPlaying);

    if (audio) {
      if (musicPlaying) audio.play().catch(function () {});
      else audio.pause();
    }

    if (musicPlaying) {
      progressInt = setInterval(function () {
        if (audio) {
          progress = audio.currentTime / (audio.duration || 1) * 100;
        } else {
          progress = (progress + 0.3) % 100;
        }
        if (musicBar) musicBar.style.width = progress + '%';
      }, 300);
    } else {
      clearInterval(progressInt);
    }
  };


  /* ────────────────────────
     11. WISH / MESSAGE BOARD
  ──────────────────────── */
  var preloadedWishes = [
    { name: 'Sarah',    msg: 'You two are the most beautiful love story I have ever witnessed 💕' },
    { name: 'Michael',  msg: 'May your love grow stronger with every sunrise ✨' },
    { name: 'Layla',    msg: 'My favourite couple in the entire universe 🌍💖' },
    { name: 'Omar',     msg: 'You make each other better. That\'s real love 🌸' }
  ];

  var wbWall = document.getElementById('wbWall');

  function addNote(name, msg, prepend) {
    if (!wbWall) return;
    var div = document.createElement('div');
    div.className = 'wb-note';
    div.innerHTML =
      '<div class="wb-note-name">' + escapeHtml(name) + '</div>' +
      '<div class="wb-note-msg">' + escapeHtml(msg) + '</div>';
    if (prepend) {
      wbWall.insertBefore(div, wbWall.firstChild);
    } else {
      wbWall.appendChild(div);
    }
  }

  preloadedWishes.forEach(function (w) { addNote(w.name, w.msg, false); });

  window.submitWish = function () {
    var nameEl = document.getElementById('wbName');
    var msgEl  = document.getElementById('wbMsg');
    var name   = (nameEl ? nameEl.value.trim() : '') || 'Anonymous';
    var msg    = msgEl ? msgEl.value.trim() : '';
    if (!msg) { msgEl && msgEl.focus(); return; }

    addNote(name, msg, true);
    if (nameEl) nameEl.value = '';
    if (msgEl)  msgEl.value  = '';

    // Burst hearts from submit button
    burstHearts();
  };

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }


  /* ────────────────────────
     12. HEART BURST on submit
  ──────────────────────── */
  function burstHearts() {
    var btn = document.querySelector('.wb-submit');
    if (!btn) return;
    var rect = btn.getBoundingClientRect();
    var cx   = rect.left + rect.width / 2;
    var cy   = rect.top  + rect.height / 2;

    for (var i = 0; i < 12; i++) {
      var h = document.createElement('div');
      h.style.cssText = [
        'position:fixed',
        'left:' + cx + 'px',
        'top:' + cy + 'px',
        'font-size:' + (1 + Math.random()) + 'rem',
        'pointer-events:none',
        'z-index:9999',
        'animation:none',
        'transform:translate(-50%,-50%)',
        'transition:all .8s ease-out',
        'opacity:1'
      ].join(';');
      h.textContent = ['💕','🌸','✨','💖','💫'][Math.floor(Math.random() * 5)];
      document.body.appendChild(h);

      var angle  = (Math.random() * Math.PI * 2);
      var dist   = 60 + Math.random() * 80;
      var tx     = Math.cos(angle) * dist;
      var ty     = Math.sin(angle) * dist - 40;

      requestAnimationFrame(function (elem, dx, dy) {
        return function () {
          requestAnimationFrame(function () {
            elem.style.transform    = 'translate(calc(-50% + ' + dx + 'px), calc(-50% + ' + dy + 'px))';
            elem.style.opacity      = '0';
            elem.style.fontSize     = '0.2rem';
            elem.style.transition   = 'all .9s ease-out';
          });
        };
      }(h, tx, ty));

      setTimeout(function (elem) {
        return function () { document.body.removeChild(elem); };
      }(h), 1000);
    }
  }


  /* ────────────────────────
     13. FOOTER CANVAS (hearts)
  ──────────────────────── */
  (function initFooterCanvas() {
    var canvas = document.getElementById('footerCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var pts = [];

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (var i = 0; i < 30; i++) {
      pts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 2 + Math.random() * 5,
        speed: 0.2 + Math.random() * 0.5,
        op: 0.1 + Math.random() * 0.3
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,133,161,' + p.op + ')';
        ctx.fill();
        p.y -= p.speed;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

}); // end DOMContentLoaded
