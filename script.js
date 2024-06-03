function showMenu(category) {
    const menuContent = document.getElementById('menu-content');
    if (category === 'food') {
        menuContent.innerHTML = `
            <h2>Еда</h2>
            <ul>
                <li>Пицца - $10</li>
                <li>Бургер - $8</li>
            </ul>
        `;
    } else if (category === 'drinks') {
        menuContent.innerHTML = `
            <h2>Напитки</h2>
            <ul>
                <li>Кола - $2</li>
                <li>Сок - $3</li>
            </ul>
        `;
    }
}
