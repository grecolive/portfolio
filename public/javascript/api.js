let navLink = document.querySelectorAll(".nav-link");
let topButton = document.querySelector(".top");
let copyCustomSpan = document.querySelector(".year");
let currentYear = new Date().getFullYear();

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

copyCustomSpan.innerText = currentYear;

// Desplazamiento suave
navLink.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        let target = link.getAttribute("href");
        document.getElementById(target).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

// Botón de desplazamiento superior
window.onscroll = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = 'block';
    } else {
        topButton.style.display = 'none';
    }
}

// Cuando el usuario hace clic en el botón, desplácese hacia la parte superior de la página
topButton.addEventListener("click", function() {
    // Desplaza suavemente hacia la parte superior de la página
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Función para calcular la edad
const calculate_age = (p_Fecha) => {
    let diff_ms = Date.now() - p_Fecha.getTime();
    let age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

// Calcular la edad
let fecha = calculate_age(new Date(1990, 10, 24));
//document.querySelector('.age').innerHTML = fecha;

// Cambiar el color tema
(() => {
    'use strict';
  
    const getStoredTheme = () => localStorage.getItem('theme');
    const setStoredTheme = theme => localStorage.setItem('theme', theme);
    const changeThemeDropdown = document.querySelector('.dropdown');
  
    // Get the user-preferred theme
    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme();
      if (storedTheme) {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
  
    // Set the theme to the user-preferred theme
    const setTheme = theme => {
        if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            changeThemeDropdown.setAttribute('data-bs-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            let dropdownChilds = changeThemeDropdown.childNodes[3].querySelectorAll(".dropdown-item");
            dropdownChilds.forEach((child) => {
                child.classList.remove('active');
                child.closest('.dropdown').firstChild.nextSibling.innerHTML = "";
                let icon = child.firstChild.nextSibling.cloneNode(true);
                child.closest('.dropdown').firstChild.nextSibling.appendChild(icon); 
                if (child.getAttribute('data-bs-theme-value') === theme) {
                    child.classList.add('active');
                }
            });
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
            changeThemeDropdown.setAttribute('data-bs-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            let dropdownChilds = changeThemeDropdown.childNodes[3].querySelectorAll(".dropdown-item");
            dropdownChilds.forEach((child) => {
                child.classList.remove('active');
               
                if (child.getAttribute('data-bs-theme-value') === theme) {
                    child.classList.add('active');
                     child.closest('.dropdown').firstChild.nextSibling.innerHTML = "";
                    let icon = child.firstChild.nextSibling.cloneNode(true);
                    child.closest('.dropdown').firstChild.nextSibling.appendChild(icon); 
                }
            });
        }
    };

    setTheme(getPreferredTheme());

    // Set the theme to the user-preferred theme
    document.querySelectorAll('[data-bs-theme-value]').forEach(themeOption => {
        themeOption.addEventListener('click', () => {
            const selectedTheme = themeOption.getAttribute('data-bs-theme-value');
            setStoredTheme(selectedTheme);
            setTheme(selectedTheme);
        });
    });
  })
();

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el sw', err))
}

