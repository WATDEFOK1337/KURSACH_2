// =======================
// Модалки товара и уведомлений
// =======================
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const closeBtn = modal.querySelector('.close');
const addToCartBtn = document.getElementById('add-to-cart');

const addModal = document.getElementById('add-modal');
const addModalText = document.getElementById('add-modal-text');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutModalText = document.getElementById('checkout-modal-text');
const paidModal = document.getElementById('paid-modal');
const paidModalText = document.getElementById('paid-modal-text');
const payBtn = document.getElementById('pay-btn');

// =======================
// Закрытие всех модалок по крестику
// =======================
document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.parentElement.classList.add('hidden');
    });
});

// =======================
// Открытие модалки товара
// =======================
document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        modalImage.src = card.querySelector('img').src;
        modalTitle.textContent = card.dataset.name;
        modalDesc.textContent = card.dataset.desc;
        modalPrice.textContent = card.dataset.price;
        modal.classList.remove('hidden');
    });
});

modal.addEventListener('click', e => {
    if(e.target === modal) modal.classList.add('hidden');
});

// =======================
// Корзина
// =======================
const cart = [];
const cartBtn = document.getElementById('cart-btn');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

cartBtn.addEventListener('click', () => {
    cartDropdown.classList.toggle('hidden');
});

function updateCartUI() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.img}" alt="${item.name}" width="50">
            ${item.name} - ${item.price} ₽
            <button class="remove-item" data-index="${index}">✖</button>
        `;
        cartItems.appendChild(li);
    });
    cartCount.textContent = cart.length;
    cartTotal.textContent = total;

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = e.target.dataset.index;
            cart.splice(idx, 1);
            updateCartUI();
        });
    });
}

// =======================
// Добавление товара с модальным уведомлением
// =======================
addToCartBtn.addEventListener('click', () => {
    const product = {
        name: modalTitle.textContent,
        price: Number(modalPrice.textContent),
        img: modalImage.src
    };
    cart.push(product);
    updateCartUI();
    modal.classList.add('hidden');

    addModalText.textContent = `${product.name} добавлен(а) в корзину!`;
    addModal.classList.remove('hidden');
});

// =======================
// Оформление заказа с модальным уведомлением
// =======================
checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0){
        addModalText.textContent = "Корзина пуста!";
        addModal.classList.remove('hidden');
    } else {
        checkoutModalText.textContent = `Вы собираетесь оплатить ${cart.length} товаров на сумму ${cartTotal.textContent} ₽`;
        checkoutModal.classList.remove('hidden');
    }
});

// =======================
// Оплата с модальным уведомлением
// =======================
payBtn.addEventListener('click', () => {
    paidModalText.textContent = `Оплата прошла успешно! Всего товаров: ${cart.length}, сумма: ${cartTotal.textContent} ₽`;
    paidModal.classList.remove('hidden');

    // Очистка корзины
    cart.length = 0;
    updateCartUI();
    checkoutModal.classList.add('hidden');
    cartDropdown.classList.add('hidden');
});
