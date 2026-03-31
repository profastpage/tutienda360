/**
 * TuTienda360 - JavaScript Principal
 * Mobile First - Optimizado
 */

document.addEventListener('DOMContentLoaded', function() {
    initSearchBar();
    initProductCards();
    initCategoryCards();
    initUserMenu();
});

/**
 * Menú Mobile
 */
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
}

window.toggleMobileMenu = toggleMobileMenu;

/**
 * Barra de búsqueda
 */
function initSearchBar() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    
    if (!searchForm || !searchInput) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        
        if (query) {
            window.location.href = `busqueda.html?q=${encodeURIComponent(query)}`;
        } else {
            if (typeof Toast !== 'undefined') {
                Toast.warning('Ingresa un término de búsqueda');
            }
            searchInput.focus();
        }
    });
}

/**
 * Tarjetas de producto
 */
function initProductCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.btn-add-cart')) return;
            // Navegación a producto
        });
    });
}

/**
 * Tarjetas de categoría
 */
function initCategoryCards() {
    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            // La navegación ya está en el href
        });
    });
}

/**
 * Menú de usuario
 */
function initUserMenu() {
    const navAccount = document.getElementById('navAccount');
    
    if (navAccount && typeof Cart !== 'undefined') {
        const user = JSON.parse(localStorage.getItem('tutienda360_user'));
        
        if (user) {
            navAccount.innerHTML = `
                <i class="ph ph-user-circle"></i>
                <span>${user.nombre.split(' ')[0]}</span>
            `;
            navAccount.href = 'perfil.html';
        }
        
        Cart.updateCount();
    }
}

/**
 * Agregar al carrito desde homepage
 */
function addToCartFromHomepage(event, product) {
    event.stopPropagation();
    
    if (typeof Cart === 'undefined') {
        console.error('Cart no está definido');
        return;
    }
    
    Cart.add({
        ...product,
        quantity: 1
    });
    
    if (typeof Toast !== 'undefined') {
        Toast.success('Producto agregado al carrito');
    }
    
    // Animación del botón
    const btn = event.target.closest('button');
    if (btn) {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="ph ph-check"></i> Agregado';
        btn.style.background = 'var(--color-success)';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 2000);
    }
}

window.addToCartFromHomepage = addToCartFromHomepage;

/**
 * Scroll del header
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    }
});
