/**
 * TuTienda360 - Sistema de Favoritos
 * Gestión de productos favoritos con localStorage
 */

const Favorites = {
    // Obtener favoritos del localStorage
    get() {
        const favorites = localStorage.getItem('tutienda360_favorites');
        return favorites ? JSON.parse(favorites) : [];
    },

    // Guardar favoritos en localStorage
    save(favorites) {
        localStorage.setItem('tutienda360_favorites', JSON.stringify(favorites));
        this.updateCount();
    },

    // Agregar producto a favoritos
    add(product) {
        const favorites = this.get();
        const exists = favorites.some(item => item.id === product.id);

        if (!exists) {
            favorites.push({
                ...product,
                addedAt: new Date().toISOString()
            });
            this.save(favorites);
            return true;
        }
        return false;
    },

    // Eliminar producto de favoritos
    remove(productId) {
        const favorites = this.get().filter(item => item.id !== productId);
        this.save(favorites);
    },

    // Verificar si un producto está en favoritos
    isFavorite(productId) {
        const favorites = this.get();
        return favorites.some(item => item.id === productId);
    },

    // Toggle (agregar/eliminar)
    toggle(product) {
        if (this.isFavorite(product.id)) {
            this.remove(product.id);
            return false;
        } else {
            this.add(product);
            return true;
        }
    },

    // Vaciar favoritos
    clear() {
        this.save([]);
    },

    // Obtener total de favoritos
    getCount() {
        return this.get().length;
    },

    // Actualizar contador del header
    updateCount() {
        const countElement = document.getElementById('favoritesCount');
        if (countElement) {
            const count = this.getCount();
            countElement.textContent = count;
            countElement.style.display = count > 0 ? 'flex' : 'none';

            // Animación de actualización
            countElement.classList.add('active');
            setTimeout(() => {
                countElement.classList.remove('active');
            }, 300);
        }

        // Actualizar icono del botón
        const navFavorites = document.getElementById('navFavorites');
        if (navFavorites) {
            const icon = navFavorites.querySelector('i');
            if (icon && count > 0) {
                icon.classList.remove('ph-heart');
                icon.classList.add('ph-heart-straight');
            } else if (icon) {
                icon.classList.remove('ph-heart-straight');
                icon.classList.add('ph-heart');
            }
        }
    },

    // Inicializar
    init() {
        this.updateCount();
    }
};

/**
 * Toggle de Favoritos en tarjetas de producto
 */
function toggleFavorite(event, product) {
    event.stopPropagation();
    event.preventDefault();

    if (typeof Favorites === 'undefined') {
        console.error('Favorites no está definido');
        return;
    }

    const isNowFavorite = Favorites.toggle(product);
    const btn = event.target.closest('.favorite-btn');

    if (btn) {
        const icon = btn.querySelector('i');
        
        if (isNowFavorite) {
            icon.classList.remove('ph-heart');
            icon.classList.add('ph-heart-straight');
            btn.classList.add('active');
            
            if (typeof Toast !== 'undefined') {
                Toast.success('Agregado a favoritos');
            }
        } else {
            icon.classList.remove('ph-heart-straight');
            icon.classList.add('ph-heart');
            btn.classList.remove('active');
            
            if (typeof Toast !== 'undefined') {
                Toast.info('Eliminado de favoritos');
            }
        }
    }
}

window.toggleFavorite = toggleFavorite;
window.Favorites = Favorites;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    Favorites.init();
});
