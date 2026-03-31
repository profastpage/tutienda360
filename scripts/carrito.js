/**
 * TuTienda360 - Página de Carrito
 * Gestión completa del carrito de compras
 */

// ========================================
// Estado del Carrito
// ========================================

let cartItems = [];
let discount = 0;
let discountCode = null;

// ========================================
// Renderizado del Carrito
// ========================================

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    
    cartItems = Cart.get();
    
    if (cartItems.length === 0) {
        cartItemsContainer.style.display = 'none';
        cartEmpty.style.display = 'block';
        return;
    }
    
    cartItemsContainer.style.display = 'flex';
    cartEmpty.style.display = 'none';
    
    cartItemsContainer.innerHTML = cartItems.map((item, index) => `
        <div class="cart-item" data-index="${index}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <div class="cart-item-options">
                    ${item.color ? `
                        <span class="cart-item-option">
                            <i class="ph ph-paint-bucket"></i>
                            ${capitalizeFirst(item.color)}
                        </span>
                    ` : ''}
                    ${item.storage ? `
                        <span class="cart-item-option">
                            <i class="ph ph-database"></i>
                            ${item.storage}
                        </span>
                    ` : ''}
                </div>
                <div class="cart-item-shipping">
                    <i class="ph ph-truck"></i>
                    <span>Envío gratis</span>
                </div>
                <div class="cart-item-price">${formatCurrency(item.price * item.quantity)}</div>
            </div>
            
            <div class="cart-item-actions">
                <div class="cart-item-quantity">
                    <button onclick="updateItemQuantity(${index}, ${item.quantity - 1})">
                        <i class="ph ph-minus"></i>
                    </button>
                    <input type="number" value="${item.quantity}" min="1" max="10" onchange="updateItemQuantity(${index}, this.value)">
                    <button onclick="updateItemQuantity(${index}, ${item.quantity + 1})">
                        <i class="ph ph-plus"></i>
                    </button>
                </div>
                <button class="cart-item-remove" onclick="removeItem(${index})">
                    <i class="ph ph-trash"></i>
                    Eliminar
                </button>
            </div>
        </div>
    `).join('');
    
    updateSummary();
}

// ========================================
// Actualizar Resumen
// ========================================

function updateSummary() {
    const subtotal = Cart.getTotalPrice();
    const shipping = subtotal >= 199 ? 0 : 29;
    const discountAmount = subtotal * discount;
    const total = subtotal + shipping - discountAmount;
    
    document.getElementById('subtotalAmount').textContent = formatCurrency(subtotal);
    document.getElementById('shippingAmount').textContent = shipping === 0 ? 'Gratis' : formatCurrency(shipping);
    document.getElementById('totalAmount').textContent = formatCurrency(total);
    
    // Mostrar/ocultar descuento
    const discountRow = document.getElementById('discountRow');
    if (discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('discountAmount').textContent = `-${formatCurrency(discountAmount)}`;
    } else {
        discountRow.style.display = 'none';
    }
    
    // Actualizar mensaje de envío gratis
    const shippingNotice = document.querySelector('.shipping-notice span');
    if (subtotal < 199) {
        shippingNotice.textContent = `Agrega S/ ${(199 - subtotal).toFixed(2)} más para envío gratis`;
        shippingNotice.style.color = 'var(--color-warning)';
    } else {
        shippingNotice.textContent = 'Envío gratis en pedidos mayores a S/ 199';
        shippingNotice.style.color = 'var(--color-success)';
    }
}

// ========================================
// Actualizar Cantidad
// ========================================

function updateItemQuantity(index, newQuantity) {
    newQuantity = parseInt(newQuantity);
    
    if (newQuantity < 1) {
        removeItem(index);
        return;
    }
    
    if (newQuantity > 10) {
        Toast.warning('Máximo 10 unidades por producto');
        renderCart();
        return;
    }
    
    cartItems[index].quantity = newQuantity;
    Cart.save(cartItems);
    renderCart();
    
    Toast.info('Cantidad actualizada');
}

// ========================================
// Eliminar Item
// ========================================

function removeItem(index) {
    const item = cartItems[index];
    
    Cart.remove(item.id);
    cartItems = Cart.get();
    renderCart();
    
    Toast.success('Producto eliminado del carrito');
}

// ========================================
// Cupón de Descuento
// ========================================

function applyCoupon() {
    const code = document.getElementById('couponCode').value.trim().toUpperCase();
    
    if (!code) {
        Toast.warning('Ingresa un código de cupón');
        return;
    }
    
    // Códigos válidos (simulados)
    const validCodes = {
        'BIENVENIDO10': 0.10,
        'DESCUENTO15': 0.15,
        'OFERTA20': 0.20,
        'PRIMERACOMPRA': 0.25
    };
    
    if (validCodes[code]) {
        discount = validCodes[code];
        discountCode = code;
        updateSummary();
        closeCouponModal();
        Toast.success(`Cupón ${code} aplicado: ${discount * 100}% de descuento`);
    } else {
        Toast.error('Código de cupón inválido');
    }
}

function openCouponModal() {
    document.getElementById('couponModal').style.display = 'flex';
}

function closeCouponModal() {
    document.getElementById('couponModal').style.display = 'none';
}

// Cerrar modal al hacer click fuera
document.addEventListener('click', function(e) {
    const modal = document.getElementById('couponModal');
    if (e.target === modal) {
        closeCouponModal();
    }
});

// ========================================
// Proceder al Checkout
// ========================================

function proceedToCheckout() {
    if (cartItems.length === 0) {
        Toast.warning('Tu carrito está vacío');
        return;
    }
    
    // Guardar información del pedido para el checkout
    const orderInfo = {
        items: cartItems,
        subtotal: Cart.getTotalPrice(),
        shipping: Cart.getTotalPrice() >= 199 ? 0 : 29,
        discount: Cart.getTotalPrice() * discount,
        discountCode: discountCode,
        total: Cart.getTotalPrice() + (Cart.getTotalPrice() >= 199 ? 0 : 29) - (Cart.getTotalPrice() * discount)
    };
    
    localStorage.setItem('tutienda360_order', JSON.stringify(orderInfo));
    
    // Verificar si el usuario está logueado
    const user = localStorage.getItem('tutienda360_user');
    
    if (user) {
        window.location.href = 'checkout.html';
    } else {
        // Redirigir al login primero
        Toast.info('Inicia sesión para continuar con tu compra');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=checkout.html';
        }, 1500);
    }
}

// ========================================
// Utilidades
// ========================================

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// ========================================
// Inicialización
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    
    // Animación de entrada
    document.querySelector('.cart-summary').style.opacity = '0';
    document.querySelector('.cart-summary').style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        document.querySelector('.cart-summary').style.transition = 'all 0.5s ease';
        document.querySelector('.cart-summary').style.opacity = '1';
        document.querySelector('.cart-summary').style.transform = 'translateX(0)';
    }, 100);
});

// Exportar funciones globales
window.updateItemQuantity = updateItemQuantity;
window.removeItem = removeItem;
window.applyCoupon = applyCoupon;
window.openCouponModal = openCouponModal;
window.closeCouponModal = closeCouponModal;
window.proceedToCheckout = proceedToCheckout;
