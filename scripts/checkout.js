/**
 * TuTienda360 - Checkout
 * Procesamiento de pedidos
 */

// ========================================
// Estado del Pedido
// ========================================

let orderData = null;

// ========================================
// Cargar Datos del Pedido
// ========================================

function loadOrderData() {
    orderData = JSON.parse(localStorage.getItem('tutienda360_order'));
    
    if (!orderData || !orderData.items || orderData.items.length === 0) {
        Toast.error('No hay productos para comprar');
        setTimeout(() => {
            window.location.href = 'carrito.html';
        }, 1500);
        return false;
    }
    
    // Cargar datos del usuario si está logueado
    const user = JSON.parse(localStorage.getItem('tutienda360_user'));
    if (user) {
        document.getElementById('contactEmail').value = user.email;
        document.getElementById('contactPhone').value = user.telefono;
    }
    
    renderSummary();
    return true;
}

// ========================================
// Renderizar Resumen
// ========================================

function renderSummary() {
    const summaryProducts = document.getElementById('summaryProducts');
    
    summaryProducts.innerHTML = orderData.items.map(item => `
        <div class="summary-product">
            <div class="summary-product-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="summary-product-details">
                <div class="summary-product-name">${item.name}</div>
                <div class="summary-product-quantity">Cantidad: ${item.quantity}</div>
                <div class="summary-product-price">${formatCurrency(item.price * item.quantity)}</div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('summarySubtotal').textContent = formatCurrency(orderData.subtotal);
    document.getElementById('summaryShipping').textContent = orderData.shipping === 0 ? 'Gratis' : formatCurrency(orderData.shipping);
    
    if (orderData.discount > 0) {
        document.getElementById('summaryDiscountRow').style.display = 'flex';
        document.getElementById('summaryDiscount').textContent = `-${formatCurrency(orderData.discount)}`;
    }
    
    document.getElementById('summaryTotal').textContent = formatCurrency(orderData.total);
}

// ========================================
// Toggle Método de Pago
// ========================================

function togglePaymentMethod(method) {
    // Actualizar UI de opciones
    document.querySelectorAll('.payment-method-option').forEach(option => {
        option.classList.remove('active');
        if (option.querySelector(`input[value="${method}"]`)) {
            option.classList.add('active');
        }
    });
    
    // Mostrar/ocultar formularios
    document.getElementById('cardForm').style.display = method === 'card' ? 'block' : 'none';
    document.getElementById('qrPayment').style.display = (method === 'yape' || method === 'plin') ? 'block' : 'none';
    document.getElementById('transferPayment').style.display = method === 'transfer' ? 'block' : 'none';
}

// ========================================
// Validar Formulario
// ========================================

function validateCheckoutForm() {
    const email = document.getElementById('contactEmail').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const address = document.getElementById('shippingAddress').value.trim();
    const region = document.getElementById('shippingRegion').value;
    const province = document.getElementById('shippingProvince').value.trim();
    const district = document.getElementById('shippingDistrict').value.trim();
    
    let isValid = true;
    
    // Validar email
    if (!email || !FormValidator.isValidEmail(email)) {
        Toast.error('Ingresa un correo electrónico válido');
        document.getElementById('contactEmail').focus();
        return false;
    }
    
    // Validar teléfono
    if (!phone || !FormValidator.isValidPhone(phone)) {
        Toast.error('Ingresa un teléfono válido (9 dígitos)');
        document.getElementById('contactPhone').focus();
        return false;
    }
    
    // Validar dirección
    if (!address || address.length < 10) {
        Toast.error('Ingresa una dirección completa');
        document.getElementById('shippingAddress').focus();
        return false;
    }
    
    // Validar ubicación
    if (!region) {
        Toast.error('Selecciona un departamento');
        document.getElementById('shippingRegion').focus();
        return false;
    }
    
    if (!province) {
        Toast.error('Ingresa una provincia');
        document.getElementById('shippingProvince').focus();
        return false;
    }
    
    if (!district) {
        Toast.error('Ingresa un distrito');
        document.getElementById('shippingDistrict').focus();
        return false;
    }
    
    // Validar método de pago
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethod) {
        Toast.error('Selecciona un método de pago');
        return false;
    }
    
    // Validar datos de tarjeta si es necesario
    if (paymentMethod.value === 'card') {
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const cardName = document.getElementById('cardName').value.trim();
        const cardExpiry = document.getElementById('cardExpiry').value.trim();
        const cardCVV = document.getElementById('cardCVV').value.trim();
        
        if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
            Toast.error('Ingresa un número de tarjeta válido (16 dígitos)');
            document.getElementById('cardNumber').focus();
            return false;
        }
        
        if (!cardName || cardName.length < 5) {
            Toast.error('Ingresa el nombre del titular');
            document.getElementById('cardName').focus();
            return false;
        }
        
        if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            Toast.error('Ingresa una fecha de vencimiento válida (MM/AA)');
            document.getElementById('cardExpiry').focus();
            return false;
        }
        
        if (!cardCVV || cardCVV.length < 3) {
            Toast.error('Ingresa el código CVV');
            document.getElementById('cardCVV').focus();
            return false;
        }
    }
    
    return true;
}

// ========================================
// Procesar Pedido
// ========================================

function handleCheckout(event) {
    event.preventDefault();
    
    if (!validateCheckoutForm()) {
        return;
    }
    
    // Mostrar botón de procesamiento
    const submitBtn = document.querySelector('.btn-checkout-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="ph ph-spinner"></i> Procesando...';
    submitBtn.disabled = true;
    
    // Simular procesamiento de pago
    setTimeout(() => {
        // Generar número de pedido
        const orderNumber = 'ORD-' + Date.now().toString().slice(-6);
        
        // Guardar pedido completado
        const completedOrder = {
            orderNumber: orderNumber,
            items: orderData.items,
            customer: {
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value
            },
            shipping: {
                address: document.getElementById('shippingAddress').value,
                region: document.getElementById('shippingRegion').value,
                province: document.getElementById('shippingProvince').value,
                district: document.getElementById('shippingDistrict').value,
                reference: document.getElementById('shippingReference').value
            },
            payment: {
                method: document.querySelector('input[name="paymentMethod"]:checked').value,
                installments: document.getElementById('installmentsCheck').checked
            },
            totals: orderData,
            status: 'confirmed',
            createdAt: new Date().toISOString()
        };
        
        // Guardar en historial de pedidos
        const orders = JSON.parse(localStorage.getItem('tutienda360_orders') || '[]');
        orders.push(completedOrder);
        localStorage.setItem('tutienda360_orders', JSON.stringify(orders));
        
        // Guardar en pedidos del usuario
        const user = JSON.parse(localStorage.getItem('tutienda360_user'));
        if (user) {
            const users = JSON.parse(localStorage.getItem('tutienda360_users') || '[]');
            const userIndex = users.findIndex(u => u.email === user.email);
            if (userIndex > -1) {
                if (!users[userIndex].pedidos) {
                    users[userIndex].pedidos = [];
                }
                users[userIndex].pedidos.push(orderNumber);
                localStorage.setItem('tutienda360_users', JSON.stringify(users));
            }
        }
        
        // Limpiar carrito y order data
        localStorage.removeItem('tutienda360_cart');
        localStorage.removeItem('tutienda360_order');
        
        // Mostrar confirmación
        document.getElementById('orderNumber').textContent = orderNumber;
        document.getElementById('confirmModal').style.display = 'flex';
        
        // Actualizar contador del carrito
        Cart.updateCount();
        
    }, 2000);
}

// ========================================
// Formateo de Tarjeta
// ========================================

function initCardFormatting() {
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCVV = document.getElementById('cardCVV');
    
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            value = value.replace(/\D/g, '');
            value = value.substring(0, 16);
            
            // Agregar espacios cada 4 dígitos
            let formatted = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formatted += ' ';
                }
                formatted += value[i];
            }
            
            e.target.value = formatted;
        });
    }
    
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.substring(0, 4);
            
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            
            e.target.value = value;
        });
    }
    
    if (cardCVV) {
        cardCVV.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });
    }
}

// ========================================
// Inicialización
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    if (loadOrderData()) {
        initCardFormatting();
    }
    
    // Animación de entrada
    document.querySelector('.checkout-forms').style.opacity = '0';
    document.querySelector('.checkout-forms').style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.querySelector('.checkout-forms').style.transition = 'all 0.5s ease';
        document.querySelector('.checkout-forms').style.opacity = '1';
        document.querySelector('.checkout-forms').style.transform = 'translateY(0)';
    }, 100);
});

// Exportar funciones globales
window.togglePaymentMethod = togglePaymentMethod;
window.handleCheckout = handleCheckout;
