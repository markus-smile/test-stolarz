/**
 * Cookies JavaScript - Stolarz Koszalin
 * Obsługa zgody na cookies i bannera cookie
 */

function initCookies() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const declineCookiesBtn = document.getElementById('declineCookies');
    
    // Sprawdź, czy użytkownik już dokonał wyboru
    if (cookieBanner && !getCookie('cookiesAccepted') && !getCookie('cookiesDeclined')) {
        // Pokaż banner po 1 sekundzie
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    // Obsługa przycisku akceptacji
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            setCookie('cookiesAccepted', 'true', 365);
            hideCookieBanner();
            enableAllCookies();
        });
    }
    
    // Obsługa przycisku odrzucenia
    if (declineCookiesBtn) {
        declineCookiesBtn.addEventListener('click', function() {
            setCookie('cookiesDeclined', 'true', 30); // Krótszy okres dla odrzucenia
            hideCookieBanner();
            disableNonEssentialCookies();
        });
    }
}

// Ukrycie bannera cookie
function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
        cookieBanner.classList.remove('show');
        
        // Usuń banner po zakończeniu animacji
        setTimeout(() => {
            if (cookieBanner.parentNode) {
                cookieBanner.parentNode.removeChild(cookieBanner);
            }
        }, 500);
    }
}

// Odczytanie wartości cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Włączenie wszystkich cookies
function enableAllCookies() {
    // W pełnej implementacji tutaj byłby kod aktywujący wszystkie skrypty analityczne i marketingowe
    console.log('Wszystkie ciasteczka włączone');
}

// Wyłączenie nieistotnych cookies
function disableNonEssentialCookies() {
    // W pełnej implementacji tutaj byłby kod dezaktywujący skrypty analityczne i marketingowe
    console.log('Tylko niezbędne ciasteczka włączone');
}

// Funkcja do tworzenia plików cookie (przeniesiona z main.js dla spójności)
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/; Secure; SameSite=Strict";
}
