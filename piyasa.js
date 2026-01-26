// piyasa.js - Canlı Piyasa Verileri ve Hesaplamaları
const MY_API_KEY = "apikey 1KgSZebR5Qb0SAYOfzpxbf:3fZH3H6Zf6vKgt3KN2OWLd"; 

// --- VERİ ÇEKME FONKSİYONU ---
async function verileriGetir() {
    const requestOptions = {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "authorization": MY_API_KEY
        }
    };

    try {
        console.log("Veriler çekiliyor..."); 

        // 1. ALTIN FİYATLARINI ÇEK
        const goldResponse = await fetch("https://api.collectapi.com/economy/goldPrice", requestOptions);
        const goldData = await goldResponse.json();

        if (goldData.success) {
            const gram = goldData.result.find(item => item.name === 'Gram Altın');
            if(gram) {
                const gramKutu = document.getElementById('gram-fiyat');
                if(gramKutu) gramKutu.innerText = gram.buying + " TL";
            }
            const ceyrek = goldData.result.find(item => item.name === 'Çeyrek Altın');
            if(ceyrek) {
                const ceyrekKutu = document.getElementById('ceyrek-fiyat');
                if(ceyrekKutu) ceyrekKutu.innerText = ceyrek.buying + " TL";
            }
        }

        const dovizResponse = await fetch("https://api.collectapi.com/economy/allCurrency", requestOptions);
        const dovizData = await dovizResponse.json();

        if (dovizData.success) {
            const dolar = dovizData.result.find(item => item.code === 'USD');
            if(dolar) {
                const usdKutu = document.getElementById('usd-fiyat');
                if(usdKutu) usdKutu.innerText = dolar.buying + " TL";
            
                const degisimKutusu = document.getElementById('usd-degisim');
                if(degisimKutusu) {
                    degisimKutusu.innerText = "%" + dolar.rate;
                    degisimKutusu.className = dolar.rate < 0 ? "degisim azaldi" : "degisim artti";
                }
            }

            const euro = dovizData.result.find(item => item.code === 'EUR');
            if(euro) {
                const eurKutu = document.getElementById('eur-fiyat');
                if(eurKutu) eurKutu.innerText = euro.buying + " TL";

                const degisimKutusuEu = document.getElementById('eur-degisim');
                if(degisimKutusuEu) {
                    degisimKutusuEu.innerText = "%" + euro.rate;
                    degisimKutusuEu.className = euro.rate < 0 ? "degisim azaldi" : "degisim artti";
                }
            }
        }

        const simdi = new Date();
        const zamanKutusu = document.getElementById('son-guncelleme');
        if(zamanKutusu) zamanKutusu.innerText = "Son Güncelleme: " + simdi.toLocaleTimeString();

    } catch (error) {
        console.error("Hata:", error);
        const zamanKutusu = document.getElementById('son-guncelleme');
        if(zamanKutusu) zamanKutusu.innerText = "Veri alınamadı. API Key veya bağlantı hatası.";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    verileriGetir();
    setInterval(verileriGetir, 60000);
});