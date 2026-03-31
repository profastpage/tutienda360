/**
 * TuTienda360 - Página de Favoritos
 * Renderizado y gestión de productos favoritos
 */

document.addEventListener('DOMContentLoaded', function() {
    renderFavorites();
});

/**
 * Renderizar lista de favoritos
 */
function renderFavorites() {
    const favorites = Favorites.get();
    const emptyState = document.getElementById('favoritesEmpty');
    const favoritesGrid = document.getElementById('favoritesGrid');

    if (!favorites || favorites.length === 0) {
        // Mostrar estado vacío
        if (emptyState) emptyState.style.display = 'flex';
        if (favoritesGrid) favoritesGrid.innerHTML = '';
        return;
    }

    // Ocultar estado vacío
    if (emptyState) emptyState.style.display = 'none';

    // Renderizar grid
    if (favoritesGrid) {
        favoritesGrid.innerHTML = favorites.map(product => `
            <div class="favorite-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <button class="favorite-remove-top" onclick="removeFavorite('${product.id}')" aria-label="Eliminar de favoritos">
                        <i class="ph ph-x"></i>
                    </button>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="price-container">
                        <span class="current-price">${formatCurrency(product.price)}</span>
                    </div>
                    <div class="shipping-info">
                        <i class="ph ph-truck"></i>
                        <span>Envío gratis</span>
                    </div>
                    <div class="favorite-actions">
                        <button class="btn-add-cart" onclick="addToCartFromFavorites('${product.id}')">
                            <i class="ph ph-shopping-cart"></i>
                            Agregar
                        </button>
                        <button class="btn-remove" onclick="removeFavorite('${product.id}')" aria-label="Eliminar">
                            <i class="ph ph-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

/**
 * Eliminar producto de favoritos
 */
function removeFavorite(productId) {
    Favorites.remove(productId);
    renderFavorites();
    
    if (typeof Toast !== 'undefined') {
        Toast.info('Producto eliminado de favoritos');
    }
}

/**
 * Agregar al carrito desde favoritos
 */
function addToCartFromFavorites(productId) {
    const favorites = Favorites.get();
    const product = favorites.find(p => p.id === productId);

    if (product && typeof Cart !== 'undefined') {
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
}

// Hacer funciones globales
window.removeFavorite = removeFavorite;
window.addToCartFromFavorites = addToCartFromFavorites;
