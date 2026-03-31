/**
 * TuTienda360 - Utilidades Globales
 * Funciones compartidas entre todas las páginas
 */

// ========================================
// Carrito de Compras con localStorage
// ========================================

const Cart = {
    // Obtener carrito del localStorage
    get() {
        const cart = localStorage.getItem('tutienda360_cart');
        return cart ? JSON.parse(cart) : [];
    },

    // Guardar carrito en localStorage
    save(cart) {
        localStorage.setItem('tutienda360_cart', JSON.stringify(cart));
        this.updateCount();
    },

    // Agregar producto al carrito
    add(product) {
        const cart = this.get();
        const existingIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingIndex > -1) {
            // Si ya existe, aumentar cantidad
            cart[existingIndex].quantity += product.quantity || 1;
        } else {
            // Si no existe, agregar nuevo
            cart.push({
                ...product,
                quantity: product.quantity || 1,
                addedAt: new Date().toISOString()
            });
        }
        
        this.save(cart);
        return true;
    },

    // Eliminar producto del carrito
    remove(productId) {
        const cart = this.get().filter(item => item.id !== productId);
        this.save(cart);
    },

    // Actualizar cantidad de un producto
    updateQuantity(productId, quantity) {
        const cart = this.get();
        const index = cart.findIndex(item => item.id === productId);
        
        if (index > -1) {
            if (quantity <= 0) {
                this.remove(productId);
            } else {
                cart[index].quantity = quantity;
                this.save(cart);
            }
        }
    },

    // Vaciar carrito
    clear() {
        this.save([]);
    },

    // Obtener total de productos
    getTotalItems() {
        return this.get().reduce((total, item) => total + item.quantity, 0);
    },

    // Obtener precio total
    getTotalPrice() {
        return this.get().reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Actualizar contador del header
    updateCount() {
        const countElement = document.getElementById('cartCount');
        if (countElement) {
            const count = this.getTotalItems();
            countElement.textContent = count;
            countElement.style.display = count > 0 ? 'flex' : 'none';
            
            // Animación de actualización
            countElement.style.transform = 'scale(1.3)';
            setTimeout(() => {
                countElement.style.transform = 'scale(1)';
            }, 200);
        }
    },

    // Inicializar
    init() {
        this.updateCount();
    }
};

// ========================================
// Sistema de Notificaciones Toast
// ========================================

const Toast = {
    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Icono según el tipo
        const icons = {
            success: 'check-circle',
            error: 'warning-circle',
            warning: 'warning',
            info: 'info'
        };
        
        toast.innerHTML = `
            <i class="ph ph-${icons[type] || icons.info}"></i>
            <span>${message}</span>
        `;
        
        // Estilos
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            background: this.getBackgroundColor(type),
            color: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            zIndex: '9999',
            fontSize: '14px',
            fontWeight: '500',
            transform: 'translateY(100px)',
            opacity: '0',
            transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        });
        
        document.body.appendChild(toast);
        
        // Animación de entrada
        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });
        
        // Remover después del duration
        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    
    getBackgroundColor(type) {
        const colors = {
            success: '#00C853',
            error: '#D32F2F',
            warning: '#FFA000',
            info: '#0061FF'
        };
        return colors[type] || colors.info;
    },
    
    success(message) { this.show(message, 'success'); },
    error(message) { this.show(message, 'error'); },
    warning(message) { this.show(message, 'warning'); },
    info(message) { this.show(message, 'info'); }
};

// ========================================
// Formateo de moneda
// ========================================

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
}

// ========================================
// Validación de formularios
// ========================================

const FormValidator = {
    // Validar email
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    // Validar teléfono (Perú)
    isValidPhone(phone) {
        const regex = /^(\+51)?[0-9]{9}$/;
        return regex.test(phone.replace(/\s/g, ''));
    },
    
    // Validar longitud mínima
    isMinLength(value, min) {
        return value.length >= min;
    },
    
    // Validar que no esté vacío
    isNotEmpty(value) {
        return value.trim().length > 0;
    },
    
    // Validar contraseñas iguales
    passwordsMatch(pass1, pass2) {
        return pass1 === pass2;
    }
};

// ========================================
// Utilidades varias
// ========================================

// Debounce para optimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle para limitar ejecución
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Detectar si es mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Scroll suave a elemento
function scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// ========================================
// Inicialización
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrito
    Cart.init();
    
    // Búsqueda en el header
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                window.location.href = `busqueda.html?q=${encodeURIComponent(query)}`;
            } else {
                Toast.warning('Ingresa un término de búsqueda');
                searchInput.focus();
            }
        });
    }
    
    // Actualizar contador del carrito en cada página
    Cart.updateCount();
});

// Exportar globalmente
window.Cart = Cart;
window.Toast = Toast;
window.formatCurrency = formatCurrency;
window.FormValidator = FormValidator;
window.debounce = debounce;
window.throttle = throttle;
window.isMobile = isMobile;
window.scrollToElement = scrollToElement;
