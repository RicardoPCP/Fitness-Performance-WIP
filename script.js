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

document.querySelectorAll('.sobre-texto, .sobre-img, .card, .callout-texto, .callout-img, .mapa, .local-texto, .texto-info, .card-mensal, .header, .faqmain .titulo, .faq').forEach(el => {
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
