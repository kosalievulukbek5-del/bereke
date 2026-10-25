const products = [
    {
        id: 1,
        name: "Молоко",
        price: 85,
        image: "images/milk.jpg"
    },
    {
        id: 2,
        name: "Хлеб",
        price: 30,
        image: "images/bread.jpg"
    },
    {
        id: 3,
        name: "Яйца",
        price: 17,
        image: "images/eggs.jpg"
    },
    {
        id: 4,
        name: "Мясо",
        price: 950,
        image: "images/meat.jpg"
    },
    {
        id: 5,
        name: "Рис",
        price: 120,
        image: "images/rice.jpg"
    }
];


const catalogList = document.getElementById("catalog-list");
const favoriteResult = document.getElementById("favorite-result");


products.forEach(function(product) {

    const card = document.createElement("article");
    card.className = "card product-card h-100";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.className = "card-img-top";

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "card-text";
    price.textContent = "Цена: " + product.price + " сом";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-outline-success";
    button.textContent = "В избранное";

    button.addEventListener("click", function() {
        try {
            localStorage.setItem(
                "berekeFavorite",
                String(product.id)
            );

            showFavorite();
        } catch (error) {
            favoriteResult.textContent =
                "Не удалось сохранить товар в браузере.";
        }
    });

    body.appendChild(title);
    body.appendChild(price);
    body.appendChild(button);

    card.appendChild(image);
    card.appendChild(body);

    catalogList.appendChild(card);
});


function showFavorite() {
    try {
        const savedId = localStorage.getItem("berekeFavorite");

        const favoriteProduct = products.find(function(product) {
            return String(product.id) === savedId;
        });

        if (favoriteProduct) {
            favoriteResult.textContent =
                "Избранный товар: " + favoriteProduct.name;
        } else {
            favoriteResult.textContent =
                "Избранных товаров пока нет.";
        }
    } catch (error) {
        favoriteResult.textContent =
            "Хранилище браузера недоступно.";
    }
}

showFavorite();


const clearButton = document.getElementById("clear-favorite");

clearButton.addEventListener("click", function() {
    try {
        localStorage.removeItem("berekeFavorite");
        showFavorite();
    } catch (error) {
        favoriteResult.textContent =
            "Не удалось очистить избранное.";
    }
});


const productInfo = document.getElementById("product-info");
let productTimer;

document.querySelectorAll(".details-btn")
    .forEach(function(button) {

        button.addEventListener("click", function() {

            const card = button.closest(".product-card");
            const name = card.querySelector("h3").textContent;

            productInfo.textContent =
                "Вы выбрали товар: " + name;

            clearTimeout(productTimer);

            productTimer = setTimeout(function() {
                productInfo.textContent = "";
            }, 3000);
        });
    });


const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

let messageTimer;

function showFormMessage(text, isSuccess) {
    clearTimeout(messageTimer);

    formMessage.textContent = text;

    formMessage.className = isSuccess
        ? "mt-3 message-success"
        : "mt-3 message-error";

    messageTimer = setTimeout(function() {
        formMessage.textContent = "";
    }, 3000);
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
        showFormMessage(
            "Ошибка! Пожалуйста, заполните все поля.",
            false
        );
        return;
    }

    if (!emailInput.checkValidity()) {
        showFormMessage(
            "Пожалуйста, введите правильный Email.",
            false
        );
        return;
    }

    showFormMessage(
        "Форма успешно проверена! Это демонстрация без отправки на сервер.",
        true
    );

    form.reset();
});

console.log("Магазин Береке успешно запущен!");
console.log("Количество товаров:", products.length);
