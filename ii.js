let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
let currentChatId = null;

window.onload = function() {
    renderHistory();
    if (chatHistory.length > 0) {
        loadChat(chatHistory[0].id);
    } else {
        showEmptyState();
    }
};

function showEmptyState() {
    const natija = document.getElementById('natija');
    natija.innerHTML = `
        <div class="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <p>Начните новый разговор</p>
        </div>
    `;
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.querySelector('.overlay').classList.toggle('active');
}

function newChat() {
    currentChatId = null;
    showEmptyState();
    document.getElementById('savol').value = '';
    
    document.querySelectorAll('.history-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

function saveToHistory(message, isUser = true) {
    if (!currentChatId) {
        currentChatId = Date.now().toString();
        const title = message.substring(0, 30) + (message.length > 30 ? '...' : '');
        chatHistory.unshift({
            id: currentChatId,
            title: title,
            timestamp: new Date().toISOString(),
            messages: []
        });
    }
    
    const chat = chatHistory.find(c => c.id === currentChatId);
    if (chat) {
        chat.messages.push({
            text: message,
            isUser: isUser,
            time: new Date().toISOString()
        });
        if (chat.messages.length === 1 && isUser) {
            chat.title = message.substring(0, 30) + (message.length > 30 ? '...' : '');
        }
    }
    
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    renderHistory();
}

function renderHistory() {
    const list = document.getElementById('historyList');
    if (chatHistory.length === 0) {
        list.innerHTML = '<div style="color: #8E8EA0; padding: 20px; text-align: center; font-size: 0.85rem;">Нет истории</div>';
        return;
    }
    
    list.innerHTML = chatHistory.map(chat => `
        <div class="history-item ${chat.id === currentChatId ? 'active' : ''}" onclick="loadChat('${chat.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span class="history-text">${escapeHtml(chat.title)}</span>
            <div class="history-actions" onclick="event.stopPropagation()">
                <button class="action-btn" onclick="deleteChat('${chat.id}')" title="Удалить">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

function loadChat(chatId) {
    currentChatId = chatId;
    const chat = chatHistory.find(c => c.id === chatId);
    
    if (chat && chat.messages.length > 0) {
        const natija = document.getElementById('natija');
        natija.innerHTML = '';
        
        chat.messages.forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${msg.isUser ? 'user' : 'bot'}`;
            msgDiv.innerHTML = `
                <div class="avatar">${msg.isUser ? 'You' : 'AI'}</div>
                <div class="message-content">${escapeHtml(msg.text)}</div>
            `;
            natija.appendChild(msgDiv);
        });
        
        // Прокрутка вниз с небольшой задержкой
        setTimeout(() => {
            natija.scrollTop = natija.scrollHeight;
        }, 50);
    } else {
        showEmptyState();
    }
    
    renderHistory();
    
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

function deleteChat(chatId) {
    chatHistory = chatHistory.filter(c => c.id !== chatId);
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    
    if (currentChatId === chatId) {
        newChat();
    } else {
        renderHistory();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function Yubor() {
    let savol = document.getElementById("savol");
    let token = "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";
    let natija = document.getElementById('natija');
    let message = savol.value.trim();
    
    if (!message) return;
    
    // Убрать empty state если есть
    const emptyState = natija.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    // Добавить сообщение пользователя
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerHTML = `
        <div class="avatar">You</div>
        <div class="message-content">${escapeHtml(message)}</div>
    `;
    natija.appendChild(userMsg);
    
    // Сохранить в историю
    saveToHistory(message, true);
    
    // Очистить input и прокрутить
    savol.value = '';
    savol.style.height = 'auto';
    natija.scrollTop = natija.scrollHeight;
    
    // Показать индикатор загрузки
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'message bot';
    loadingMsg.id = 'loading-msg';
    loadingMsg.innerHTML = `
        <div class="avatar">AI</div>
        <div class="message-content">Думаю...</div>
    `;
    natija.appendChild(loadingMsg);
    natija.scrollTop = natija.scrollHeight;
    
    // Отправить запрос
    fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {
                    "role": "system",
                    "content": "Sen kuchli AI agentsan. Savollarga o'zbekcha javob berasan"
                },
                {
                    "role": "user",
                    "content": message
                }
            ]
        })
    })
    .then(malumot => {
        if (!malumot.ok) throw new Error('API error');
        return malumot.json();
    })
    .then(data => {
        // Удалить индикатор загрузки
        const loading = document.getElementById('loading-msg');
        if (loading) loading.remove();
        
        const botResponse = data.choices[0].message.content;
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot';
        botMsg.innerHTML = `
            <div class="avatar">AI</div>
            <div class="message-content">${escapeHtml(botResponse)}</div>
        `;
        natija.appendChild(botMsg);
        saveToHistory(botResponse, false);
        natija.scrollTop = natija.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
        const loading = document.getElementById('loading-msg');
        if (loading) loading.remove();
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'message bot';
        errorMsg.innerHTML = `
            <div class="avatar">AI</div>
            <div class="message-content">Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.</div>
        `;
        natija.appendChild(errorMsg);
        natija.scrollTop = natija.scrollHeight;
    });
}

function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        Yubor();
    }
}

// Авто-ресайз textarea
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('savol');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 200) + 'px';
        });
    }
});
