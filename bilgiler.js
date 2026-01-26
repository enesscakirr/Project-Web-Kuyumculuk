document.addEventListener("DOMContentLoaded", function() {
  const makaleler = document.querySelectorAll('.blog-karti');

  makaleler.forEach(makale => {
      const icerikDiv = makale.querySelector('.kart-icerik');
      const paragraflar = icerikDiv.querySelectorAll('p');
      const baslik = icerikDiv.querySelector('h3');
      if(paragraflar.length > 1) {
          for(let i = 1; i < paragraflar.length; i++) {
              paragraflar[i].style.display = 'none';
          }

          // Butonu oluştur
          const btn = document.createElement('button');
          btn.className = 'devam-oku-btn';
          btn.innerHTML = 'Devamını Oku <span style="font-size:12px">&#9660;</span>'; // Aşağı ok
          icerikDiv.appendChild(btn);

          btn.addEventListener('click', function() {
              let acikMi = btn.classList.contains('aktif');

              if(acikMi) {
                  for(let i = 1; i < paragraflar.length; i++) {
                      paragraflar[i].style.display = 'none';
                  }
                  btn.innerHTML = 'Devamını Oku <span style="font-size:12px">&#9660;</span>';
                  btn.classList.remove('aktif');
              } else {
                  // Açılıyor...
                  for(let i = 1; i < paragraflar.length; i++) {
                      paragraflar[i].style.display = 'block';
                      paragraflar[i].style.animation = "fadeIn 0.5s";
                  }
                  btn.innerHTML = 'Daha Az Göster <span style="font-size:12px">&#9650;</span>';
                  btn.classList.add('aktif');
              }
          });
      }
  });
});