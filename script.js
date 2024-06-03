let cart = [];
let totalPrice = 0;

function showMenu(category) {
    const menuContent = document.getElementById('menu-content');
    if (category === 'food') {
        menuContent.innerHTML = `
            <h2>Еда</h2>
            <ul>
                <li>Пицца - $10 <button onclick="addToCart('Пицца', 10)">Добавить в корзину</button></li>
                <li>Бургер - $8 <button onclick="addToCart('Бургер', 8)">Добавить в корзину</button></li>
            </ul>
        `;
    } else if (category === 'drinks') {
        menuContent.innerHTML = `
            <h2>Напитки</h2>
            <ul>
                <li>Кола - $2 <button onclick="addToCart('Кола', 2)">Добавить в корзину</button></li>
                <li>Сок - $3 <button onclick="addToCart('Сок', 3)">Добавить в корзину</button></li>
            </ul>
        `;
    }
}

function addToCart(item, price) {
    cart.push({ item, price });
    totalPrice += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';
    cart.forEach((cartItem, index) => {
        cartItems.innerHTML += `<li>${cartItem.item} - $${cartItem.price} <button onclick="removeFromCart(${index})">Удалить</button></li>`;
    });
    totalPriceElement.innerHTML = `Итого: $${totalPrice}`;
}

function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function sendOrder() {
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }
    const orderDetails = cart.map(cartItem => `${cartItem.item} - $${cartItem.price}`).join('\n');
    const orderMessage = `Ваш заказ:\n${orderDetails}\n\nИтого: $${totalPrice}`;
    alert(orderMessage);
    Telegram.WebApp.sendData(orderMessage);  // Отправка данных в Telegram WebApp
}
