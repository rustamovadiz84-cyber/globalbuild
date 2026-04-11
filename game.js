// Игровые данные
    const gameState = {
        money: 1000,
        level: 1,
        exp: 0,
        expToNext: 100,
        customersToday: 0,
        totalCustomers: 0,
        reputation: 50
    };

    const products = [
        { id: 'cement', name: 'Цемент', icon: '🏗️', buyPrice: 50, sellPrice: 80, stock: 0, maxStock: 50 },
        { id: 'bricks', name: 'Кирпичи', icon: '🧱', buyPrice: 30, sellPrice: 50, stock: 0, maxStock: 100 },
        { id: 'wood', name: 'Доски', icon: '🪵', buyPrice: 40, sellPrice: 65, stock: 0, maxStock: 80 },
        { id: 'paint', name: 'Краска', icon: '🎨', buyPrice: 100, sellPrice: 150, stock: 0, maxStock: 30 },
        { id: 'tools', name: 'Инструменты', icon: '🔧', buyPrice: 200, sellPrice: 300, stock: 0, maxStock: 20 },
        { id: 'pipes', name: 'Трубы', icon: '🔩', buyPrice: 80, sellPrice: 120, stock: 0, maxStock: 40 }
    ];

    const upgrades = [
        { id: 'shelf', name: 'Расширить полки', desc: '+20 мест на складе', cost: 500, bought: false, effect: () => expandStorage() },
        { id: 'marketing', name: 'Реклама', desc: 'Клиенты приходят чаще', cost: 300, bought: false, effect: () => boostMarketing() },
        { id: 'quality', name: 'Качество обслуживания', desc: 'Больше чаевых', cost: 800, bought: false, effect: () => improveQuality() },
        { id: 'delivery', name: 'Быстрая доставка', desc: 'Скидка на закупки 10%', cost: 1000, bought: false, effect: () => fastDelivery() }
    ];

    const customerNames = ['Александр', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Елена', 'Иван', 'Ольга'];
    const customerAvatars = ['👷', '👷‍♀️', '👨‍🔧', '👩‍🔧', '🏠', '🏢', '🔨', '🪚'];

    let customers = [];
    let customerTimer = null;
    let gameInterval = null;

    // Инициализация
    function init() {
        renderProducts();
        renderUpgrades();
        updateStats();
        startGameLoop();
        document.getElementById('welcomeModal').classList.add('active');
        addLog('Магазин открыт! Удачи в бизнесе!', 'info');
    }

    function closeModal() {
        document.getElementById('welcomeModal').classList.remove('active');
    }

    // Отрисовка товаров
    function renderProducts() {
        const grid = document.getElementById('productsGrid');
        grid.innerHTML = products.map(p => `
            <div class="product-card" onclick="buyProduct('${p.id}')">
                <div class="product-icon">${p.icon}</div>
                <div class="product-name">${p.name}</div>
                <div class="product-price">Купить: ${p.buyPrice} ₽</div>
                <div class="product-stock">На складе: ${p.stock}/${p.maxStock}</div>
                <button class="btn">Закупить</button>
            </div>
        `).join('');
    }

    // Отрисовка улучшений
    function renderUpgrades() {
        const list = document.getElementById('upgradesList');
        list.innerHTML = upgrades.map(u => `
            <div class="upgrade-item" style="${u.bought ? 'opacity: 0.5;' : ''}">
                <div class="upgrade-info">
                    <h4>${u.name} ${u.bought ? '✅' : ''}</h4>
                    <p>${u.desc}</p>
                </div>
                <button class="btn btn-secondary" onclick="buyUpgrade('${u.id}')" ${u.bought || gameState.money < u.cost ? 'disabled' : ''}>
                    ${u.bought ? 'Куплено' : u.cost + ' ₽'}
                </button>
            </div>
        `).join('');
    }

    // Покупка товара
    function buyProduct(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        if (product.stock >= product.maxStock) {
            addLog(`Склад полон! Нельзя купить больше ${product.name}`, 'error');
            return;
        }

        if (gameState.money < product.buyPrice) {
            addLog('Недостаточно денег!', 'error');
            return;
        }

        gameState.money -= product.buyPrice;
        product.stock++;
        updateStats();
        renderProducts();
        addLog(`Закуплено: ${product.name}`, 'success');
        showFloatingText(`-${product.buyPrice} ₽`, event.clientX, event.clientY, 'money');
    }

    // Покупка улучшения
    function buyUpgrade(upgradeId) {
        const upgrade = upgrades.find(u => u.id === upgradeId);
        if (!upgrade || upgrade.bought || gameState.money < upgrade.cost) return;

        gameState.money -= upgrade.cost;
        upgrade.bought = true;
        upgrade.effect();
        updateStats();
        renderUpgrades();
        addLog(`Куплено улучшение: ${upgrade.name}!`, 'success');
    }

    // Эффекты улучшений
    function expandStorage() {
        products.forEach(p => p.maxStock += 20);
        renderProducts();
    }

    function boostMarketing() {
        // Увеличивает шанс появления клиентов
    }

    function improveQuality() {
        gameState.reputation += 20;
    }

    function fastDelivery() {
        products.forEach(p => p.buyPrice = Math.floor(p.buyPrice * 0.9));
        renderProducts();
    }

    // Система клиентов
    function spawnCustomer() {
        if (customers.length >= 5) return;
        
        const availableProducts = products.filter(p => p.stock > 0);
        if (availableProducts.length === 0) return;

        const product = availableProducts[Math.floor(Math.random() * availableProducts.length)];
        const amount = Math.floor(Math.random() * Math.min(3, product.stock)) + 1;
        
        const customer = {
            id: Date.now() + Math.random(),
            name: customerNames[Math.floor(Math.random() * customerNames.length)],
            avatar: customerAvatars[Math.floor(Math.random() * customerAvatars.length)],
            productId: product.id,
            productName: product.name,
            amount: amount,
            patience: 100,
            maxPatience: 100 + (gameState.reputation * 2)
        };

        customers.push(customer);
        renderCustomers();
        addLog(`${customer.name} хочет купить ${amount} ${product.name}`, 'info');
    }

    function renderCustomers() {
        const queue = document.getElementById('customerQueue');
        if (customers.length === 0) {
            queue.innerHTML = '<p style="color: #666; text-align: center; padding: 40px;">Клиенты появятся скоро...</p>';
            return;
        }

        queue.innerHTML = customers.map(c => `
            <div class="customer" onclick="serveCustomer(${c.id})">
                <div class="customer-avatar">${c.avatar}</div>
                <div class="customer-info">
                    <div class="customer-name">${c.name}</div>
                    <div class="customer-want">Хочет: ${c.amount} × ${c.productName}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(c.patience / c.maxPatience) * 100}%; background: ${c.patience < 30 ? '#e74c3c' : '#f39c12'}"></div>
                    </div>
                </div>
                <button class="btn" style="width: auto; padding: 8px 16px;">Продать</button>
            </div>
        `).join('');
    }

    function serveCustomer(customerId) {
        const customerIndex = customers.findIndex(c => c.id === customerId);
        if (customerIndex === -1) return;

        const customer = customers[customerIndex];
        const product = products.find(p => p.id === customer.productId);

        if (product.stock < customer.amount) {
            addLog(`Недостаточно ${product.name} на складе!`, 'error');
            return;
        }

        // Продажа
        const totalPrice = product.sellPrice * customer.amount;
        const tip = Math.floor(totalPrice * (gameState.reputation / 200));
        const total = totalPrice + tip;

        gameState.money += total;
        product.stock -= customer.amount;
        gameState.customersToday++;
        gameState.totalCustomers++;
        
        // Опыт
        const expGain = 10 * customer.amount;
        gameState.exp += expGain;

        // Удаление клиента
        customers.splice(customerIndex, 1);
        
        updateStats();
        renderProducts();
        renderCustomers();
        
        addLog(`Продано ${customer.amount} ${product.name} за ${total} ₽ ${tip > 0 ? '(+' + tip + ' чаевые)' : ''}`, 'success');
        showFloatingText(`+${total} ₽`, event.clientX, event.clientY, 'money');
        showFloatingText(`+${expGain} XP`, event.clientX, event.clientY - 30, 'exp');

        checkLevelUp();
    }

    // Обновление статистики
    function updateStats() {
        document.getElementById('money').textContent = gameState.money + ' ₽';
        document.getElementById('totalStock').textContent = products.reduce((sum, p) => sum + p.stock, 0);
        document.getElementById('customersToday').textContent = gameState.customersToday;
        document.getElementById('level').textContent = gameState.level;
    }

    // Проверка уровня
    function checkLevelUp() {
        if (gameState.exp >= gameState.expToNext) {
            gameState.level++;
            gameState.exp -= gameState.expToNext;
            gameState.expToNext = Math.floor(gameState.expToNext * 1.5);
            
            document.getElementById('levelUpAnim').classList.add('active');
            setTimeout(() => {
                document.getElementById('levelUpAnim').classList.remove('active');
            }, 2000);
            
            addLog(`🎉 Новый уровень! Теперь ты уровень ${gameState.level}!`, 'success');
            
            // Бонус за уровень
            gameState.money += 100 * gameState.level;
            updateStats();
        }
    }

    // Игровой цикл
    function startGameLoop() {
        // Спавн клиентов
        customerTimer = setInterval(() => {
            const chance = upgrades.find(u => u.id === 'marketing').bought ? 0.4 : 0.2;
            if (Math.random() < chance) {
                spawnCustomer();
            }
        }, 3000);

        // Уменьшение терпения клиентов
        gameInterval = setInterval(() => {
            customers = customers.filter(c => {
                c.patience -= 2;
                if (c.patience <= 0) {
                    addLog(`${c.name} ушёл, не дождавшись!`, 'error');
                    gameState.reputation = Math.max(0, gameState.reputation - 5);
                    return false;
                }
                return true;
            });
            renderCustomers();
        }, 1000);
    }

    // Журнал
    function addLog(message, type = 'info') {
        const log = document.getElementById('gameLog');
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        log.insertBefore(entry, log.firstChild);
        
        // Ограничение истории
        while (log.children.length > 20) {
            log.removeChild(log.lastChild);
        }
    }

    // Визуальные эффекты
    function showFloatingText(text, x, y, type) {
        const el = document.createElement('div');
        el.className = `floating-text ${type}`;
        el.textContent = text;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1000);
    }

    // Запуск игры
    window.onload = init;