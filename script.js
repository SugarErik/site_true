function showMenu(category) {
    const menuContent = document.getElementById('menu-content');
    if (category === 'food') {
        menuContent.innerHTML = `
            <h2>Еда</h2>
            <ul>
                <li>Пицца - $10 <button onclick="order('Пицца', 10)">Заказать</button></li>
                <li>Бургер - $8 <button onclick="order('Бургер', 8)">Заказать</button></li>
            </ul>
        `;
    } else if (category === 'drinks') {
        menuContent.innerHTML = `
            <h2>Напитки</h2>
            <ul>
                <li>Кола - $2 <button onclick="order('Кола', 2)">Заказать</button></li>
                <li>Сок - $3 <button onclick="order('Сок', 3)">Заказать</button></li>
            </ul>
        `;
    }
}

function order(item, price) {
    const orderDetails = `Вы заказали: ${item} за $${price}`;
    alert(orderDetails);
    Telegram.WebApp.sendData(orderDetails);  // Отправка данных в Telegram WebApp
}
