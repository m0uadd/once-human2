// ════════════════════════════════════════════
        // Wait for GSAP (deferred) before using it
        // ════════════════════════════════════════════
        function initGSAP() {
            if (typeof gsap === 'undefined') { setTimeout(initGSAP, 100); return }
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

            // HERO TL
            const tl = gsap.timeline({ delay: .2 });
            tl.to('#hbr', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' })
                .to('#hey', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.3')
                .to('#hh1', { opacity: 1, duration: .9, ease: 'power3.out' }, '-=.4')
                .to('#hsub', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, '-=.5')
                .to('#hctas', { opacity: 1, y: 0, duration: .7, ease: 'back.out(1.5)' }, '-=.5')
                .to('#htrust', { opacity: 1, duration: .6, ease: 'power3.out' }, '-=.4')
                .to('#hstats', { opacity: 1, duration: .6, ease: 'power3.out' }, '-=.3');

            // Hero parallax
            gsap.to('#hero-bg-img', { y: '18%', ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
            gsap.to('#hc', { scale: 1.1, opacity: 0, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: '50% top', scrub: true } });

            // Reveals
            gsap.utils.toArray('.sec-hdr').forEach(el => {
                gsap.fromTo(el, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%' } })
            });
            gsap.fromTo('.flip-w', { y: 55, opacity: 0 }, { y: 0, opacity: 1, duration: .75, stagger: .18, ease: 'power3.out', scrollTrigger: { trigger: '.cards', start: 'top 80%' } });
            gsap.fromTo('.scen-card', { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .13, ease: 'power3.out', scrollTrigger: { trigger: '.scen-grid', start: 'top 78%' } });
            gsap.fromTo('.fc', { scale: .88, opacity: 0, y: 26 }, { scale: 1, opacity: 1, y: 0, duration: .65, stagger: { from: 'center', each: .1 }, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.fgrid', start: 'top 76%' } });
            gsap.fromTo('.class-card', { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: .14, ease: 'power3.out', scrollTrigger: { trigger: '.class-strip', start: 'top 80%' } });
            gsap.fromTo('.news-card', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .6, stagger: .11, ease: 'power3.out', scrollTrigger: { trigger: '#newsgrid', start: 'top 82%' } });
            gsap.fromTo('.pbadge', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .55, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: '.pbadges', start: 'top 85%' } });
            gsap.fromTo('.step', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: .18, ease: 'power3.out', scrollTrigger: { trigger: '#steps-row', start: 'top 82%' } });
            gsap.fromTo('.faq-item', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '#faq-list', start: 'top 85%' } });
            gsap.to('#ft', { opacity: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '#ft', start: 'top 90%' } });

            // Countdown entrance + pulse
            gsap.fromTo('.cdn', { scale: .8, opacity: 0 }, { scale: 1, opacity: 1, duration: .6, stagger: .14, ease: 'elastic.out(1,.6)', scrollTrigger: { trigger: '.cdwrap', start: 'top 82%' } });
            gsap.to('.cdn', { boxShadow: '0 0 38px rgba(139,0,255,.9),0 0 70px rgba(139,0,255,.3)', repeat: -1, yoyo: true, duration: 1.4, ease: 'sine.inOut', stagger: .28 });
        }
        initGSAP();

        // ════ CURSOR ════
        const cur = document.getElementById('cur'), curf = document.getElementById('curf');
        if (window.matchMedia('(pointer:fine)').matches) {
            let mx = 0, my = 0, fx = 0, fy = 0;
            document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx - 5 + 'px'; cur.style.top = my - 5 + 'px' });
            (function af() { fx += (mx - fx - 17) * .12; fy += (my - fy - 17) * .12; curf.style.left = fx + 'px'; curf.style.top = fy + 'px'; requestAnimationFrame(af) })();
            document.querySelectorAll('a,button,.flip-w,.btn,.btn2,.scen-card,.dev-item,.class-card,.faq-q').forEach(el => {
                el.addEventListener('mouseenter', () => { cur.style.transform = 'scale(2.2)'; curf.style.transform = 'scale(1.5)'; curf.style.borderColor = 'var(--s)' });
                el.addEventListener('mouseleave', () => { cur.style.transform = 'scale(1)'; curf.style.transform = 'scale(1)'; curf.style.borderColor = 'rgba(139,0,255,.5)' });
            });
        }

        // ════ PROGRESS + NAV + STICKY CTA ════
        const stickyBar = document.getElementById('sticky-cta');
        let stkyVisible = false;
        window.addEventListener('scroll', () => {
            const sy = window.scrollY, dh = document.body.scrollHeight - window.innerHeight;
            document.getElementById('pb').style.width = (sy / dh * 100) + '%';
            document.getElementById('nav').classList.toggle('sc', sy > 80);
            // show sticky after scrolling past hero
            const heroH = document.getElementById('hero').offsetHeight;
            const shouldShow = sy > heroH * .6;
            if (shouldShow !== stkyVisible) { stkyVisible = shouldShow; stickyBar.classList.toggle('visible', shouldShow) }
        });

        // ════ PARTICLES — requestIdleCallback for perf ════
        function initParticles() {
            const pc = document.getElementById('pc'), ctx = pc.getContext('2d');
            const rs = () => { pc.width = window.innerWidth; pc.height = window.innerHeight };
            rs(); window.addEventListener('resize', rs);
            const C = ['#8B00FF', '#00FFFF', '#00FF88'];
            class P {
                constructor() { this.r() }
                r() { this.x = Math.random() * pc.width; this.y = Math.random() * pc.height; this.vx = (Math.random() - .5) * .32; this.vy = (Math.random() - .5) * .32 - .07; this.rad = Math.random() * 1.3 + .4; this.col = C[~~(Math.random() * 3)]; this.al = Math.random() * .5 + .1; this.li = 0; this.ml = Math.random() * 260 + 180 }
                u() { this.x += this.vx; this.y += this.vy; this.li++; if (this.li > this.ml || this.y < -10 || this.x < -10 || this.x > pc.width + 10) { this.r(); this.y = pc.height + 10 } }
                d() { ctx.save(); ctx.globalAlpha = this.al * (1 - this.li / this.ml); ctx.beginPath(); ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2); ctx.fillStyle = this.col; ctx.shadowBlur = 6; ctx.shadowColor = this.col; ctx.fill(); ctx.restore() }
            }
            const pts = Array.from({ length: 65 }, () => { const p = new P(); p.li = Math.random() * p.ml; return p });
            let raf;
            (function ap() { ctx.clearRect(0, 0, pc.width, pc.height); pts.forEach(p => { p.u(); p.d() }); raf = requestAnimationFrame(ap) })();
            // pause when tab hidden
            document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else { (function ap() { ctx.clearRect(0, 0, pc.width, pc.height); pts.forEach(p => { p.u(); p.d() }); raf = requestAnimationFrame(ap) })() } });
        }
        if ('requestIdleCallback' in window) requestIdleCallback(initParticles, { timeout: 2000 });
        else setTimeout(initParticles, 500);

        // ════ TESTIMONIALS AUTO-SCROLL ════
        const tt = document.getElementById('ttrack');
        let as = 0, pau = false;
        tt.addEventListener('mouseenter', () => pau = true); tt.addEventListener('mouseleave', () => pau = false);
        (function st() { if (!pau) { as += .42; if (as >= tt.scrollWidth - window.innerWidth) as = 0; tt.parentElement.scrollLeft = as } requestAnimationFrame(st) })();

        // ════ DEVIANTS AUTO-SCROLL ════
        const ds = document.getElementById('devstrip');
        let das = 0, dpau = false;
        ds.addEventListener('mouseenter', () => dpau = true); ds.addEventListener('mouseleave', () => dpau = false);
        (function sd() { if (!dpau) { das += .55; if (das >= ds.scrollWidth - ds.parentElement.clientWidth) das = 0; ds.scrollLeft = das } requestAnimationFrame(sd) })();
        // ════ COUNTDOWN ════
        function upd() {
            const n = new Date(), e = new Date(n); e.setHours(23, 59, 59, 999);
            const d = e - n, h = ~~(d / 3600000), m = ~~((d % 3600000) / 60000), s = ~~((d % 60000) / 1000);
            const hs = String(h).padStart(2, '0'), ms = String(m).padStart(2, '0'), ss = String(s).padStart(2, '0');
            document.getElementById('cdh').textContent = hs;
            document.getElementById('cdm').textContent = ms;
            document.getElementById('cds').textContent = ss;
            document.getElementById('sticky-timer').textContent = hs + ':' + ms + ':' + ss;
            if (typeof gsap !== 'undefined') gsap.fromTo('#cds', { scale: 1.07 }, { scale: 1, duration: .22, ease: 'power2.out' });
        }
        setInterval(upd, 1000); upd();

        // ════ CONFETTI ════
        const cfc = document.getElementById('cfc'), cc = cfc.getContext('2d');
        const cr = () => { cfc.width = window.innerWidth; cfc.height = window.innerHeight };
        cr(); window.addEventListener('resize', cr);
        const CV = ['#8B00FF', '#00FFFF', '#00FF88'];
        let cps = [], ca = false;
        class CP {
            constructor(x, y) { this.x = x; this.y = y; this.vx = (Math.random() - .5) * 10; this.vy = Math.random() * -12 - 4; this.g = .24; this.col = CV[~~(Math.random() * 3)]; this.sz = Math.random() * 7 + 4; this.ro = Math.random() * Math.PI * 2; this.rs = (Math.random() - .5) * .18; this.al = 1; this.li = 0; this.ml = 80 }
            u() { this.x += this.vx; this.y += this.vy; this.vy += this.g; this.ro += this.rs; this.li++; this.al = 1 - this.li / this.ml }
            d() { cc.save(); cc.globalAlpha = this.al; cc.translate(this.x, this.y); cc.rotate(this.ro); cc.fillStyle = this.col; cc.shadowBlur = 4; cc.shadowColor = this.col; cc.fillRect(-this.sz / 2, -this.sz / 4, this.sz, this.sz / 2); cc.restore() }
        }
        function spawnC(x, y, n) { for (let i = 0; i < n; i++)cps.push(new CP(x, y)) }
        function animC() { if (!ca && cps.length === 0) return; cc.clearRect(0, 0, cfc.width, cfc.height); cps = cps.filter(p => p.li < p.ml); cps.forEach(p => { p.u(); p.d() }); cfc.style.display = cps.length > 0 ? 'block' : 'none'; requestAnimationFrame(animC) }
        document.getElementById('mcta').addEventListener('mouseenter', e => {
            cfc.style.display = 'block'; ca = true; const r = e.target.getBoundingClientRect(); spawnC(r.left + r.width / 2, r.top, 32); animC(); ca = false;
        });

        // ════ FAQ ACCORDION ════
        document.querySelectorAll('.faq-q').forEach(q => {
            q.addEventListener('click', () => {
                const item = q.parentElement;
                const wasOpen = item.classList.contains('open');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
                if (!wasOpen) item.classList.add('open');
            });
        });

        // ════ EXIT POPUP ════
        let es = false;
        document.addEventListener('mouseleave', e => {
            if (e.clientY <= 0 && !es) {
                es = true;
                document.getElementById('epop').classList.add('on');
                if (typeof gsap !== 'undefined') gsap.fromTo('.ecnt', { scale: .8, opacity: 0 }, { scale: 1, opacity: 1, duration: .45, ease: 'back.out(1.5)' });
            }
        });
        function cep() {
            if (typeof gsap !== 'undefined') gsap.to('.ecnt', { scale: .8, opacity: 0, duration: .28, onComplete: () => document.getElementById('epop').classList.remove('on') });
            else document.getElementById('epop').classList.remove('on');
        }
        document.getElementById('ecls').addEventListener('click', cep);
        document.getElementById('edecl').addEventListener('click', e => { e.preventDefault(); cep() });
        document.querySelector('.eov').addEventListener('click', cep);

        // ════ SMOOTH SCROLL ════
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const h = a.getAttribute('href'); if (h === '#') return;
                e.preventDefault(); const t = document.querySelector(h);
                if (t) {
                    if (typeof gsap !== 'undefined') gsap.to(window, { scrollTo: { y: t, offsetY: 80 }, duration: 1.1, ease: 'power3.inOut' });
                    else t.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });