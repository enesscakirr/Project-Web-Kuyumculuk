// sepet.js - Gelişmiş Sepet Yönetimi (Fiyat ve Resim Destekli)

document.addEventListener("DOMContentLoaded", function() {
    sepetSayisiniGuncelle();
    sepetSayfasiKontrol();
    const urunKartlari = document.querySelectorAll('.urun-karti');
    
    urunKartlari.forEach(kart => {
        const btn = document.createElement('button');
        btn.innerHTML = "Sepete Ekle 🛒"; 
        btn.className = "sepete-ekle-btn";
        
        btn.style.cssText = `
            position: absolute;
            bottom: 15px;
            right: 15px;
            background-color: gold;
            color: #013220;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            opacity: 0; 
            transform: translateY(10px);
            transition: all 0.3s ease;
            z-index: 50;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        `;
        
        kart.style.position = "relative";
        kart.appendChild(btn);

        // Hover efektleri
        kart.addEventListener('mouseenter', () => { 
            btn.style.opacity = '1'; 
            btn.style.transform = 'translateY(0)';
        });
        kart.addEventListener('mouseleave', () => { 
            btn.style.opacity = '0'; 
            btn.style.transform = 'translateY(10px)';
        });
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Ürün Bilgilerini HTML'den Çekiyoruz
            const urunAdi = kart.querySelector('.urun-isim').innerText;
            const urunFiyat = kart.querySelector('.urun-fiyat').innerText;
            const urunResim = kart.querySelector('img').src;
            let safFiyat = parseFloat(urunFiyat.replace(' TL', '').replace('.', '').replace(',', '.'));

            const yeniUrun = {
                id: Date.now(), 
                ad: urunAdi,
                fiyat: safFiyat,
                resim: urunResim
            };

            sepeteEkle(yeniUrun);
        
            if(typeof Bildirim !== 'undefined') {
                Bildirim.goster(`${urunAdi} sepete eklendi!`);
            } else {
                alert(`${urunAdi} sepete eklendi!`);
            }
        });
    });
});

function sepeteEkle(urun) {
    let sepet = JSON.parse(localStorage.getItem('cakirSepet')) || [];
    sepet.push(urun);
    localStorage.setItem('cakirSepet', JSON.stringify(sepet));
    sepetSayisiniGuncelle();
}

function sepetSayisiniGuncelle() {
    let sepet = JSON.parse(localStorage.getItem('cakirSepet')) || [];
    const sayi = sepet.length;

    let sepetMenu = document.getElementById('sepet-menu-item');
    if (!sepetMenu) {
        const navUl = document.querySelector('nav ul');
        if(navUl) {
            sepetMenu = document.createElement('li');
            sepetMenu.id = 'sepet-menu-item';
            sepetMenu.innerHTML = `<a href="sepet.html" style="color:gold; font-weight:bold;">Sepetim (${sayi})</a>`;
            navUl.appendChild(sepetMenu);
        }
    } else {
        sepetMenu.querySelector('a').innerText = `Sepetim (${sayi})`;
        sepetMenu.querySelector('a').href = "sepet.html";
    }
}

// --- SEPET SAYFASI MANTIĞI ---
function sepetSayfasiKontrol() {
    const sepetTablosu = document.getElementById('sepet-listesi');
    const sepetOzeti = document.getElementById('sepet-toplam-tutar');
    
    if(!sepetTablosu) return;

    let sepet = JSON.parse(localStorage.getItem('cakirSepet')) || [];
    sepetTablosu.innerHTML = '';
    let toplamTutar = 0;

    if (sepet.length === 0) {
        sepetTablosu.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px;">Sepetinizde ürün bulunmamaktadır.</td></tr>';
    } else {
        sepet.forEach((urun, index) => {
            toplamTutar += urun.fiyat;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${urun.resim}" alt="${urun.ad}" style="width:60px; height:60px; object-fit:cover; border-radius:5px;"></td>
                <td>${urun.ad}</td>
                <td>${urun.fiyat.toLocaleString('tr-TR')} TL</td>
                <td><button onclick="urunuSil(${index})" class="sil-btn">Sil 🗑️</button></td>
            `;
            sepetTablosu.appendChild(row);
        });
    }

    if(sepetOzeti) {
        sepetOzeti.innerText = toplamTutar.toLocaleString('tr-TR') + " TL";
    }
}
window.urunuSil = function(index) {
    let sepet = JSON.parse(localStorage.getItem('cakirSepet')) || [];
    sepet.splice(index, 1); 
    localStorage.setItem('cakirSepet', JSON.stringify(sepet));
    sepetSayisiniGuncelle();
    sepetSayfasiKontrol(); 
    
    if(typeof Bildirim !== 'undefined') {
        Bildirim.goster(`Ürün sepetten çıkarıldı.`, 'bilgi');
    }
};
window.sepetiBosalt = function() {
    if(confirm("Sepeti tamamen boşaltmak istiyor musunuz?")) {
        localStorage.removeItem('cakirSepet');
        sepetSayisiniGuncelle();
        sepetSayfasiKontrol();
        if(typeof Bildirim !== 'undefined') Bildirim.goster(`Sepet boşaltıldı.`, 'hata');
    }
};