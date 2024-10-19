let items = JSON.parse(localStorage.getItem('shoppingItems')) || [];

function renderList() {
    const list = document.getElementById('shoppingList');
    list.innerHTML = '';
    
    if (items.length === 0) {
        list.innerHTML = '<div class="empty-list">Sua lista está vazia</div>';
        return;
    }

    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = `shopping-item ${item.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${item.completed ? 'checked' : ''} 
                   onclick="toggleComplete(${index})">
            <span>${item.text}</span>
            <button class="delete-btn" onclick="deleteItem(${index})">Deletar</button>
        `;
        list.appendChild(li);
    });
    
    saveToLocalStorage();
}

function addItem() {
    const input = document.getElementById('itemInput');
    const text = input.value.trim();
    
    if (text) {
        items.push({ text, completed: false });
        input.value = '';
        renderList();
    }
}

function deleteItem(index) {
    items.splice(index, 1);
    renderList();
}

function toggleComplete(index) {
    items[index].completed = !items[index].completed;
    renderList();
}

function saveToLocalStorage() {
    localStorage.setItem('shoppingItems', JSON.stringify(items));
}

document.getElementById('itemInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addItem();
    }
});

// Inicializar a lista
renderList();