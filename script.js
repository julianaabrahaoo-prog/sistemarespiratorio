// === MENU MOBILE ===
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const menuList = document.getElementById('menuList');
  const menuLinks = document.querySelectorAll('#menuList a');

  if (!menuToggle || !menuList) return;

  // Abre / fecha menu
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menuList.classList.toggle('active');
  });

  // Fecha quando clica num link (mobile)
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && menuList.classList.contains('active')) {
        menuList.classList.remove('active');
      }
    });
  });

  // Fecha se clicar fora (mobile)
  document.addEventListener('click', (e) => {
    const isClickInside = menuList.contains(e.target) || menuToggle.contains(e.target);
    if (!isClickInside && menuList.classList.contains('active')) {
      menuList.classList.remove('active');
    }
  });

  // Fecha se redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menuList.classList.contains('active')) {
      menuList.classList.remove('active');
    }
  });
});


// === BOTÃO VOLTAR AO TOPO ===
const btnTop = document.getElementById('btnTop');
if (btnTop) {
  window.addEventListener('scroll', () => {
    btnTop.style.display = (document.documentElement.scrollTop > 300) ? 'flex' : 'none';
  });
  btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}


// === LOADER DE IMAGENS COM FALLBACK ===
function tryAltImg(imgEl, baseName) {
  const variants = [
    baseName,
    baseName.replace('.png', '.jpg'),
    baseName.replace('.jpg', '.png'),
    baseName.replace('.jpeg', '.jpg'),
    baseName.replace('.jpg', '.jpeg')
  ];
  let i = 0;
  imgEl.onerror = function () {
    i++;
    if (i < variants.length) {
      imgEl.src = variants[i];
    } else {
      imgEl.src = 'images/placeholder.png';
    }
  };
}

document.querySelectorAll('img').forEach(img => {
  const src = img.getAttribute('src');
  if (src) tryAltImg(img, src);
});


// === GRÁFICO ANIMADO ===
const canvas = document.getElementById('respChart');
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const gases = ['O₂', 'CO₂', 'N₂'];
  const inspirado = [21, 0.04, 78];
  const expirado = [16, 4, 78];
  let progress = 0;

  function drawBars() {
    progress += 0.03;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '16px Poppins';
    ctx.fillStyle = '#024';
    ctx.fillText('Composição do ar inspirado (verde) e expirado (azul)', 60, 24);

    gases.forEach((g, i) => {
      const x = 100 + i * 200;
      const inspH = (inspirado[i] * 2.5) * Math.min(progress, 1);
      const expH = (expirado[i] * 2.5) * Math.min(progress, 1);

      ctx.fillStyle = '#00a884';
      ctx.fillRect(x, 320 - inspH, 40, inspH);
      ctx.fillStyle = '#007d63';
      ctx.fillRect(x + 60, 320 - expH, 40, expH);

      ctx.fillStyle = '#000';
      ctx.fillText(g, x + 25, 340);
    });

    if (progress < 1.05) requestAnimationFrame(drawBars);
  }

  drawBars();
}


// === QUIZ EDUCACIONAL ===
const quizData = [
  {
    q: "Qual é a principal função do sistema respiratório?",
    opts: ["Troca de gases", "Digestão de nutrientes", "Filtração de sangue"],
    a: "Troca de gases",
    exp: "O sistema respiratório é responsável por garantir que o oxigênio chegue às células e o dióxido de carbono seja eliminado."
  },
  {
    q: "Onde ocorrem as trocas gasosas?",
    opts: ["Brônquios", "Traqueia", "Alvéolos"],
    a: "Alvéolos",
    exp: "Os alvéolos são estruturas microscópicas nos pulmões, onde o oxigênio é absorvido e o CO₂ é liberado."
  },
  {
    q: "Qual estrutura impede a entrada de alimentos nas vias respiratórias?",
    opts: ["Epiglote", "Laringe", "Diafragma"],
    a: "Epiglote",
    exp: "A epiglote fecha a entrada da laringe durante a deglutição, evitando engasgos."
  },
  {
    q: "Qual é o principal músculo da respiração?",
    opts: ["Diafragma", "Coração", "Pulmão"],
    a: "Diafragma",
    exp: "O diafragma é o músculo que se contrai e relaxa para promover a inspiração e expiração."
  },
  {
    q: "Qual gás é absorvido durante a inspiração?",
    opts: ["Dióxido de carbono", "Oxigênio", "Nitrogênio"],
    a: "Oxigênio",
    exp: "O oxigênio é absorvido pelos capilares pulmonares e transportado pela hemoglobina."
  },
  {
    q: "Qual gás é eliminado durante a expiração?",
    opts: ["Oxigênio", "Dióxido de carbono", "Hidrogênio"],
    a: "Dióxido de carbono",
    exp: "O CO₂ é um produto do metabolismo celular e é eliminado durante a expiração."
  },
  {
    q: "O que é DPOC?",
    opts: ["Doença Pulmonar Obstrutiva Crônica", "Doença Pulmonar Obstrutiva Celular", "Disfunção Pulmonar Oculta Crônica"],
    a: "Doença Pulmonar Obstrutiva Crônica",
    exp: "A DPOC inclui bronquite crônica e enfisema, reduzindo a eficiência das trocas gasosas."
  },
  {
    q: "Qual estrutura produz som e protege as vias aéreas?",
    opts: ["Laringe", "Faringe", "Epiglote"],
    a: "Laringe",
    exp: "A laringe contém as cordas vocais e protege a traqueia durante a deglutição."
  },
  {
    q: "Qual órgão realiza a troca de gases com o sangue?",
    opts: ["Pulmões", "Coração", "Fígado"],
    a: "Pulmões",
    exp: "Os pulmões são os principais órgãos do sistema respiratório, responsáveis pela hematose."
  },
  {
    q: "O que é o surfactante pulmonar?",
    opts: ["Um hormônio respiratório", "Uma substância que evita o colapso alveolar", "Um tipo de gás"],
    a: "Uma substância que evita o colapso alveolar",
    exp: "O surfactante reduz a tensão superficial dentro dos alvéolos, mantendo-os abertos."
  }
];

let i = 0, score = 0;
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');

function loadQuestion() {
  const current = quizData[i];
  questionEl.innerHTML = `<h3>${current.q}</h3>`;
  optionsEl.innerHTML = '';
  current.opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt, current.a, current.exp);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected, correct, exp) {
  const isCorrect = selected === correct;
  optionsEl.innerHTML = `<p><strong>${isCorrect ? '✅ Correto!' : '❌ Incorreto.'}</strong> ${exp}</p>`;
  if (isCorrect) score++;
  setTimeout(() => {
    i++;
    if (i < quizData.length) loadQuestion();
    else finishQuiz();
  }, 1800);
}

function finishQuiz() {
  questionEl.innerHTML = '<h3>Resultado final</h3>';
  optionsEl.innerHTML = '';
  scoreEl.innerHTML = `<p>Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas.</p>`;
}

if (questionEl && optionsEl && scoreEl) loadQuestion();


// === MOSTRAR MAIS CURIOSIDADES ===
document.addEventListener('DOMContentLoaded', () => {
  const btnCuriosidades = document.getElementById('btnCuriosidades');
  const curiosidadesExtras = document.getElementById('curiosidadesExtras');

  if (!btnCuriosidades || !curiosidadesExtras) return;

  let mostrando = false;
  curiosidadesExtras.style.display = 'none';

  btnCuriosidades.addEventListener('click', () => {
    mostrando = !mostrando;
    if (mostrando) {
      curiosidadesExtras.style.display = 'block';
      btnCuriosidades.textContent = 'Mostrar menos curiosidades ↑';
    } else {
      curiosidadesExtras.style.display = 'none';
      btnCuriosidades.textContent = 'Mostrar mais curiosidades ↓';
    }
  });
});
/* ======== MENU MOBILE ======== */
const menuToggle = document.querySelector(".menu-toggle");
const menuList = document.getElementById("menuList");

if (menuToggle && menuList) {
  menuToggle.addEventListener("click", () => {
    menuList.classList.toggle("active");
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll("#menuList a").forEach(link => {
    link.addEventListener("click", () => {
      menuList.classList.remove("active");
    });
  });
}

/* ======== BOTÃO VOLTAR AO TOPO ======== */
const btnTop = document.getElementById("btnTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    btnTop.style.display = "flex";
  } else {
    btnTop.style.display = "none";
  }
});

if (btnTop) {
  btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ======== ANIMAÇÃO SUAVE AO ROLAR ======== */
const fadeElements = document.querySelectorAll(".fade-in, .fade-up");

function checkFade() {
  const triggerBottom = window.innerHeight * 0.85;
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.style.opacity = "1";
      el.style.transform = "none";
    }
  });
}

window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);

/* ======== DESTAQUE DO MENU ATUAL ======== */
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 120;

  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (
      section &&
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
