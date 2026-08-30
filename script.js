// ===========================
// GOOGLE SHEETS
// ===========================

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwkA7YL4l4YCTeLHdLbJO6u4hSqB8L5Klz5CcdEBrHxhVKqzRuI-GqkD3QmY5dP0CY/exec";


// ===========================
// ВЫБОР АВИАКОМПАНИИ
// ===========================

const airlineCards = document.querySelectorAll(".airline");
const airlineInput = document.getElementById("selectedAirline");

airlineCards.forEach(card => {

    card.addEventListener("click", () => {

        airlineCards.forEach(c => {
            c.classList.remove("active");
        });

        card.classList.add("active");

        airlineInput.value = card.dataset.airline;

    });

});


// ===========================
// РЕГИСТРАЦИЯ
// ===========================

const form = document.getElementById("checkinForm");

const popup = document.getElementById("popup");

const ticketName = document.getElementById("ticketName");

const ticketAirline = document.getElementById("ticketAirline");

const closePopup = document.getElementById("closePopup");


form.addEventListener("submit", async function(e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const status = document.getElementById("status").value;

    const comment = document.getElementById("comment").value.trim();

    const airline = airlineInput.value;


    // Проверяем имя

    if (name === "") {

        alert("Пожалуйста, введите имя.");

        return;

    }


    // Проверяем авиакомпанию

    if (airline === "") {

        alert("Пожалуйста, выберите авиакомпанию.");

        return;

    }


    // Данные для Google Таблицы

    const data = new URLSearchParams();

    data.append("name", name);

    data.append("status", status);

    data.append("airline", airline);

    data.append("comment", comment);


    try {

        // Отправляем данные в Google Sheets

        await fetch(GOOGLE_SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },

            body: data.toString()

        });


        // Показываем билет

        ticketName.textContent = name;

        ticketAirline.textContent = airline;

        popup.classList.add("show");


    } catch (error) {

        alert("Не удалось отправить регистрацию. Попробуйте ещё раз.");

        console.error(error);

    }

});


// ===========================
// ЗАКРЫТИЕ БИЛЕТА
// ===========================

closePopup.addEventListener("click", function() {

    popup.classList.remove("show");

    form.reset();

    airlineCards.forEach(card => {
        card.classList.remove("active");
    });

    airlineInput.value = "";

});


// ===========================
// ПЛАВНАЯ ПРОКРУТКА
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ===========================
// АНИМАЦИЯ СЕКЦИЙ
// ===========================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

            }

        });

    },

    {
        threshold: 0.15
    }

);


sections.forEach(section => {

    section.style.opacity = "0";

    section.style.transform =
        "translateY(50px)";

    section.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(section);

});
