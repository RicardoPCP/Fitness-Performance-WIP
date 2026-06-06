function sidebarMobile(){
  const sidebar = document.querySelector('.mobile');
  sidebar.style.display = 'flex';
}

function fecharSidebar(){
  const sidebar = document.querySelector('.mobile');
  sidebar.style.display = 'none';
}

document.querySelectorAll('.mobile a').forEach(link => {
    link.addEventListener('click', function(){
        document.querySelectorAll('.mobile a').forEach(l => l.classList.remove('ativo'));
        this.classList.add('ativo');
    });
});
