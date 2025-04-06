/**
 * Forms JavaScript - Stolarz Koszalin
 * Obsługa formularzy i ich walidacji
 */

function initForms() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Walidacja formularza
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const privacy = document.getElementById('privacy');
            
            let isValid = true;
            
            // Sprawdź imię i nazwisko
            if (!name.value.trim() || name.value.length < 3) {
                showError(name, 'Wprowadź poprawne imię i nazwisko (min. 3 znaki)');
                isValid = false;
            } else {
                removeError(name);
            }
            
            // Sprawdź email
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                showError(email, 'Wprowadź poprawny adres e-mail');
                isValid = false;
            } else {
                removeError(email);
            }
            
            // Sprawdź telefon (jeśli podany)
            if (phone.value.trim()) {
                const phoneRegex = /^[0-9+\s]{9,15}$/;
                if (!phoneRegex.test(phone.value)) {
                    showError(phone, 'Wprowadź poprawny numer telefonu');
                    isValid = false;
                } else {
                    removeError(phone);
                }
            }
            
            // Sprawdź temat
            if (!subject.value.trim()) {
                showError(subject, 'Wprowadź temat wiadomości');
                isValid = false;
            } else {
                removeError(subject);
            }
            
            // Sprawdź wiadomość
            if (!message.value.trim() || message.value.length < 10) {
                showError(message, 'Wiadomość musi zawierać co najmniej 10 znaków');
                isValid = false;
            } else {
                removeError(message);
            }
            
            // Sprawdź zgodę na przetwarzanie danych
            if (!privacy.checked) {
                showError(privacy, 'Wymagana jest zgoda na przetwarzanie danych');
                isValid = false;
            } else {
                removeError(privacy);
            }
            
            // Jeśli formularz jest poprawny, wyślij dane
            if (isValid) {
                // Tutaj normalnie byłby kod do wysyłki formularza
                // W wersji demonstracyjnej pokazujemy tylko komunikat
                const formData = new FormData(contactForm);
                
                // Symulacja wysyłki formularza
                showFormMessage(contactForm, 'Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.', 'success');
                
                // Resetuj formularz po udanym wysłaniu
                contactForm.reset();
            }
        });
    }
    
    // Obsługa polityki prywatności
    const privacyLink = document.getElementById('privacyLink');
    const cookiePrivacyLink = document.getElementById('cookiePrivacyLink');
    const privacyModal = document.getElementById('privacyModal');
    const closePrivacy = document.querySelector('.close-privacy');
    
    if (privacyLink && privacyModal) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (cookiePrivacyLink && privacyModal) {
        cookiePrivacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closePrivacy && privacyModal) {
        closePrivacy.addEventListener('click', function() {
            privacyModal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === privacyModal) {
                privacyModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
}

// Funkcja pokazująca błąd walidacji
function showError(input, message) {
    const formGroup = input.closest('.form-group') || input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message') || document.createElement('div');
    
    if (!formGroup.querySelector('.error-message')) {
        errorMessage.className = 'error-message';
        errorMessage.style.color = '#e53935';
        errorMessage.style.fontSize = '0.8rem';
        errorMessage.style.marginTop = '5px';
        formGroup.appendChild(errorMessage);
    }
    
    errorMessage.textContent = message;
    input.style.borderColor = '#e53935';
}

// Funkcja usuwająca błąd walidacji
function removeError(input) {
    const formGroup = input.closest('.form-group') || input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (errorMessage) {
        formGroup.removeChild(errorMessage);
    }
    
    input.style.borderColor = '';
}

// Funkcja pokazująca komunikat po wysłaniu formularza
function showFormMessage(form, message, type) {
    let messageElement = form.querySelector('.form-message');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        form.prepend(messageElement);
    }
    
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    
    if (type === 'success') {
        messageElement.style.backgroundColor = '#e8f5e9';
        messageElement.style.color = '#2e7d32';
        messageElement.style.border = '1px solid #a5d6a7';
    } else if (type === 'error') {
        messageElement.style.backgroundColor = '#ffebee';
        messageElement.style.color = '#c62828';
        messageElement.style.border = '1px solid #ef9a9a';
    }
    
    messageElement.style.padding = '10px 15px';
    messageElement.style.borderRadius = '4px';
    messageElement.style.marginBottom = '20px';
    
    // Usuń komunikat po 5 sekundach
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            if (form.contains(messageElement)) {
                form.removeChild(messageElement);
            }
        }, 500);
    }, 5000);
}
