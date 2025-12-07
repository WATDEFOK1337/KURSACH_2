// Проверяем вход
const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "account.html";
}

// Имя пользователя
document.getElementById("username").textContent = currentUser;

// ====== АДРЕС ======
const addressInput = document.getElementById("address");
const saveAddressBtn = document.getElementById("save-address");
const statusText = document.getElementById("address-status");

// Загружаем сохранённый адрес
const savedAddress = localStorage.getItem(currentUser + "_address");

if (savedAddress) {
    addressInput.value = savedAddress;
}

saveAddressBtn.addEventListener("click", () => {
    localStorage.setItem(currentUser + "_address", addressInput.value);
    statusText.textContent = "Адрес сохранён!";
    setTimeout(() => statusText.textContent = "", 2000);
});

// ====== ЗАКАЗЫ ======
const ordersList = document.getElementById("orders-list");
const noOrdersText = document.getElementById("no-orders");

const orders = JSON.parse(localStorage.getItem(currentUser + "_orders") || "[]");

if (orders.length === 0) {
    noOrdersText.classList.remove("hidden");
} else {
    orders.forEach(order => {
        const li = document.createElement("li");
        li.className = "order-item";
        li.innerHTML = `
            <strong>Заказ №${order.id}</strong><br>
            Товаров: ${order.count}<br>
            Цена: ${order.total} ₽<br>
            Статус: <span class="text-emerald-600 font-bold">${order.status}</span>
        `;
        ordersList.appendChild(li);
    });
}

// ====== ВЫХОД ======
document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
});
