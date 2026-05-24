//CAMBIO INTERRUPTOR - MODO OSCURO

//1. Selección de los elementos
const themeToggle = document.getElementById("theme-toggle")
const switchIcon = document.getElementById("switch-icon")

//2. Sonidos
const soundOn = new Audio("./sounds/switch-click-on.mp3")
const soundOff = new Audio("./sounds/switch-click-off.mp3")

//3. Cooldown para evitar spameo de clics
let canToggle = true

//Fallback
switchIcon.onerror = () => {
    switchIcon.src ="./img/switch-off.svg"
}

//Cargar tema guardado al iniciar

const savedTheme = localStorage.getItem("theme")

if(savedTheme === "dark"){
    document.body.classList.add("dark-mode")
    switchIcon.src = "./img/switch-on.svg"
}else{
    document.body.classList.remove("dark-mode")
    switchIcon.src = "./img/switch-off.svg"
}

//4. Manejar el cambio de tema
themeToggle.addEventListener("click", () =>{
    //A) Bloquea si se hace click demasiado rapido
    if(!canToggle) return
    canToggle = false
    setTimeout(() => canToggle = true, 450)

    //B) ¿Está en modo oscuro?
    const isDark = document.body.classList.contains("dark-mode")

    //C) Alterna clases
    document.body.classList.toggle("dark-mode")

    //D) Cambia icono segun modo
    if(isDark){
        switchIcon.src = "./img/switch-off.svg" //Vuelve al modo claro
        soundOff.play()
        localStorage.setItem("theme", "light")
    }else{
        switchIcon.src = "./img/switch-on.svg" //Pone modo oscuro
        soundOn.play()
        localStorage.setItem("theme", "dark")
    }
})


//MENÚ HAMBURGUESA

//Selecciono los elementos
const menuToggle = document.getElementById("menu-toggle")
const navList = document.getElementById("nav-list")
const navLinks = document.querySelectorAll(".nav-list a")

function closeMenu(){
    navList.classList.remove("nav-open")
    menuToggle.classList.remove("open")
    menuToggle.setAttribute("aria-expanded", "false")
}

//Escucha el click
menuToggle.addEventListener('click', (e) =>{
    e.stopPropagation() //Evitar que cierre de forma instantanea
    //Lógica del menu
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'

    menuToggle.setAttribute('aria-expanded', !isOpen)
    navList.classList.toggle('nav-open')
    menuToggle.classList.toggle('open')
})

navLinks.forEach(link => {
    link.addEventListener("click", () =>{
        closeMenu()
    })
})


//CLICK FUERA DEL MENÚ

document.addEventListener('click', (e) =>{
    const clickInsideMenu = navList.contains(e.target)
    const clickOnToggle = menuToggle.contains(e.target)

    if (!clickInsideMenu && !clickOnToggle) {
        closeMenu()
    }
})


//REDIRECCIÓN THANKS

const contactForm = document.querySelector('.contact-form')

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault() //Se evita el envío

    const formData = new FormData(contactForm)

    try{
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })

        if (response.ok){
            //Si el envío tiene éxito, lo redirijo
            window.location.href = '/thanks.html'
        }
    }catch (error){
        console.error('Error al enviar el formulario', error)
    }
})


//SCROLL REVEAL LIBRERIA

ScrollReveal({ 
    distance: '40px',
    duration: 1200,
    easing: 'ease-out',
    opacity: 0,
    reset: false 
});

ScrollReveal().reveal('.hero-text', { origin: 'left' });
ScrollReveal().reveal('.hero-image', { origin: 'right', delay: 200 });

ScrollReveal().reveal('.projects-title', {
    origin: 'bottom',
    delay: 100
});


ScrollReveal().reveal('.profile-title', {
    origin: 'bottom',
    delay: 100
});

ScrollReveal().reveal('.split-box', {
    origin: 'bottom',
    interval: 150
});


ScrollReveal().reveal('.about-container', { origin: 'bottom', interval: 150 });
ScrollReveal().reveal('.tech-grid, .tools-grid', { origin: 'bottom', interval: 100 });
ScrollReveal().reveal('.contact-title, .contact-form', { origin: 'bottom', interval: 120 });