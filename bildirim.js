// bildirim.js - Kullanıcıya şık uyarılar göstermek için
const Bildirim = {
    goster: function(mesaj, tip = 'basari') {
        const kutu = document.createElement('div');
        kutu.className = `bildirim-kutu ${tip}`;
        
        let ikon = '✅';
        if (tip === 'hata') ikon = '❌';
        if (tip === 'bilgi') ikon = 'ℹ️';

        kutu.innerHTML = `
            <span class="bildirim-ikon">${ikon}</span>
            <span class="bildirim-mesaj">${mesaj}</span>
        `;

        document.body.appendChild(kutu);

        setTimeout(() => {
            kutu.classList.add('aktif');
        }, 100);

        setTimeout(() => {
            kutu.classList.remove('aktif');
            setTimeout(() => {
                kutu.remove();
            }, 300);
        }, 3000);
    }
};

const style = document.createElement('style');
style.innerHTML = `
    .bildirim-kutu {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #013220;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.3s ease;
        border-left: 5px solid gold;
        font-family: 'Poppins', sans-serif;
    }
    .bildirim-kutu.aktif {
        opacity: 1;
        transform: translateX(0);
    }
    .bildirim-kutu.hata { border-left-color: red; }
`;
document.head.appendChild(style);