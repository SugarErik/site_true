let cart = {};
let totalPrice = 0;

function showMenu(category) {
    const menuContent = document.getElementById('menu-content');
    if (category === 'food') {
        menuContent.innerHTML = `
            <div class="menu-item">
                <h3>Пицца</h3>
                <p>$10</p>
                <button onclick="addToCart('Пицца', 10)">Добавить в корзину</button>
            </div>
            <div class="menu-item">
                <h3>Бургер</h3>
                <p>$8</p>
                <button onclick="addToCart('Бургер', 8)">Добавить в корзину</button>
            </div>
        `;
    } else if (category === 'drinks') {
        menuContent.innerHTML = `
            <div class="menu-item">
                <h3>Кола</h3>
                <p>$2</p>
                <button onclick="addToCart('Кола', 2)">Добавить в корзину</button>
            </div>
            <div class="menu-item">
                <h3>Сок</h3>
                <p>$3</p>
                <button onclick="addToCart('Сок', 3)">Добавить в корзину</button>
            </div>
        `;
    }
}

function addToCart(item, price) {
    if (cart[item]) {
        cart[item].quantity += 1;
    } else {
        cart[item] = { price, quantity: 1 };
    }
    totalPrice += price;
    updateCart();
}

function removeFromCart(item) {
    if (cart[item]) {
        totalPrice -= cart[item].price;
        cart[item].quantity -= 1;
        if (cart[item].quantity <= 0) {
            delete cart[item];
        }
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';
    for (let item in cart) {
        cartItems.innerHTML += `<li>${item} x${cart[item].quantity} - $${cart[item].price * cart[item].quantity} <button onclick="removeFromCart('${item}')">Удалить</button></li>`;
    }
    totalPriceElement.innerHTML = `Итого: $${totalPrice}`;
}

function sendOrder() {
    if (Object.keys(cart).length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }
    const orderDetails = Object.keys(cart).map(item => `${item} x${cart[item].quantity} - $${cart[item].price * cart[item].quantity}`).join('\n');
    const orderMessage = `Ваш заказ:\n${orderDetails}\n\nИтого: $${totalPrice}`;
    alert(orderMessage);
    Telegram.WebApp.sendData(orderMessage);  // Отправка данных в Telegram WebApp
}
