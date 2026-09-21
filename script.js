/* ============================================================
   MR. SANDMAN — ARQUIVO DIGITAL · SCRIPT
   ============================================================ */

(function () {
  'use strict';

  const state = { processo: [], servicos: [], faq: [], depoimentos: [] };

  /* ============================================================
     DADOS
     ============================================================ */
  function carregarDados() {
    fetch('dados.json')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        state.processo    = data.processo    || fallbackProcesso();
        state.servicos    = data.servicos    || fallbackServicos();
        state.faq         = data.faq         || fallbackFaq();
        state.depoimentos = data.depoimentos || fallbackDepoimentos();
        renderTudo();
      })
      .catch(() => {
        state.processo    = fallbackProcesso();
        state.servicos    = fallbackServicos();
        state.faq         = fallbackFaq();
        state.depoimentos = fallbackDepoimentos();
        renderTudo();
      });
  }

  function fallbackProcesso() {
    return [
      { num: '壱', titulo: 'Observar',  texto: 'Análise da fotografia, do briefing e do público. Identificação dos pontos fortes e problemas visuais.' },
      { num: '弐', titulo: 'Planejar',  texto: 'Definição da atmosfera, composição, referências visuais e direção de arte.' },
      { num: '参', titulo: 'Construir', texto: 'Manipulação, composição, cenário, elementos visuais e código autoral quando aplicável.' },
      { num: '四', titulo: 'Refinar',   texto: 'Tratamento de pele, iluminação, cores, detalhes finos e microinterações.' },
      { num: '五', titulo: 'Colorir',   texto: 'Color grading, identidade visual, paleta consistente e testes em todos os dispositivos.' },
      { num: '六', titulo: 'Finalizar', texto: 'Polimento, correção, revisão final e preparação para entrega.' }
    ];
  }

  function fallbackServicos() {
    return [
      { icone: '01', titulo: 'Tratamento Profissional',   texto: 'Correção de exposição, contraste, nitidez e limpeza geral da imagem.' },
      { icone: '02', titulo: 'Retoque de Cosplay',        texto: 'Tratamento de pele, olhos, cabelo e detalhes com preservação de textura.' },
      { icone: '03', titulo: 'Edição Cinematográfica',    texto: 'Direção visual, color grading, atmosfera e narrativa de cena.' },
      { icone: '04', titulo: 'Manipulação Fotográfica',   texto: 'Composição de múltiplas imagens, elementos e cenários digitais.' },
      { icone: '05', titulo: 'Criação de Backgrounds',    texto: 'Construção de cenários digitais que remetem ao universo do personagem.' },
      { icone: '06', titulo: 'Sites & Portfólios',        texto: 'Criação de portfólios personalizados com identidade visual única.' },
      { icone: '07', titulo: 'Landing Pages',             texto: 'Páginas de alto impacto, com foco em conversão e narrativa visual.' },
      { icone: '08', titulo: 'Experiências Interativas',  texto: 'Sites com navegação diferenciada, animações e microinterações.' },
      { icone: '09', titulo: 'Design Responsivo',         texto: 'Interfaces que funcionam perfeitamente em desktop, tablet e mobile.' },
      { icone: '10', titulo: 'Identidade Visual Digital', texto: 'Cores, tipografia, elementos gráficos e atmosfera consistentes.' },
      { icone: '11', titulo: 'Projetos sob Referência',   texto: 'Desenvolvimento a partir de moodboards, universos ou conceitos específicos.' },
      { icone: '12', titulo: 'Soluções Personalizadas',   texto: 'Cada projeto tem necessidades próprias. Sem templates prontos.' }
    ];
  }

  function fallbackFaq() {
    return [
      { pergunta: 'Que tipo de projeto você aceita?', resposta: 'Edições de cosplay, criação de portfólios, landing pages, sites pessoais e experiências digitais personalizadas. Se for algo diferente, é só perguntar.' },
      { pergunta: 'Preciso ter um cosplay profissional para pedir edição?', resposta: 'Não. O trabalho de edição valoriza qualquer cosplay. O que importa é a caracterização, a intenção e a ideia que você quer transmitir.' },
      { pergunta: 'Posso escolher o estilo da edição?', resposta: 'Sim. Você pode enviar referências de estilo, atmosfera e color grading. Também posso sugerir o que melhor se adequa ao personagem.' },
      { pergunta: 'Como funciona a criação de um site ou portfólio?', resposta: 'Começamos com um briefing do seu objetivo, público e referências. Depois eu projeto o design, desenvolvo o código, testo em todos os dispositivos e entrego pronto para uso.' },
      { pergunta: 'Você usa templates prontos?', resposta: 'Não. Cada projeto é desenvolvido do zero, com identidade visual própria. Este próprio site é um exemplo: HTML, CSS e JavaScript puros, sem frameworks pesados.' },
      { pergunta: 'Quanto tempo leva para receber a edição?', resposta: 'O prazo médio de edição é de 5 a 10 dias, dependendo da complexidade. Projetos maiores podem ter prazo estendido.' },
      { pergunta: 'Quanto tempo leva para desenvolver um site?', resposta: 'Depende do escopo. Portfólios simples podem ficar prontos em 1 a 2 semanas. Experiências completas com muitas animações levam mais tempo — sempre alinhado com você.' },
      { pergunta: 'Como funciona o orçamento?', resposta: 'O orçamento é personalizado. Após enviar o briefing e a ideia, uma análise é feita e o valor é apresentado com base na complexidade do projeto.' },
      { pergunta: 'Posso utilizar a imagem e o site para fins comerciais?', resposta: 'Sim. Você recebe a imagem em alta resolução e o site pronto para publicação. Uso pessoal e divulgação do seu cosplay ou marca estão inclusos.' },
      { pergunta: 'Você faz parcerias?', resposta: 'Sim! Parcerias e collabs são bem-vindas. Entre em contato via DM no Instagram @mr._sandman__.' }
    ];
  }

  function fallbackDepoimentos() {
    return [{ placeholder: true }, { placeholder: true }, { placeholder: true }];
  }

  function renderTudo() {
    renderPortfolio();
    renderProcesso(state.processo);
    renderServicos(state.servicos);
    renderFaq(state.faq);
    renderDepoimentos(state.depoimentos);
    initModal();
    setTimeout(initReveal, 100);
  }

  /* ============================================================
     PORTFÓLIO (estático — 3 posts reais)
     ============================================================ */
  function renderPortfolio() {
    document.querySelectorAll('.card-projeto').forEach(card => {
      card.addEventListener('click', () => abrirProjeto(card));
    });
  }

  function abrirProjeto(card) {
    const modal = document.getElementById('modalProjeto');
    const body = document.getElementById('modalBody');
    if (!modal || !body) return;

    const dados = {
      titulo:     card.dataset.titulo     || 'Projeto',
      personagem: card.dataset.personagem || '—',
      obra:       card.dataset.obra       || '—',
      artista:    card.dataset.artista    || 'Mr. Sandman',
      categoria:  card.dataset.categoria  || '編集 · Edição',
      instagram:  card.dataset.instagram  || '#',
      imagem:     card.dataset.imagem     || ''
    };

    body.innerHTML = `
      <div class="modal-projeto__header">
        <span class="modal-projeto__cat">${dados.categoria}</span>
        <h2 class="modal-projeto__nome">${dados.titulo}</h2>
        <p class="modal-projeto__universo">${dados.personagem} · ${dados.obra}</p>
      </div>

      <div class="modal-projeto__etapas">
        <div class="modal-etapa">
          <div class="modal-etapa__media">
            <img src="${dados.imagem}" alt="${dados.titulo}" />
          </div>
          <div class="modal-etapa__content">
            <span class="modal-etapa__num">壱 · 作品 · OBRA</span>
            <h3 class="modal-etapa__title">Sobre este projeto</h3>
            <p class="modal-etapa__text">
              Esta é uma peça do arquivo visual do Mr. Sandman — uma edição
              construída com o mesmo método aplicado em todos os projetos:
              observação, análise, construção e refinamento.
            </p>
            <p class="modal-etapa__text">
              <strong>Artista:</strong> ${dados.artista}<br />
              <strong>Personagem:</strong> ${dados.personagem}<br />
              <strong>Obra:</strong> ${dados.obra}
            </p>
          </div>
        </div>
      </div>

      <div class="modal-projeto__tecnicas">
        <span class="modal-projeto__tecnicas-label">連絡 · Ver no Instagram</span>
        <div class="modal-projeto__tecnicas-list">
          <a class="modal-projeto__tecnica modal-projeto__tecnica--link"
             href="${dados.instagram}" target="_blank" rel="noopener">
            ↗ Abrir post original
          </a>
        </div>
      </div>
    `;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function fecharModal() {
    const modal = document.getElementById('modalProjeto');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initModal() {
    const modal = document.getElementById('modalProjeto');
    if (!modal) return;
    modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', fecharModal));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });
  }

  /* ============================================================
     PROCESSO
     ============================================================ */
  function renderProcesso(etapas) {
    const grid = document.getElementById('processoGrid');
    if (!grid) return;
    grid.innerHTML = etapas.map(e => `
      <div class="caminho-card reveal">
        <span class="caminho-card__num">${e.num}</span>
        <h3 class="caminho-card__title">${e.titulo}</h3>
        <p class="caminho-card__text">${e.texto}</p>
        <span class="caminho-card__jp">${e.num}</span>
      </div>
    `).join('');
  }

  /* ============================================================
     SERVIÇOS
     ============================================================ */
  function renderServicos(servicos) {
    const grid = document.getElementById('servicosGrid');
    if (!grid) return;
    grid.innerHTML = servicos.map(s => `
      <div class="oficio reveal">
        <span class="oficio__num">${s.icone}</span>
        <h3 class="oficio__title">${s.titulo}</h3>
        <p class="oficio__text">${s.texto}</p>
      </div>
    `).join('');
  }

  /* ============================================================
     FAQ
     ============================================================ */
  function renderFaq(itens) {
    const lista = document.getElementById('faqList');
    if (!lista) return;

    const numerosJp = ['壱','弐','参','四','五','六','七','八','九','十','拾壱','拾弐'];

    lista.innerHTML = itens.map((item, i) => `
      <div class="faq-item reveal" data-faq="${i}">
        <button class="faq-item__q" aria-expanded="false">
          <span class="faq-item__num">${numerosJp[i] || (i + 1)}</span>
          <span>${item.pergunta}</span>
          <span class="faq-item__icon"></span>
        </button>
        <div class="faq-item__a">
          <div class="faq-item__a-inner">${item.resposta}</div>
        </div>
      </div>
    `).join('');

    lista.querySelectorAll('.faq-item__q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('is-open');
        lista.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('is-open');
          i.querySelector('.faq-item__q').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ============================================================
     DEPOIMENTOS
     ============================================================ */
  function renderDepoimentos(depoimentos) {
    const grid = document.getElementById('depoimentosGrid');
    if (!grid) return;

    grid.innerHTML = depoimentos.map(d => {
      if (d.placeholder) {
        return `<div class="voz voz--placeholder reveal"><span>声 · Voz em breve</span></div>`;
      }
      return `
        <div class="voz reveal">
          <span class="voz__quote-mark">"</span>
          <img class="voz__foto" src="${d.foto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80'}" alt="${d.nome}" />
          <p class="voz__text">"${d.texto}"</p>
          <div class="voz__meta">
            <span class="voz__nome">${d.nome}</span>
            <span class="voz__info">${d.instagram} · ${d.personagem}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ============================================================
     COMPARADOR
     ============================================================ */
  function initComparador() {
    const frame = document.getElementById('comparadorHandle');
    const before = document.getElementById('comparadorBefore');
    const container = frame?.closest('.comparador__frame');
    if (!frame || !before || !container) return;

    let isDragging = false;

    function setPosition(clientX) {
      const rect = container.getBoundingClientRect();
      let x = (clientX - rect.left) / rect.width;
      x = Math.max(0.08, Math.min(0.92, x));
      before.style.width = (x * 100) + '%';
      frame.style.left = (x * 100) + '%';
    }

    container.addEventListener('mousedown', e => { isDragging = true; setPosition(e.clientX); });
    window.addEventListener('mousemove', e => { if (isDragging) setPosition(e.clientX); });
    window.addEventListener('mouseup', () => { isDragging = false; });

    container.addEventListener('touchstart', e => {
      isDragging = true;
      setPosition(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchmove', e => {
      if (isDragging) setPosition(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
  }

  /* ============================================================
     CURRÍCULO — toggle visualizar
     ============================================================ */
  function initCurriculo() {
    const toggle = document.getElementById('curriculoToggle');
    const body = document.getElementById('curriculoBody');
    const toggleText = toggle?.querySelector('.curriculo-cv__toggle-text');
    if (!toggle || !body) return;

    toggle.addEventListener('click', () => {
      const isOpen = body.classList.contains('is-open');
      body.classList.toggle('is-open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
      if (toggleText) toggleText.textContent = !isOpen ? 'Recolher' : 'Visualizar';
    });
  }

  /* ============================================================
     CURSOR
     ============================================================ */
  function initCursor() {
    const cursor = document.getElementById('cursor');
    const label = document.getElementById('cursorLabel');
    if (!cursor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      if (cursor) cursor.style.display = 'none';
      return;
    }

    let mx = 0, my = 0, cx = 0, cy = 0;

    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function animate() {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    }
    animate();

    document.querySelectorAll('[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('is-hover');
        if (label) label.textContent = el.dataset.cursor;
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-hover');
        if (label) label.textContent = '';
      });
    });

    document.querySelectorAll('a, button, .card-projeto, .dev-skill, .faq-item__q').forEach(el => {
      if (el.hasAttribute('data-cursor')) return;
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }

  /* ============================================================
     SAKURA
     ============================================================ */
  function initSakura() {
    const container = document.getElementById('sakura');
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const COUNT = window.innerWidth < 768 ? 12 : 25;

    for (let i = 0; i < COUNT; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (Math.random() * 8 + 8) + 's';
      petal.style.animationDelay = (Math.random() * -20) + 's';
      petal.style.opacity = (Math.random() * 0.4 + 0.4).toFixed(2);
      const scale = (Math.random() * 0.6 + 0.6).toFixed(2);
      petal.style.transform = `scale(${scale})`;
      const size = (Math.random() * 6 + 10) + 'px';
      petal.style.width = size;
      petal.style.height = size;
      container.appendChild(petal);
    }
  }

  /* ============================================================
     NAV
     ============================================================ */
  function initNav() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
    }, { passive: true });

    toggle?.addEventListener('click', () => {
      toggle.classList.toggle('is-open');
      links.classList.toggle('is-open');
    });

    links?.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        links.classList.remove('is-open');
      });
    });
  }

  /* ============================================================
     REVEAL
     ============================================================ */
  function initReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ============================================================
     FORMULÁRIO
     ============================================================ */
  function initForm() {
    const form = document.getElementById('formContato');
    const upload = document.getElementById('formUpload');
    const input = document.getElementById('foto');
    const name = document.getElementById('formUploadName');
    const feedback = document.getElementById('formFeedback');
    const selo = document.getElementById('selo');
    const seloClose = document.getElementById('seloClose');
    const btnText = document.getElementById('btnSubmitText');

    if (!form) return;

    upload?.addEventListener('click', () => input.click());
    input?.addEventListener('change', () => {
      if (input.files.length > 0) name.textContent = input.files[0].name;
    });
    upload?.addEventListener('dragover', e => { e.preventDefault(); upload.classList.add('is-drag'); });
    upload?.addEventListener('dragleave', () => upload.classList.remove('is-drag'));
    upload?.addEventListener('drop', e => {
      e.preventDefault();
      upload.classList.remove('is-drag');
      if (e.dataTransfer.files.length > 0) {
        input.files = e.dataTransfer.files;
        name.textContent = e.dataTransfer.files[0].name;
      }
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();

      const nome      = document.getElementById('nome').value.trim();
      const email     = document.getElementById('email').value.trim();
      const tipo      = document.getElementById('tipoProjeto').value;
      const orcamento = document.getElementById('orcamento').value;

      if (!nome || !email) {
        feedback.textContent = 'Preencha nome e e-mail para continuar.';
        feedback.classList.add('is-error');
        return;
      }
      if (!tipo) {
        feedback.textContent = 'Selecione o tipo de projeto.';
        feedback.classList.add('is-error');
        return;
      }
      if (!orcamento) {
        feedback.textContent = 'Selecione o orçamento previsto.';
        feedback.classList.add('is-error');
        return;
      }
      feedback.textContent = '';
      feedback.classList.remove('is-error');

      form.classList.add('is-sending');
      if (btnText) btnText.textContent = 'Enviando...';

      const formData = new FormData(form);

      try {
        await fetch('https://formsubmit.co/ajax/mr.sandman0819@gmail.com', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });

        form.classList.remove('is-sending');
        form.classList.add('is-sent');

        setTimeout(() => {
          selo.classList.add('is-open');
          selo.setAttribute('aria-hidden', 'false');
        }, 300);

        form.reset();
        if (name) name.textContent = '';
        if (btnText) btnText.textContent = 'Enviar a carta';
      } catch (err) {
        form.classList.remove('is-sending');
        if (btnText) btnText.textContent = 'Enviar a carta';
        feedback.textContent = 'Falha no envio. Tente novamente ou envie via Instagram.';
        feedback.classList.add('is-error');
      }
    });

    seloClose?.addEventListener('click', () => {
      selo.classList.remove('is-open');
      selo.setAttribute('aria-hidden', 'true');
      form.classList.remove('is-sent');
    });
  }

  /* ============================================================
     CONTADORES
     ============================================================ */
  function initCounters() {
    const stats = document.querySelectorAll('[data-count]');
    if (!stats.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          let current = 0;
          const step = Math.max(1, Math.round(target / 60));
          const tick = () => {
            current += step;
            if (current >= target) { el.textContent = target; return; }
            el.textContent = current;
            requestAnimationFrame(tick);
          };
          tick();
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    stats.forEach(s => obs.observe(s));
  }

  /* ============================================================
     ANO RODAPÉ
     ============================================================ */
  function initFooter() {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    initComparador();
    initCurriculo();
    initCursor();
    initSakura();
    initNav();
    initCounters();
    initForm();
    initFooter();
  });

})();