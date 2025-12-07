// Переключение вкладок
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

loginTab.onclick = () => {
    loginTab.classList.add("tab-active");
    registerTab.classList.remove("tab-active");
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
};

registerTab.onclick = () => {
    registerTab.classList.add("tab-active");
    loginTab.classList.remove("tab-active");
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
};


// ----------- РЕГИСТРАЦИЯ ----------------
document.getElementById("register-btn").onclick = () => {
    const email = document.getElementById("reg-email").value.trim();
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const msg = document.getElementById("info-message");

    if (!email || !username || !password) {
        msg.textContent = "Заполните все поля!";
        msg.className = "text-red-600 text-center";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find(u => u.username === username)) {
        msg.textContent = "Пользователь с таким логином уже существует!";
        msg.className = "text-red-600 text-center";
        return;
    }

    users.push({
        username,
        email,
        password,
        address: "",
        orders: []
    });

    localStorage.setItem("users", JSON.stringify(users));

    msg.textContent = "Регистрация успешна! Теперь войдите.";
    msg.className = "text-green-600 text-center";
};


// ----------- ВХОД ----------------
document.getElementById("login-btn").onclick = () => {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const msg = document.getElementById("info-message");

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        msg.textContent = "Неверный логин или пароль!";
        msg.className = "text-red-600 text-center";
        return;
    }

    // Сохраняем авторизованного пользователя
    localStorage.setItem("currentUser", username);

    // Переход в профиль
    window.location.href = "profile.html";
};
// ====== ВЫХОД ======
document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
});
