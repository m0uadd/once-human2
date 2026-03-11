        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        // ── CURSOR ──
        const cur = document.getElementById('cur'), curf = document.getElementById('curf');
        let mx = 0, my = 0, fx = 0, fy = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx - 5 + 'px'; cur.style.top = my - 5 + 'px' });
        (function af() { fx += (mx - fx - 17) * .12; fy += (my - fy - 17) * .12; curf.style.left = fx + 'px'; curf.style.top = fy + 'px'; requestAnimationFrame(af) })();
        document.querySelectorAll('a,button,.flip-w,.btn,.btn2,.scen-card,.dev-item,.class-card').forEach(el => {
            el.addEventListener('mouseenter', () => { cur.style.transform = 'scale(2)'; curf.style.transform = 'scale(1.5)'; curf.style.borderColor = 'var(--s)' });
            el.addEventListener('mouseleave', () => { cur.style.transform = 'scale(1)'; curf.style.transform = 'scale(1)'; curf.style.borderColor = 'rgba(139,0,255,.5)' });
        });

        // ── PROGRESS + NAV ──
        window.addEventListener('scroll', () => {
            const d = document.body.scrollHeight - window.innerHeight;
            document.getElementById('pb').style.width = (window.scrollY / d * 100) + '%';
            document.getElementById('nav').classList.toggle('sc', window.scrollY > 80);
        });

        // ── PARTICLES ──
        const pc = document.getElementById('pc'), ctx = pc.getContext('2d');
        const resize = () => { pc.width = window.innerWidth; pc.height = window.innerHeight };
        resize(); window.addEventListener('resize', resize);
        const COLS = ['#8B00FF', '#00FFFF', '#00FF88'];
        class P {
            constructor() { this.r() }
            r() { this.x = Math.random() * pc.width; this.y = Math.random() * pc.height; this.vx = (Math.random() - .5) * .35; this.vy = (Math.random() - .5) * .35 - .08; this.rad = Math.random() * 1.4 + .4; this.col = COLS[Math.floor(Math.random() * 3)]; this.al = Math.random() * .55 + .1; this.li = 0; this.ml = Math.random() * 280 + 180 }
            u() { this.x += this.vx; this.y += this.vy; this.li++; if (this.li > this.ml || this.y < -10 || this.x < -10 || this.x > pc.width + 10) { this.r(); this.y = pc.height + 10 } }
            d() { ctx.save(); ctx.globalAlpha = this.al * (1 - this.li / this.ml); ctx.beginPath(); ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2); ctx.fillStyle = this.col; ctx.shadowBlur = 7; ctx.shadowColor = this.col; ctx.fill(); ctx.restore() }
        }
        const pts = Array.from({ length: 70 }, () => { const p = new P(); p.li = Math.random() * p.ml; return p });
        (function ap() { ctx.clearRect(0, 0, pc.width, pc.height); pts.forEach(p => { p.u(); p.d() }); requestAnimationFrame(ap) })();

        // ── HERO TIMELINE ──
        const tl = gsap.timeline({ delay: .3 });
        tl.to('#hey', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' })
            .to('#hh1', { opacity: 1, duration: .9, ease: 'power3.out' }, '-=.4')
            .to('#hsub', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, '-=.5')
            .to('#hctas', { opacity: 1, y: 0, duration: .8, ease: 'back.out(1.5)' }, '-=.5')
            .to('#hstats', { opacity: 1, duration: .7, ease: 'power3.out' }, '-=.3');

        // Hero parallax
        gsap.to('#hero-bg-img', { y: '20%', ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('#hc', { scale: 1.12, opacity: 0, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: '55% top', scrub: true } });

        // ── SCROLL REVEALS ──
        gsap.utils.toArray('.sec-hdr').forEach(el => {
            gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
        });
        gsap.fromTo('.flip-w', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .2, ease: 'power3.out', scrollTrigger: { trigger: '.cards', start: 'top 80%' } });
        gsap.fromTo('.scen-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: .75, stagger: .15, ease: 'power3.out', scrollTrigger: { trigger: '.scen-grid', start: 'top 78%' } });
        gsap.fromTo('.fc', { scale: .88, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: .7, stagger: { from: 'center', each: .1 }, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.fgrid', start: 'top 75%' } });
        gsap.fromTo('.class-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .15, ease: 'power3.out', scrollTrigger: { trigger: '.class-strip', start: 'top 80%' } });
        gsap.fromTo('.news-card', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '#newsgrid', start: 'top 82%' } });
        gsap.fromTo('.pbadge', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .6, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.pbadges', start: 'top 85%' } });
        gsap.to('#ft', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '#ft', start: 'top 90%' } });

        // Countdown entrance
        gsap.fromTo('.cdn', { scale: .8, opacity: 0 }, { scale: 1, opacity: 1, duration: .6, stagger: .15, ease: 'elastic.out(1,.6)', scrollTrigger: { trigger: '.cdwrap', start: 'top 80%' } });
        gsap.to('.cdn', { boxShadow: '0 0 40px rgba(139,0,255,.9),0 0 80px rgba(139,0,255,.35)', repeat: -1, yoyo: true, duration: 1.5, ease: 'sine.inOut', stagger: .3 });

        // ── TESTIMONIALS AUTO-SCROLL ──
        const tt = document.getElementById('ttrack');
        let as = 0, pau = false;
        tt.addEventListener('mouseenter', () => pau = true);
        tt.addEventListener('mouseleave', () => pau = false);
        (function st() { if (!pau) { as += .45; if (as >= tt.scrollWidth - window.innerWidth) as = 0; tt.parentElement.scrollLeft = as } requestAnimationFrame(st) })();

        // ── DEVIANTS AUTO-SCROLL ──
        const ds = document.getElementById('devstrip');
        let das = 0, dpau = false;
        ds.addEventListener('mouseenter', () => dpau = true);
        ds.addEventListener('mouseleave', () => dpau = false);
        (function sd() { if (!dpau) { das += .6; if (das >= ds.scrollWidth - ds.parentElement.clientWidth) das = 0; ds.scrollLeft = das } requestAnimationFrame(sd) })();

        // ── COUNTDOWN ──
        function upd() {
            const n = new Date(), e = new Date(n); e.setHours(23, 59, 59, 999);
            const d = e - n, h = Math.floor(d / 3600000), m = Math.floor((d % 3600000) / 60000), s = Math.floor((d % 60000) / 1000);
            document.getElementById('cdh').textContent = String(h).padStart(2, '0');
            document.getElementById('cdm').textContent = String(m).padStart(2, '0');
            document.getElementById('cds').textContent = String(s).padStart(2, '0');
            gsap.fromTo('#cds', { scale: 1.08 }, { scale: 1, duration: .25, ease: 'power2.out' });
        }
        setInterval(upd, 1000); upd();

        // ── CONFETTI ──
        const cfc = document.getElementById('cfc'), cc = cfc.getContext('2d');
        const cres = () => { cfc.width = window.innerWidth; cfc.height = window.innerHeight };
        cres(); window.addEventListener('resize', cres);
        let cps = [], ca = false;
        class CP {
            constructor(x, y) { this.x = x; this.y = y; this.vx = (Math.random() - .5) * 11; this.vy = Math.random() * -13 - 4; this.g = .26; this.col = COLS[Math.floor(Math.random() * 3)]; this.sz = Math.random() * 8 + 4; this.ro = Math.random() * Math.PI * 2; this.rs = (Math.random() - .5) * .2; this.al = 1; this.li = 0; this.ml = 85 }
            u() { this.x += this.vx; this.y += this.vy; this.vy += this.g; this.ro += this.rs; this.li++; this.al = 1 - this.li / this.ml }
            d() { cc.save(); cc.globalAlpha = this.al; cc.translate(this.x, this.y); cc.rotate(this.ro); cc.fillStyle = this.col; cc.shadowBlur = 5; cc.shadowColor = this.col; cc.fillRect(-this.sz / 2, -this.sz / 4, this.sz, this.sz / 2); cc.restore() }
        }
        function spawnC(x, y, n) { for (let i = 0; i < n; i++)cps.push(new CP(x, y)) }
        function animC() { if (!ca && cps.length === 0) return; cc.clearRect(0, 0, cfc.width, cfc.height); cps = cps.filter(p => p.li < p.ml); cps.forEach(p => { p.u(); p.d() }); cfc.style.display = cps.length > 0 ? 'block' : 'none'; requestAnimationFrame(animC) }
        document.getElementById('mcta').addEventListener('mouseenter', e => {
            cfc.style.display = 'block'; ca = true; const r = e.target.getBoundingClientRect(); spawnC(r.left + r.width / 2, r.top, 35); animC(); ca = false;
        });

        // ── EXIT POPUP ──
        let es = false;
        document.addEventListener('mouseleave', e => { if (e.clientY <= 0 && !es) { es = true; document.getElementById('epop').classList.add('on'); gsap.fromTo('.ecnt', { scale: .8, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, ease: 'back.out(1.5)' }) } });
        function cep() { gsap.to('.ecnt', { scale: .8, opacity: 0, duration: .3, onComplete: () => document.getElementById('epop').classList.remove('on') }) }
        document.getElementById('ecls').addEventListener('click', cep);
        document.getElementById('edecl').addEventListener('click', e => { e.preventDefault(); cep() });
        document.querySelector('.eov').addEventListener('click', cep);

        // ── SMOOTH SCROLL ──
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const h = a.getAttribute('href'); if (h === '#') return;
                e.preventDefault(); const t = document.querySelector(h);
                if (t) gsap.to(window, { scrollTo: { y: t, offsetY: 80 }, duration: 1.2, ease: 'power3.inOut' });
            });
        });

        console.log('%cONCE HUMAN V3 — Landing Page avec Images Officielles ⚡', 'color:#8B00FF;font-size:15px;font-family:monospace;font-weight:bold');
