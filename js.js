function saludar(){
    Swal.fire({
        title: 'Hola Mundo',
        text: 'Hola Mundo',
        icon: 'success',
        confirmButtonText: 'OK'
      });
}

// Toggle del sidebar
(function(){
  var menuToggle = document.getElementById('menuToggle');
  var sidebar = document.getElementById('sidebar');
  var backdrop = document.getElementById('backdrop');
  var sidebarClose = document.getElementById('sidebarClose');
  var photoInput = document.getElementById('contactPhotoInput');
  var photoPreview = document.getElementById('contactPhotoPreview');
  if(!menuToggle || !sidebar) return;

  function openSidebar(){
    sidebar.classList.add('open');
    if(backdrop){ backdrop.hidden = false; }
    menuToggle.setAttribute('aria-expanded', 'true');
    sidebar.setAttribute('aria-hidden', 'false');
  }

  function closeSidebar(){
    sidebar.classList.remove('open');
    if(backdrop){ backdrop.hidden = true; }
    menuToggle.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('aria-hidden', 'true');
  }

  menuToggle.addEventListener('click', function(){
    if(sidebar.classList.contains('open')){
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  if(backdrop){
    backdrop.addEventListener('click', closeSidebar);
  }

  if(sidebarClose){
    sidebarClose.addEventListener('click', closeSidebar);
  }

  // Cerrar al cambiar a ancho grande si queda abierto sin necesitar backdrop
  window.addEventListener('resize', function(){
    // Mantener comportamiento overlay siempre; solo asegurar backdrop segun estado
    if(!sidebar.classList.contains('open') && backdrop){
      backdrop.hidden = true;
    }
  });

  // Estado inicial según ancho
  // Estado inicial: siempre cerrado
  closeSidebar();

  // Cerrar al navegar entre links del sidebar
  var sidebarLinks = sidebar ? sidebar.querySelectorAll('a') : [];
  if(sidebarLinks && sidebarLinks.length){
    sidebarLinks.forEach(function(link){
      link.addEventListener('click', function(){
        closeSidebar();
      });
    });
  }

  // Preview de imagen en contactos
  if(photoInput && photoPreview){
    photoInput.addEventListener('change', function(){
      var file = photoInput.files && photoInput.files[0];
      if(!file){
        photoPreview.src = '';
        return;
      }
      var reader = new FileReader();
      reader.onload = function(e){
        photoPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
})();