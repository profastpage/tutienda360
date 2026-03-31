/**
 * TuTienda360 - Página de Perfil
 * Mobile First - Optimizado
 */

document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadPedidos();
    initTabs();
});

/**
 * Cargar datos del usuario
 */
function loadUserData() {
    const user = JSON.parse(localStorage.getItem('tutienda360_user'));
    
    if (!user) {
        // Redirigir al login si no hay usuario
        window.location.href = 'login.html';
        return;
    }
    
    // Actualizar header
    setText('userName', user.nombre || 'Usuario');
    setText('userEmail', user.email || '');
    
    // Cargar formulario
    setText('formNombre', user.nombre || '');
    setText('formEmail', user.email || '');
    setText('formTelefono', user.telefono || '');
}

/**
 * Cargar pedidos del usuario
 */
function loadPedidos() {
    const user = JSON.parse(localStorage.getItem('tutienda360_user'));
    const pedidosEmpty = document.getElementById('pedidosEmpty');
    const pedidosList = document.getElementById('pedidosList');
    
    if (!user) return;
    
    // Obtener pedidos del localStorage
    const allPedidos = JSON.parse(localStorage.getItem('tutienda360_orders') || '[]');
    const userPedidos = allPedidos.filter(p => p.userEmail === user.email);
    
    if (userPedidos.length === 0) {
        if (pedidosEmpty) pedidosEmpty.style.display = 'flex';
        if (pedidosList) pedidosList.innerHTML = '';
        return;
    }
    
    if (pedidosEmpty) pedidosEmpty.style.display = 'none';
    
    // Renderizar pedidos
    if (pedidosList) {
        pedidosList.innerHTML = userPedidos.reverse().map(pedido => `
            <div class="pedido-card">
                <div class="pedido-header">
                    <div>
                        <div class="pedido-id">Pedido #${pedido.numeroPedido}</div>
                        <div class="pedido-fecha">${formatDate(pedido.fecha)}</div>
                    </div>
                    <span class="pedido-status ${getStatusClass(pedido.estado)}">${pedido.estado}</span>
                </div>
                <div class="pedido-items">
                    ${pedido.items.slice(0, 3).map(item => `
                        <div class="pedido-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="pedido-item-info">
                                <div class="pedido-item-name">${item.name}</div>
                                <div class="pedido-item-qty">Cantidad: ${item.quantity}</div>
                            </div>
                        </div>
                    `).join('')}
                    ${pedido.items.length > 3 ? `
                        <div class="pedido-ver-mas" onclick="verMasProductos('${pedido.numeroPedido}')">
                            +${pedido.items.length - 3} productos más
                        </div>
                    ` : ''}
                </div>
                <div class="pedido-footer">
                    <div class="pedido-total">Total: ${formatCurrency(pedido.total)}</div>
                    <button class="pedido-ver-mas" onclick="verDetallePedido('${pedido.numeroPedido}')">
                        Ver detalle
                    </button>
                </div>
            </div>
        `).join('');
    }
}

/**
 * Inicializar tabs
 */
function initTabs() {
    const tabs = document.querySelectorAll('.perfil-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remover active de todos
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            
            // Agregar active al seleccionado
            this.classList.add('active');
            document.getElementById(tabId)?.classList.add('active');
        });
    });
    
    // Manejar formulario
    const form = document.getElementById('perfilForm');
    if (form) {
        form.addEventListener('submit', saveUserData);
    }
}

/**
 * Guardar datos del usuario
 */
function saveUserData(e) {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('tutienda360_user'));
    if (!user) return;
    
    // Actualizar datos
    user.nombre = document.getElementById('formNombre').value;
    user.email = document.getElementById('formEmail').value;
    user.telefono = document.getElementById('formTelefono').value;
    
    // Guardar en localStorage
    localStorage.setItem('tutienda360_user', JSON.stringify(user));
    
    // Actualizar lista de usuarios
    const users = JSON.parse(localStorage.getItem('tutienda360_users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex > -1) {
        users[userIndex] = user;
        localStorage.setItem('tutienda360_users', JSON.stringify(users));
    }
    
    if (typeof Toast !== 'undefined') {
        Toast.success('Datos actualizados correctamente');
    }
}

/**
 * Cerrar sesión
 */
function logout() {
    localStorage.removeItem('tutienda360_user');
    
    if (typeof Toast !== 'undefined') {
        Toast.info('Sesión cerrada');
    }
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 500);
}

/**
 * Ver más productos
 */
function verMasProductos(pedidoId) {
    if (typeof Toast !== 'undefined') {
        Toast.info(`Mostrando detalles del pedido #${pedidoId}`);
    }
}

/**
 * Ver detalle de pedido
 */
function verDetallePedido(pedidoId) {
    if (typeof Toast !== 'undefined') {
        Toast.info(`Detalle del pedido #${pedidoId}`);
    }
}

/**
 * Utilidad: Set text content
 */
function setText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        if (element.tagName === 'INPUT') {
            element.value = text;
        } else {
            element.textContent = text;
        }
    }
}

/**
 * Utilidad: Formatear fecha
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Utilidad: Clase de estado
 */
function getStatusClass(estado) {
    const classes = {
        'En proceso': 'proceso',
        'Enviado': 'enviado',
        'Entregado': 'entregado'
    };
    return classes[estado] || 'proceso';
}

// Hacer funciones globales
window.logout = logout;
window.verMasProductos = verMasProductos;
window.verDetallePedido = verDetallePedido;
