/**
 * Gallery JavaScript - Stolarz Koszalin
 * Obsługa filtrowania elementów galerii
 */

function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length && galleryItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Usuń klasę active ze wszystkich przycisków
                filterBtns.forEach(b => b.classList.remove('active'));
                // Dodaj klasę active do klikniętego przycisku
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    // Pokaż wszystkie elementy, jeśli wybrany filtr to 'all'
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        // Dodaj animację
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        // Pokaż tylko elementy pasujące do wybranej kategorii
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            // Dodaj animację
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 100);
                        } else {
                            // Ukryj niepasujące elementy
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
        
        // Ustaw domyślny filtr (wszystkie)
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    }

    // Lightbox dla zdjęć galerii
    const galleryImages = document.querySelectorAll('.gallery-item img');
    if (galleryImages.length) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                const overlay = document.createElement('div');
                overlay.className = 'lightbox-overlay';
                
                const image = document.createElement('img');
                image.className = 'lightbox-image';
                image.src = img.src;
                image.alt = img.alt;
                
                const closeButton = document.createElement('button');
                closeButton.className = 'lightbox-close';
                closeButton.innerHTML = '&times;';
                
                overlay.appendChild(image);
                overlay.appendChild(closeButton);
                document.body.appendChild(overlay);
                
                // Blokuj przewijanie strony
                document.body.style.overflow = 'hidden';
                
                // Zamknięcie lightbox po kliknięciu
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay || e.target === closeButton) {
                        document.body.removeChild(overlay);
                        document.body.style.overflow = '';
                    }
                });
                
                // Zamknięcie po naciśnięciu Escape
                document.addEventListener('keydown', function escapeClose(e) {
                    if (e.key === 'Escape') {
                        document.body.removeChild(overlay);
                        document.body.style.overflow = '';
                        document.removeEventListener('keydown', escapeClose);
                    }
                });
            });
        });
    }
}
