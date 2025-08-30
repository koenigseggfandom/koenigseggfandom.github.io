document.addEventListener('DOMContentLoaded', () => {

    // 1. Dil Değiştirme Fonksiyonu
    const langSwitcher = document.querySelector('.lang-switcher');
    const langElements = document.querySelectorAll('[data-tr]');
    let currentLang = 'tr'; 

    function updateLanguage() {
        const newLang = currentLang === 'tr' ? 'en' : 'tr';
        document.documentElement.lang = newLang;

        langElements.forEach(element => {
            if (element.dataset[newLang]) {
                if (element.tagName === 'TITLE') {
                    document.title = element.dataset[newLang];
                } else if (element.tagName === 'BUTTON') {
                    element.textContent = element.dataset[newLang];
                } else {
                    element.textContent = element.dataset[newLang];
                }
            }
        });
        currentLang = newLang;
        localStorage.setItem('lang', currentLang);
    }

    const savedLang = localStorage.getItem('lang');
    if (savedLang && savedLang !== currentLang) {
        currentLang = savedLang === 'en' ? 'tr' : 'en';
        updateLanguage();
    }

    if (langSwitcher) {
        langSwitcher.addEventListener('click', updateLanguage);
    }
    
    // 2. Mouse Takip Eden Işıltı Efekti (Hero Bölümünde)
    const mouseGlow = document.querySelector('.mouse-glow');
    const heroSection = document.getElementById('hero');

    if (heroSection && mouseGlow) {
        heroSection.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const heroRect = heroSection.getBoundingClientRect();
            const relativeX = mouseX - heroRect.left;
            const relativeY = mouseY - heroRect.top;
            mouseGlow.style.left = `${relativeX}px`;
            mouseGlow.style.top = `${relativeY}px`;
            const edgeDistanceX = Math.min(relativeX, heroRect.width - relativeX);
            const edgeDistanceY = Math.min(relativeY, heroRect.height - relativeY);
            const minEdgeDistance = Math.min(edgeDistanceX, edgeDistanceY);
            const maxOpacityDistance = 100;
            const opacity = Math.min(0.7, 0.2 + (minEdgeDistance / maxOpacityDistance) * 0.5);
            mouseGlow.style.opacity = opacity;
        });

        heroSection.addEventListener('mouseleave', () => {
            mouseGlow.style.opacity = '0';
        });

        heroSection.addEventListener('mouseenter', () => {
            mouseGlow.style.opacity = '0.7';
        });
    }

    // 3. Galeriye Dinamik Resim Yükleme
    const imageGallery = document.querySelector('.image-gallery');
    const koenigseggImages = [
        'https://images.unsplash.com/photo-1542362543-c0529d380c85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1588661730419-482a85e44a42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1594247849641-766324a0d923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1579737158315-998edc2627e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1573539169492-36e2f170a4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1585806653282-3d8581f1b0a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
    ];

    if (imageGallery) {
        imageGallery.innerHTML = '';
        koenigseggImages.forEach(src => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Koenigsegg Hypercar';
            galleryItem.appendChild(img);
            imageGallery.appendChild(galleryItem);
        });
    }

    // 4. Smooth Scrolling
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 5. Model Kartlarına Özel Hover Efekti
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * -10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            card.style.boxShadow = `0 ${20 + Math.abs(rotateX)}px ${30 + Math.abs(rotateY)}px rgba(0,0,0,0.25)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
});
