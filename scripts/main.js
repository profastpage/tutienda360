/**
 * TuTienda360 - JavaScript Principal
 * Mobile First - Optimizado
 */

document.addEventListener('DOMContentLoaded', function() {
    initSearchBar();
    initProductCards();
    initCategoryCards();
    initUserMenu();
    initFavoriteButtons();
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
            if (e.target.closest('.btn-add-cart') || e.target.closest('.favorite-btn')) return;
            // Navegación a producto
            const productId = card.querySelector('.btn-add-cart')?.getAttribute('onclick')?.match(/id:\s*'([^']+)'/)?.[1];
            if (productId) {
                window.location.href = `producto.html?id=${productId}`;
            }
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
 * Inicializar botones de favoritos en productos
 */
function initFavoriteButtons() {
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    
    favoriteBtns.forEach(btn => {
        // Verificar si el producto ya está en favoritos
        const onclick = btn.getAttribute('onclick');
        const productId = onclick?.match(/id:\s*'([^']+)'/)?.[1];
        
        if (productId && typeof Favorites !== 'undefined' && Favorites.isFavorite(productId)) {
            const icon = btn.querySelector('i');
            icon.classList.remove('ph-heart');
            icon.classList.add('ph-heart-straight');
            btn.classList.add('active');
        }
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
        
        // Actualizar favoritos también
        if (typeof Favorites !== 'undefined') {
            Favorites.updateCount();
        }
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
