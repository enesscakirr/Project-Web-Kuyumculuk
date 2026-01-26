let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slidesContainer = document.querySelector('.slides');
let slideInterval = setInterval(() => { moveSlide(1); }, 5000);
function moveSlide(n) {
    slideIndex += n;
    if (slideIndex >= totalSlides) { slideIndex = 0; }
    if (slideIndex < 0) { slideIndex = totalSlides - 1; }
    slidesContainer.style.transform = `translateX(${-slideIndex * 100}%)`;
    clearInterval(slideInterval);
    slideInterval = setInterval(() => { moveSlide(1); }, 5000);
}
window.onscroll = function() {
    stickyNavbar();
    scrollFunction();
};
const header = document.querySelector("header");
const sticky = header.offsetTop;
function stickyNavbar() {
    if (window.pageYOffset > sticky) {
        header.style.position = "fixed"; header.style.top = "0";
        header.style.width = "100%"; header.style.zIndex = "1000";
        header.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    } else {
        header.style.position = "relative"; header.style.boxShadow = "none";
    }
}
const mybutton = document.getElementById("myBtn");
function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
function topFunction() { window.scrollTo({top: 0, behavior: 'smooth'}); }
window.addEventListener('scroll', reveal);
function reveal() {
    var reveals = document.querySelectorAll('.kategori, .animasyonlu-oge');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            reveals[i].classList.add('aktif');
        } else {
            reveals[i].classList.remove('aktif');
        }
    }
}
reveal();
const productCards = document.querySelectorAll('.urun-karti');
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("img01");
const span = document.getElementsByClassName("close-modal")[0];
productCards.forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const img = this.querySelector('img');
        modal.style.display = "block";
        modalImg.src = img.src;
    });
});
if (span) { span.onclick = function() { modal.style.display = "none"; } }
window.onclick = function(event) {
    if (event.target == modal) { modal.style.display = "none"; }
}