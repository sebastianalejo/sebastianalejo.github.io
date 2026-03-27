    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (cursor && ring) {
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
      function animateCursor() {
        cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
        rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
        requestAnimationFrame(animateCursor);
      }
      animateCursor();
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; });
        el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
      });
    }

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => { if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60); }, { passive: true });

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    const cinematicTargets = document.querySelectorAll('.project-card, .stat-card, .timeline-item, .cert-item, .social-card');
    cinematicTargets.forEach((el, index) => {
      el.classList.add('cinematic-reveal');
      if (!prefersReducedMotion) {
        el.style.transitionDelay = `${(index % 6) * 55}ms`;
      }
    });

    const cinematicObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          cinematicObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    cinematicTargets.forEach(el => cinematicObserver.observe(el));

    const hero = document.querySelector('.hero');
    if (hero && !prefersReducedMotion) {
      let ticking = false;
      const updateHeroProgress = () => {
        const heroHeight = Math.max(hero.offsetHeight, window.innerHeight);
        const progress = Math.min(Math.max(window.scrollY / (heroHeight * 0.92), 0), 1);
        document.documentElement.style.setProperty('--hero-progress', progress.toFixed(3));
        ticking = false;
      };

      updateHeroProgress();
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(updateHeroProgress);
          ticking = true;
        }
      }, { passive: true });
      window.addEventListener('resize', updateHeroProgress);
    }

    const projectCardsByYear = {
      es: {
        '2026': [
          {
            title: 'E-commerce de Perfumes Arabes Premium para Alto Aroma Studio',
            date: '2026 - Presente',
            client: 'Alto Aroma Studio',
            desc: 'Desarrollo de una tienda online enfocada en la venta de perfumes arabes premium de lujo, implementada con WordPress y WooCommerce, con Cloudflare para seguridad y rendimiento, y Azure como infraestructura en la nube.',
            results: [['Tiempo ahorrado', '~30%'], ['Volumen procesado', '300+ pedidos/mes'], ['Impacto en usuarios', '1.2k+ clientes'], ['Reduccion de errores', '-35%']],
            tools: ['WordPress', 'WooCommerce', 'Cloudflare', 'Azure'],
            link: 'https://www.altoaroma.studio',
            linkText: 'Ver proyecto'
          },
          {
            title: 'Software para la generacion de cuponeras 2026 (Tributos Municipales)',
            date: 'Feb 2026',
            client: 'Municipalidad de Independencia',
            desc: 'Sistema automatizado para la generacion masiva de cartillas de arbitrios 2026 personalizadas, procesando datos de ciudadanos y produciendo documentos PDF listos para imprimir a gran escala.',
            results: [['Tiempo ahorrado', '~70%'], ['Volumen procesado', '50k+ cartillas'], ['Impacto en usuarios', '45k+ contribuyentes'], ['Reduccion de errores', '-60%']],
            tools: ['Python', 'ReportLab', 'SQL', 'Automatizacion']
          },
          {
            title: 'Software para la generacion de cuponeras 2026 (Tributos Municipales)',
            date: 'Ene 2026',
            client: 'Municipalidad de Puente Piedra',
            desc: 'Sistema automatizado para la generacion masiva de cartillas de arbitrios 2026 personalizadas, adaptado al contexto operativo municipal de Puente Piedra con alta precision documental.',
            results: [['Tiempo ahorrado', '~65%'], ['Volumen procesado', '40k+ cartillas'], ['Impacto en usuarios', '36k+ contribuyentes'], ['Reduccion de errores', '-55%']],
            tools: ['Python', 'ReportLab', 'SQL', 'Automatizacion']
          }
        ],
        '2025': [
          {
            title: 'Sistema Automatizado de Certificacion Academica',
            date: 'Jun 2025',
            client: 'Consultoria en Laboratorio S.A.C. (ICL)',
            desc: 'Sistema integral para generar y emitir certificados academicos personalizados con codigos QR para verificacion, reemplazando un proceso completamente manual.',
            results: [['Tiempo ahorrado', '~80%'], ['Volumen procesado', '8k+ certificados'], ['Impacto en usuarios', '2k+ estudiantes'], ['Reduccion de errores', '-75%']],
            tools: ['Python', 'Codigos QR', 'Generacion PDF', 'Automatizacion']
          },
          {
            title: 'Software para la generacion de cuponeras 2025 (Tributos Municipales)',
            date: 'Feb 2025',
            client: 'Municipalidad de Independencia',
            desc: 'Implementacion del sistema de automatizacion de cartillas para Independencia, consolidando el pipeline de generacion que luego se optimizo para la edicion 2026.',
            results: [['Tiempo ahorrado', '~55%'], ['Volumen procesado', '35k+ cartillas'], ['Impacto en usuarios', '30k+ contribuyentes'], ['Reduccion de errores', '-48%']],
            tools: ['Python', 'ReportLab', 'SQL']
          },
          {
            title: 'Software para la generacion de cuponeras 2025 (Tributos Municipales)',
            date: 'Ene 2025',
            client: 'Municipalidad de Puente Piedra',
            desc: 'Implementacion del sistema de automatizacion de cartillas para Puente Piedra, ajustando el pipeline de generacion a sus datos y requerimientos operativos municipales.',
            results: [['Tiempo ahorrado', '~52%'], ['Volumen procesado', '28k+ cartillas'], ['Impacto en usuarios', '24k+ contribuyentes'], ['Reduccion de errores', '-45%']],
            tools: ['Python', 'ReportLab', 'SQL']
          }
        ],
        '2024': [
          {
            title: 'Sistema de Identificacion QR para Mototaxis',
            date: 'Dic 2024',
            client: 'Municipalidad de Carabayllo',
            desc: 'Plataforma de identificacion digital para unidades de mototaxi registradas mediante codigos QR, permitiendo verificacion rapida por funcionarios municipales en campo.',
            results: [['Tiempo ahorrado', '~40%'], ['Volumen procesado', '3k+ unidades'], ['Impacto en usuarios', '300+ fiscalizadores'], ['Reduccion de errores', '-38%']],
            tools: ['Python', 'Codigos QR', 'Base de Datos']
          }
        ],
        '2021': [
          {
            title: 'Portafolio Personal',
            date: '2021 - Presente',
            client: 'sebastianalejo.github.io',
            desc: 'Sitio web personal para mostrar proyectos, habilidades y experiencia profesional. Construido con HTML, CSS y JavaScript.',
            results: [['Tiempo ahorrado', '~35%'], ['Volumen procesado', '100+ visitas/mes'], ['Impacto en usuarios', 'Reclutadores y clientes'], ['Reduccion de errores', '-30%']],
            tools: ['HTML', 'CSS', 'JavaScript']
          }
        ]
      },
      en: {
        '2026': [
          {
            title: 'Luxury Premium Arabic Perfume E-commerce for Alto Aroma Studio',
            date: '2026 - Present',
            client: 'Alto Aroma Studio',
            desc: 'Development of an online store focused on selling luxury premium Arabic perfumes, built with WordPress and WooCommerce, secured and accelerated with Cloudflare, and hosted on Azure cloud infrastructure.',
            results: [['Time saved', '~30%'], ['Processed volume', '300+ orders/month'], ['User impact', '1.2k+ customers'], ['Error reduction', '-35%']],
            tools: ['WordPress', 'WooCommerce', 'Cloudflare', 'Azure'],
            link: 'https://www.altoaroma.studio',
            linkText: 'View project'
          },
          {
            title: 'Municipal Tax Booklet Generator 2026',
            date: 'Feb 2026',
            client: 'Municipality of Independencia',
            desc: 'Automated system for mass generation of personalized 2026 municipal tax booklets, processing citizen data and producing print-ready PDF documents at scale.',
            results: [['Time saved', '~70%'], ['Processed volume', '50k+ booklets'], ['User impact', '45k+ taxpayers'], ['Error reduction', '-60%']],
            tools: ['Python', 'ReportLab', 'SQL', 'Automation']
          },
          {
            title: 'Municipal Tax Booklet Generator 2026',
            date: 'Jan 2026',
            client: 'Municipality of Puente Piedra',
            desc: 'Automated system for mass generation of personalized 2026 municipal tax booklets, adapted to Puente Piedra\'s municipal operational context with high document accuracy.',
            results: [['Time saved', '~65%'], ['Processed volume', '40k+ booklets'], ['User impact', '36k+ taxpayers'], ['Error reduction', '-55%']],
            tools: ['Python', 'ReportLab', 'SQL', 'Automation']
          }
        ],
        '2025': [
          {
            title: 'Automated Academic Certification System',
            date: 'Jun 2025',
            client: 'Consultoria en Laboratorio S.A.C. (ICL)',
            desc: 'End-to-end system to generate and issue personalized academic certificates with QR codes for verification, replacing a fully manual process.',
            results: [['Time saved', '~80%'], ['Processed volume', '8k+ certificates'], ['User impact', '2k+ students'], ['Error reduction', '-75%']],
            tools: ['Python', 'QR Codes', 'PDF Generation', 'Automation']
          },
          {
            title: 'Municipal Tax Booklet Generator 2025',
            date: 'Feb 2025',
            client: 'Municipality of Independencia',
            desc: 'Implementation of the tax booklet automation system for Independencia, consolidating the generation pipeline later optimized for the 2026 edition.',
            results: [['Time saved', '~55%'], ['Processed volume', '35k+ booklets'], ['User impact', '30k+ taxpayers'], ['Error reduction', '-48%']],
            tools: ['Python', 'ReportLab', 'SQL']
          },
          {
            title: 'Municipal Tax Booklet Generator 2025',
            date: 'Jan 2025',
            client: 'Municipality of Puente Piedra',
            desc: 'Implementation of the tax booklet automation system for Puente Piedra, tailoring the generation pipeline to its municipal data and operational requirements.',
            results: [['Time saved', '~52%'], ['Processed volume', '28k+ booklets'], ['User impact', '24k+ taxpayers'], ['Error reduction', '-45%']],
            tools: ['Python', 'ReportLab', 'SQL']
          }
        ],
        '2024': [
          {
            title: 'QR Identification System for Mototaxis',
            date: 'Dec 2024',
            client: 'Municipality of Carabayllo',
            desc: 'Digital identification platform for registered mototaxi units using QR codes, enabling quick verification by municipal officers in the field.',
            results: [['Time saved', '~40%'], ['Processed volume', '3k+ units'], ['User impact', '300+ officers'], ['Error reduction', '-38%']],
            tools: ['Python', 'QR Codes', 'Database']
          }
        ],
        '2021': [
          {
            title: 'Personal Portfolio',
            date: '2021 - Present',
            client: 'sebastianalejo.github.io',
            desc: 'Personal website to showcase projects, skills, and professional experience. Built with HTML, CSS, and JavaScript.',
            results: [['Time saved', '~35%'], ['Processed volume', '100+ visits/month'], ['User impact', 'Recruiters and clients'], ['Error reduction', '-30%']],
            tools: ['HTML', 'CSS', 'JavaScript']
          }
        ]
      }
    };

    const scrubbers = document.querySelectorAll('[data-career-scrubber]');
    scrubbers.forEach(scrubber => {
      const track = scrubber.querySelector('[data-career-track]');
      const stages = Array.from(scrubber.querySelectorAll('[data-stage]'));
      const yearGroups = Array.from(scrubber.querySelectorAll('.project-year-group'));
      const yearButtons = Array.from(scrubber.querySelectorAll('[data-year-toggle]'));
      const dateEl = scrubber.querySelector('[data-detail-date]');
      const companyEl = scrubber.querySelector('[data-detail-company]');
      const roleEl = scrubber.querySelector('[data-detail-role]');
      const summaryEl = scrubber.querySelector('[data-detail-summary]');
      const descEl = scrubber.querySelector('[data-detail-desc]');
      const resultsBlock = scrubber.querySelector('.project-detail-results');
      const resultLabelEls = Array.from(scrubber.querySelectorAll('[data-detail-result-label]'));
      const resultValueEls = Array.from(scrubber.querySelectorAll('[data-detail-result-value]'));
      const toolsEl = scrubber.querySelector('[data-detail-tools]');
      const linkEl = scrubber.querySelector('[data-detail-link]');
      const projectYearCardsEl = scrubber.querySelector('[data-project-year-cards]');
      const detailPanel = scrubber.querySelector('[data-career-detail]');
      const language = document.documentElement.lang && document.documentElement.lang.startsWith('es') ? 'es' : 'en';
      if (!track || !stages.length || !dateEl || !companyEl || !roleEl) return;

      const initialActiveIndex = Math.max(stages.findIndex(stage => stage.classList.contains('is-active')), 0);
      let activeIndex = -1;

      const parsePoints = (active) => {
        if (!active) return [];
        if (active.dataset.points) {
          return active.dataset.points
            .split('||')
            .map(point => point.trim())
            .filter(Boolean);
        }
        const summary = (active.dataset.summary || '').trim();
        if (!summary) return [];
        return summary
          .split('. ')
          .map((point, idx, arr) => {
            const clean = point.trim();
            if (!clean) return '';
            if (idx < arr.length - 1 && !clean.endsWith('.')) return `${clean}.`;
            return clean;
          })
          .filter(Boolean);
      };

      const renderSummary = (points) => {
        if (!summaryEl) return;
        summaryEl.innerHTML = '';
        points.forEach(point => {
          const li = document.createElement('li');
          li.textContent = point;
          summaryEl.appendChild(li);
        });
      };

      const renderProjectCards = (year) => {
        if (!projectYearCardsEl) return;
        const cards = (projectCardsByYear[language] && projectCardsByYear[language][year]) || [];
        projectYearCardsEl.innerHTML = cards.map(card => {
          const results = (card.results || []).map(item => `<div class="result-item"><span class="result-label">${item[0]}</span><span class="result-value">${item[1]}</span></div>`).join('');
          const tools = (card.tools || []).map(tool => `<span class="project-tag">${tool}</span>`).join('');
          const link = card.link ? `<a href="${card.link}" target="_blank" rel="noopener noreferrer" class="project-link-btn">${card.linkText || 'View project'}</a>` : '';
          return `
            <article class="project-year-card">
              <div class="project-year">${card.date || year}</div>
              <div class="project-title">${card.title}</div>
              <div class="project-client">${card.client}</div>
              <p class="project-desc">${card.desc}</p>
              <div class="project-results">
                <div class="results-title">${language === 'es' ? 'Resultados' : 'Outcomes'}</div>
                <div class="results-grid">${results}</div>
              </div>
              <div class="project-tags" data-stack-title="${language === 'es' ? 'Habilidades' : 'Skills & tools used'}">${tools}</div>
              ${link}
            </article>
          `;
        }).join('');

        const renderedCards = Array.from(projectYearCardsEl.querySelectorAll('.project-year-card'));
        requestAnimationFrame(() => {
          renderedCards.forEach((card, idx) => {
            card.style.transitionDelay = `${idx * 55}ms`;
            card.classList.add('is-in');
          });
        });
      };

      const animateDetailSwitch = () => {
        if (!detailPanel || prefersReducedMotion) return;
        detailPanel.classList.remove('is-switching');
        // Force reflow so animation reliably restarts on rapid timeline changes.
        // eslint-disable-next-line no-unused-expressions
        detailPanel.offsetHeight;
        detailPanel.classList.add('is-switching');
        setTimeout(() => {
          detailPanel.classList.remove('is-switching');
        }, 180);
      };

      const setActiveYearByGroup = (group, syncStage = false) => {
        if (!group || !yearGroups.length) return;
        yearGroups.forEach(item => item.classList.remove('is-active'));
        group.classList.add('is-active');
        yearButtons.forEach(button => {
          const sameGroup = button.closest('.project-year-group') === group;
          button.classList.toggle('is-active', sameGroup);
          button.setAttribute('aria-pressed', sameGroup ? 'true' : 'false');
        });

        if (syncStage) {
          const groupStages = stages.filter(stage => stage.closest('.project-year-group') === group);
          if (groupStages.length) {
            const nextIndex = stages.indexOf(groupStages[0]);
            if (nextIndex >= 0) setActive(nextIndex);
          }
        }
      };

      const setActive = (index) => {
        const safeIndex = Math.min(Math.max(index, 0), stages.length - 1);
        const active = stages[safeIndex];
        if (!active) return;
        if (safeIndex === activeIndex) return;
        animateDetailSwitch();
        stages.forEach(stage => stage.classList.remove('is-active'));
        active.classList.add('is-active');
        dateEl.textContent = active.dataset.date || '';
        companyEl.textContent = active.dataset.company || '';
        roleEl.textContent = active.dataset.role || '';
        renderSummary(parsePoints(active));

        if (descEl) {
          const desc = (active.dataset.desc || '').trim();
          descEl.textContent = desc;
          descEl.style.display = desc ? 'block' : 'none';
        }

        if (resultLabelEls.length && resultValueEls.length) {
          let hasResults = false;
          for (let i = 0; i < Math.min(resultLabelEls.length, resultValueEls.length); i += 1) {
            const idx = i + 1;
            const label = (active.dataset[`r${idx}l`] || '').trim();
            const value = (active.dataset[`r${idx}v`] || '').trim();
            resultLabelEls[i].textContent = label;
            resultValueEls[i].textContent = value;
            if (label || value) hasResults = true;
          }
          if (resultsBlock) {
            resultsBlock.style.display = hasResults ? 'block' : 'none';
          }
        }

        if (toolsEl) {
          toolsEl.innerHTML = '';
          const tools = (active.dataset.tools || '')
            .split('||')
            .map(tool => tool.trim())
            .filter(Boolean);
          tools.forEach(tool => {
            const tag = document.createElement('span');
            tag.className = 'project-tag';
            tag.textContent = tool;
            toolsEl.appendChild(tag);
          });
          toolsEl.style.display = tools.length ? '' : 'none';
        }

        if (linkEl) {
          const link = (active.dataset.link || '').trim();
          if (link) {
            linkEl.href = link;
            linkEl.style.display = 'inline-flex';
          } else {
            linkEl.removeAttribute('href');
            linkEl.style.display = 'none';
          }
        }

        setActiveYearByGroup(active.closest('.project-year-group'));

        if (projectYearCardsEl) {
          const yearMatch = (active.dataset.date || '').match(/\d{4}/);
          renderProjectCards(yearMatch ? yearMatch[0] : '');
        }

        activeIndex = safeIndex;
      };

      const indexFromPointer = (clientX) => {
        const rect = track.getBoundingClientRect();
        if (rect.width <= 0) return activeIndex;
        const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 0.9999);
        return Math.floor(ratio * stages.length);
      };

      setActive(initialActiveIndex);

      yearButtons.forEach(button => {
        const group = button.closest('.project-year-group');
        button.addEventListener('click', () => setActiveYearByGroup(group, true));
        button.addEventListener('focus', () => setActiveYearByGroup(group, true));
      });

      track.addEventListener('mousemove', (event) => {
        if (window.matchMedia('(hover: none)').matches) return;
        setActive(indexFromPointer(event.clientX));
      });

      track.addEventListener('touchmove', (event) => {
        const touch = event.touches && event.touches[0];
        if (!touch) return;
        setActive(indexFromPointer(touch.clientX));
      }, { passive: true });

      stages.forEach((stage, index) => {
        stage.addEventListener('mouseenter', () => setActive(index));
        stage.addEventListener('click', () => setActive(index));
        stage.addEventListener('focus', () => setActive(index));
      });
    });