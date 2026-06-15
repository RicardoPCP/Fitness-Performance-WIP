//NAVBAR
function sidebarMobile(){
  const sidebar = document.querySelector('.mobile');
  sidebar.style.display = 'flex';
}

function fecharSidebar(){
  const sidebar = document.querySelector('.mobile');
  sidebar.style.display = 'none';
}

//hover rosa NAVBAR
document.querySelectorAll('.mobile a').forEach(link => {
    link.addEventListener('click', function(){
        document.querySelectorAll('.mobile a').forEach(l => l.classList.remove('ativo'));
        this.classList.add('ativo');
    });
});

//transicao
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.sobre-texto, .sobre-img, .card, .callout-texto, .callout-img, .mapa, .local-texto, .texto-info, .card-mensal, .header, .faqmain .titulo, .experimental-texto, .experimental-img, .playlist-texto, form').forEach(el => {
    observer.observe(el);
});

//scroll sumir
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

  const botao = document.querySelector('.enviar');
  botao.disabled = true;
  botao.value = 'Enviando...';

  const ultimoEnvio = localStorage.getItem('ultimoEnvio');
  const agora = new Date().getTime();
  const cincoDias = 5 * 24 * 60 * 60 * 1000;

  if (ultimoEnvio && agora - ultimoEnvio < cincoDias) {
    const diasRestantes = Math.ceil((cincoDias - (agora - ultimoEnvio)) / (24 * 60 * 60 * 1000));
    alert(`Você já enviou uma sugestão. Tente novamente em ${diasRestantes} dia(s).`);
    botao.disabled = false;
    botao.value = 'Enviar';
    return;
  }

  const url = new URL('https://script.google.com/macros/s/AKfycbxNyrZLt4H7CExt0sRqj-i97DfQPyBRAEETD14eAwpKAH1kREsqQFO34zNecBBwXlRfvQ/exec');
  url.searchParams.append('nome', document.getElementById('nome').value);
  url.searchParams.append('musica', document.getElementById('musica').value);

  fetch(url, { method: 'GET' })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'ok') {
      localStorage.setItem('ultimoEnvio', agora);
      alert('Enviado com sucesso!');
    } else if (res.status === 'bloqueado') {
      alert('Você já enviou uma sugestão nos últimos 5 dias.');
      botao.disabled = false;
      botao.value = 'Enviar';
    }
  })
  .catch(() => {
    alert('Erro ao enviar.');
    botao.disabled = false;
    botao.value = 'Enviar';
  });
});