let cart = {};
let totalPrice = 0;

function showMenu(category) {
    const menuContent = document.getElementById('menu-content');
    if (category === 'food') {
        menuContent.innerHTML = `
            <h2>Еда</h2>
            <ul>
                <li>
                    Пицца - $10 
                    <input type="number" id="pizza-quantity" min="1" value="1">
                    <button onclick="addToCart('Пицца', 10, document.getElementById('pizza-quantity').value)">Добавить в корзину</button>
                </li>
                <li>
                    Бургер - $8 
                    <input type="number" id="burger-quantity" min="1" value="1">
                    <button onclick="addToCart('Бургер', 8, document.getElementById('burger-quantity').value)">Добавить в корзину</button>
                </li>
            </ul>
        `;
    } else if (category === 'drinks') {
        menuContent.innerHTML = `
            <h2>Напитки</h2>
            <ul>
                <li>
                    Кола - $2 
                    <input type="number" id="cola-quantity" min="1" value="1">
                    <button onclick="addToCart('Кола', 2, document.getElementById('cola-quantity').value)">Добавить в корзину</button>
                </li>
                <li>
                    Сок - $3 
                    <input type="number" id="juice-quantity" min="1" value="1">
                    <button onclick="addToCart('Сок', 3, document.getElementById('juice-quantity').value)">Добавить в корзину</button>
                </li>
            </ul>
        `;
    }
}

function addToCart(item, price, quantity) {
    quantity = parseInt(quantity);
    if (cart[item]) {
        cart[item].quantity += quantity;
    } else {
        cart[item] = { price, quantity };
    }
    totalPrice += price * quantity;
    updateCart();
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

function removeFromCart(item) {
    totalPrice -= cart[item].price * cart[item].quantity;
    delete cart[item];
    updateCart();
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
