//NAVBAR
function sidebarMobile(){
  const sidebar = document.querySelector('.mobile');
  document.querySelector('.mobile').classList.add('aberta');
}

function fecharSidebar(){
  const sidebar = document.querySelector('.mobile');
  document.querySelector('.mobile').classList.remove('aberta');
}

//links ativos navbar mobile
document.querySelectorAll('.mobile a').forEach(link => {
    link.addEventListener('click', function(){
        document.querySelectorAll('.mobile a').forEach(l => l.classList.remove('ativo'));
        this.classList.add('ativo');
    });
});

//transicao de elementos
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.sobre-texto, .sobre-img, .card, .callout-texto, .callout-img, .mapa, .local-texto, .texto-info, .card-mensal, .header, .faqmain .titulo, .experimental-texto, .experimental-img, .playlist-texto, form, .grid-valores, .sobre-equipe, .app-conteudo, .sobre-aparelhos, .sobre-texto-acad').forEach(el => {
    observer.observe(el);
});

//icons flutuantes de whats e insta sumir
const scrollIndicator = document.querySelector('.scroll-indicator');
const iconzap = document.querySelector('.zap');
const iconinsta = document.querySelector('.insta')

window.addEventListener('scroll', () => {
    const fimDaPagina = window.innerHeight + window.scrollY >= document.body.offsetHeight - 350;
    const proxFooter = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    
    if (fimDaPagina) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }

    if (proxFooter) {
        iconzap.style.opacity = '0', iconinsta.style.opacity = '0';
    } else {
        iconzap.style.opacity = '1', iconinsta.style.opacity = '1';;
    }
});


//FORM PLAYLIST
document.getElementById('playlist').addEventListener('submit', function(e) {
  e.preventDefault();

  const ultimoEnvio = localStorage.getItem('ultimoEnvio');
  const agora = new Date().getTime();
  const cooldownDias = 2 /*dia*/ * 24 * 60 * 60 * 1000;
  const botao = document.querySelector('.enviar');
  const textConfirmacao = document.querySelector('.confirmacao-form p');

  if (ultimoEnvio && agora - ultimoEnvio < cooldownDias) {
    const diasRestantes = Math.ceil((cooldownDias - (agora - ultimoEnvio)) / (24 * 60 * 60 * 1000));
    textConfirmacao.innerHTML = `<span class="aguarde"> ! </span> Você já enviou uma sugestão. Tente novamente em ${diasRestantes} dia(s).`;
    return;
  }

  botao.disabled = true;
  botao.value = 'Enviando...';

  const dados = {
    nome: document.getElementById('nome').value,
    musica: document.getElementById('musica').value,
    artista: document.getElementById('artista').value
  };

  fetch('https://script.google.com/macros/s/AKfycbxNyrZLt4H7CExt0sRqj-i97DfQPyBRAEETD14eAwpKAH1kREsqQFO34zNecBBwXlRfvQ/exec', {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(dados)
  })
  .then(() => {
    localStorage.setItem('ultimoEnvio', agora);
    textConfirmacao.innerHTML = '<span class="sucesso"> ✓ </span> Enviado com sucesso!';
    botao.disabled = false;
    botao.value = 'Enviar';
  })
  .catch(() => { textConfirmacao.innerHTML = '<span class="erro"> X </span> Erro ao enviar.';
    botao.disabled = false;
    botao.value = 'Enviar';
})
});

//redirecionamento de loja mobile :>
 function redirectToStore() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = "https://apps.apple.com/br/app/next-fit/id1360859531", "_blank";
    } else if (/android/i.test(userAgent)) {
      window.location.href = "https://play.google.com/store/apps/details?id=br.com.fitastic.appaluno&hl=pt_BR&pli=1", "_blank";
    } else {
      window.location.href = "https://nextfit.com.br/", "_blank";
    }
  }