/**
 * TuTienda360 - Página de Seguimiento de Pedidos
 * Mobile First - Optimizado
 */

document.addEventListener('DOMContentLoaded', function() {
    loadSeguimiento();
});

/**
 * Cargar seguimiento del pedido
 */
function loadSeguimiento() {
    const urlParams = new URLSearchParams(window.location.search);
    const pedidoId = urlParams.get('id');
    
    if (!pedidoId) {
        // Buscar el último pedido del usuario
        const user = JSON.parse(localStorage.getItem('tutienda360_user'));
        if (user) {
            const allPedidos = JSON.parse(localStorage.getItem('tutienda360_orders') || '[]');
            const userPedidos = allPedidos.filter(p => p.userEmail === user.email);
            if (userPedidos.length > 0) {
                loadPedidoData(userPedidos[userPedidos.length - 1]);
                return;
            }
        }
        
        // Mostrar mensaje de error
        mostrarError();
        return;
    }
    
    // Buscar pedido por ID
    const allPedidos = JSON.parse(localStorage.getItem('tutienda360_orders') || '[]');
    const pedido = allPedidos.find(p => p.numeroPedido === pedidoId);
    
    if (pedido) {
        loadPedidoData(pedido);
    } else {
        mostrarError();
    }
}

/**
 * Cargar datos del pedido
 */
function loadPedidoData(pedido) {
    // Número de pedido
    setText('pedidoNumero', `Pedido #${pedido.numeroPedido}`);
    
    // Actualizar timeline según estado
    updateTimeline(pedido.estado);
    
    // Actualizar estado actual
    updateEstadoActual(pedido.estado);
    
    // Información de envío
    if (pedido.direccion) {
        setText('direccionEnvio', pedido.direccion);
    }
    
    // Productos
    renderProductos(pedido.items);
    
    // Resumen
    setText('resumenSubtotal', formatCurrency(pedido.subtotal || pedido.total * 0.9));
    setText('resumenEnvio', pedido.envio === 0 ? 'GRATIS' : formatCurrency(pedido.envio));
    setText('resumenTotal', formatCurrency(pedido.total));
}

/**
 * Actualizar timeline
 */
function updateTimeline(estado) {
    const steps = {
        'Confirmado': 1,
        'En proceso': 2,
        'Enviado': 3,
        'Entregado': 4
    };
    
    const currentStep = steps[estado] || 1;
    const now = new Date();
    
    // Marcar pasos completados
    for (let i = 1; i <= 4; i++) {
        const stepElement = document.getElementById(`step${i}`);
        const fechaElement = document.getElementById(`fecha${i}`);
        
        if (i <= currentStep) {
            stepElement.classList.add('completed');
            
            if (i === currentStep) {
                stepElement.classList.add('active');
                fechaElement.textContent = now.toLocaleDateString('es-PE');
            } else {
                // Fechas simuladas para pasos anteriores
                const fecha = new Date(now);
                fecha.setDate(fecha.getDate() - (currentStep - i));
                fechaElement.textContent = fecha.toLocaleDateString('es-PE');
            }
        }
    }
}

/**
 * Actualizar estado actual
 */
function updateEstadoActual(estado) {
    const estados = {
        'Confirmado': {
            icon: 'ph-check-circle',
            titulo: 'Pedido Confirmado',
            descripcion: 'Tu pedido ha sido confirmado y lo estamos preparando'
        },
        'En proceso': {
            icon: 'ph-package',
            titulo: 'En Proceso',
            descripcion: 'Estamos preparando tu pedido con cuidado'
        },
        'Enviado': {
            icon: 'ph-truck',
            titulo: 'En Camino',
            descripcion: 'Tu pedido está en camino a tu dirección'
        },
        'Entregado': {
            icon: 'ph-house',
            titulo: 'Pedido Entregado',
            descripcion: 'Tu pedido ha sido entregado exitosamente'
        }
    };
    
    const estadoData = estados[estado] || estados['Confirmado'];
    
    const iconElement = document.getElementById('estadoIcon');
    if (iconElement) {
        iconElement.className = `ph ${estadoData.icon}`;
    }
    
    setText('estadoTitulo', estadoData.titulo);
    setText('estadoDescripcion', estadoData.descripcion);
}

/**
 * Renderizar productos
 */
function renderProductos(items) {
    const container = document.getElementById('productosList');
    if (!container || !items) return;
    
    container.innerHTML = items.map(item => `
        <div class="producto-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="producto-item-info">
                <div class="producto-item-name">${item.name}</div>
                <div class="producto-item-qty">Cantidad: ${item.quantity}</div>
                <div class="producto-item-price">${formatCurrency(item.price)}</div>
            </div>
        </div>
    `).join('');
}

/**
 * Mostrar error si no hay pedido
 */
function mostrarError() {
    document.querySelector('.seguimiento-header').innerHTML = `
        <h1 class="seguimiento-title">Pedido no encontrado</h1>
        <p>No pudimos encontrar el pedido que estás buscando</p>
        <a href="perfil.html" class="btn btn-primary" style="margin-top: 1rem;">
            <i class="ph ph-arrow-left"></i>
            Volver a mis pedidos
        </a>
    `;
    
    document.querySelector('.timeline-container').innerHTML = '';
    document.querySelector('.estado-actual').innerHTML = '';
    document.querySelector('.info-envio').innerHTML = '';
    document.querySelector('.productos-pedido').innerHTML = '';
    document.querySelector('.resumen-pedido').innerHTML = '';
    document.querySelector('.action-buttons').innerHTML = '';
}

/**
 * Utilidad: Set text content
 */
function setText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
    }
}
