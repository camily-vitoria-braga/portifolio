// Seleciona os elementos que terão interatividade.
const botaoTema = document.getElementById('botao-tema');
const botaoMenu = document.getElementById('botao-menu');
const listaMenu = document.getElementById('lista-menu');
const botaoTopo = document.getElementById('botao-topo');
const textoMaquina = document.getElementById('texto-maquina');
const anoAtual = document.getElementById('ano-atual');

// Atualiza o ano do rodapé automaticamente.
anoAtual.textContent = new Date().getFullYear();

// Alterna entre o tema claro e o escuro.
function alternarTema() {
  const temaEscuroAtivo = document.body.classList.toggle('tema-escuro');
  const iconeTema = botaoTema.querySelector('i');
  const textoTema = botaoTema.querySelector('span');

  if (temaEscuroAtivo) {
    iconeTema.className = 'bi bi-sun-fill';
    textoTema.textContent = 'Tema claro';
    botaoTema.setAttribute('aria-label', 'Ativar tema claro');
  } else {
    iconeTema.className = 'bi bi-moon-stars-fill';
    textoTema.textContent = 'Tema escuro';
    botaoTema.setAttribute('aria-label', 'Ativar tema escuro');
  }
}
botaoTema.addEventListener('click', alternarTema);

// Abre e fecha o menu de navegação em telas pequenas.
function alternarMenu() {
  const menuAberto = listaMenu.classList.toggle('menu-aberto');
  botaoMenu.setAttribute('aria-expanded', String(menuAberto));
  botaoMenu.setAttribute('aria-label', menuAberto ? 'Fechar menu' : 'Abrir menu');
  botaoMenu.innerHTML = menuAberto
    ? '<i class="bi bi-x-lg" aria-hidden="true"></i>'
    : '<i class="bi bi-list" aria-hidden="true"></i>';
}
botaoMenu.addEventListener('click', alternarMenu);

// Fecha o menu depois que uma seção é escolhida.
listaMenu.querySelectorAll('a').forEach(function (linkMenu) {
  linkMenu.addEventListener('click', function () {
    listaMenu.classList.remove('menu-aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
    botaoMenu.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i>';
  });
});

// Efeito máquina de escrever na apresentação principal.
const frasesDigitadas = [
  'Estudante de Desenvolvimento Full Stack',
  'Aprendendo Front-end na prática',
  'Construindo meu futuro na tecnologia'
];
let indiceFrase = 0;
let indiceLetra = 0;
let apagandoTexto = false;

function escreverTexto() {
  const fraseAtual = frasesDigitadas[indiceFrase];

  if (apagandoTexto) {
    indiceLetra--;
  } else {
    indiceLetra++;
  }

  textoMaquina.textContent = fraseAtual.substring(0, indiceLetra);
  let tempoEspera = apagandoTexto ? 38 : 75;

  if (!apagandoTexto && indiceLetra === fraseAtual.length) {
    apagandoTexto = true;
    tempoEspera = 1500;
  } else if (apagandoTexto && indiceLetra === 0) {
    apagandoTexto = false;
    indiceFrase = (indiceFrase + 1) % frasesDigitadas.length;
    tempoEspera = 350;
  }

  window.setTimeout(escreverTexto, tempoEspera);
}
escreverTexto();

// Mostra o botão "Voltar ao topo" após a rolagem.
function atualizarBotaoTopo() {
  if (window.scrollY > 350) {
    botaoTopo.classList.add('visivel');
  } else {
    botaoTopo.classList.remove('visivel');
  }
}
window.addEventListener('scroll', atualizarBotaoTopo, { passive: true });

botaoTopo.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Revela elementos suavemente quando eles entram na área visível.
const elementosAparecer = document.querySelectorAll('.aparecer');

if ('IntersectionObserver' in window) {
  const observadorAparecer = new IntersectionObserver(function (entradas, observador) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('apareceu');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  elementosAparecer.forEach(function (elemento) {
    observadorAparecer.observe(elemento);
  });
} else {
  // Alternativa para navegadores antigos: exibe tudo sem animação de rolagem.
  elementosAparecer.forEach(function (elemento) {
    elemento.classList.add('apareceu');
  });
}
