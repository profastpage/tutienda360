/**
 * TuTienda360 - Página de Detalle de Producto
 * Mobile First - Optimizado
 */

// Datos del producto (simulados - en producción vendrían de una API/URL)
const productData = {
    'samsung-a54': {
        id: 'samsung-a54',
        name: 'Smartphone Samsung Galaxy A54 5G 128GB',
        category: 'Celulares',
        price: 974,
        oldPrice: 1299,
        discount: 25,
        sku: 'SAM-A54-128',
        description: 'El Samsung Galaxy A54 5G combina un diseño elegante con potentes características. Pantalla Super AMOLED de 6.4", cámara triple de 50MP, batería de 5000mAh y carga rápida. Perfecto para fotografía móvil y entretenimiento.',
        images: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'
        ],
        specs: {
            'Pantalla': '6.4" Super AMOLED',
            'Procesador': 'Exynos 1380',
            'RAM': '8GB',
            'Almacenamiento': '128GB',
            'Cámara': '50MP + 12MP + 5MP',
            'Batería': '5000mAh',
            'Sistema Operativo': 'Android 13'
        },
        reviews: [
            { name: 'Carlos M.', rating: 5, date: '15 Mar 2026', text: 'Excelente celular, la cámara es increíble y la batería dura todo el día.' },
            { name: 'María L.', rating: 4, date: '10 Mar 2026', text: 'Muy buen producto, llegó rápido y en perfectas condiciones.' },
            { name: 'Juan P.', rating: 5, date: '5 Mar 2026', text: 'Relación calidad-precio insuperable. Totalmente recomendado.' }
        ]
    },
    'hp-pavilion': {
        id: 'hp-pavilion',
        name: 'Laptop HP Pavilion 15.6" Intel Core i5',
        category: 'Computación',
        price: 2124,
        oldPrice: 2499,
        discount: 15,
        sku: 'HP-PAV-15',
        description: 'Laptop HP Pavilion con procesador Intel Core i5 de 11va generación, 8GB RAM, 512GB SSD. Pantalla Full HD de 15.6". Ideal para trabajo y entretenimiento.',
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop'
        ],
        specs: {
            'Procesador': 'Intel Core i5-1135G7',
            'RAM': '8GB DDR4',
            'Almacenamiento': '512GB SSD',
            'Pantalla': '15.6" Full HD',
            'Gráficos': 'Intel Iris Xe',
            'Sistema Operativo': 'Windows 11'
        },
        reviews: [
            { name: 'Ana R.', rating: 5, date: '20 Mar 2026', text: 'Perfecta para trabajar desde casa. Rápida y silenciosa.' }
        ]
    }
};

// Producto actual
let currentProduct = null;
let currentQuantity = 1;

document.addEventListener('DOMContentLoaded', function() {
    loadProduct();
    initTabs();
    initThumbnails();
});

/**
 * Cargar producto desde URL o usar default
 */
function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'samsung-a54';
    
    currentProduct = productData[productId] || productData['samsung-a54'];
    
    if (currentProduct) {
        renderProduct();
    }
}

/**
 * Renderizar información del producto
 */
function renderProduct() {
    // Imagen principal
    const mainImage = document.getElementById('mainImage');
    if (mainImage && currentProduct.images[0]) {
        mainImage.src = currentProduct.images[0];
        mainImage.alt = currentProduct.name;
    }
    
    // Thumbnails
    renderThumbnails();
    
    // Información básica
    setText('productCategory', currentProduct.category);
    setText('productName', currentProduct.name);
    setText('breadcrumbProduct', currentProduct.name);
    setText('productPrice', formatCurrency(currentProduct.price));
    setText('productOldPrice', formatCurrency(currentProduct.oldPrice));
    setText('productDiscount', `-${currentProduct.discount}%`);
    setText('productSku', currentProduct.sku);
    setText('productDescription', currentProduct.description);
    
    // Especificaciones
    renderSpecs();
    
    // Reseñas
    renderReviews();
    
    // Productos relacionados
    renderRelated();
    
    // Verificar si está en favoritos
    updateFavoriteButton();
}

/**
 * Renderizar thumbnails
 */
function renderThumbnails() {
    const thumbnailList = document.getElementById('thumbnailList');
    if (!thumbnailList) return;
    
    thumbnailList.innerHTML = currentProduct.images.map((img, index) => `
        <div class="thumbnail-item ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
            <img src="${img}" alt="Vista ${index + 1}">
        </div>
    `).join('');
}

/**
 * Inicializar thumbnails
 */
function initThumbnails() {
    // Se inicializa desde renderThumbnails
}

/**
 * Cambiar imagen principal
 */
function changeMainImage(src, element) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = src;
    }
    
    // Actualizar clase active
    document.querySelectorAll('.thumbnail-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');
}

/**
 * Renderizar especificaciones
 */
function renderSpecs() {
    const specsList = document.getElementById('productSpecs');
    if (!specsList || !currentProduct.specs) return;
    
    specsList.innerHTML = Object.entries(currentProduct.specs).map(([key, value]) => `
        <li>
            <strong>${key}</strong>
            <span>${value}</span>
        </li>
    `).join('');
}

/**
 * Renderizar reseñas
 */
function renderReviews() {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList || !currentProduct.reviews) return;
    
    reviewsList.innerHTML = currentProduct.reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <span class="reviewer-name">${review.name}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-stars">
                ${getStarsHTML(review.rating)}
            </div>
            <p class="review-text">${review.text}</p>
        </div>
    `).join('');
}

/**
 * Renderizar productos relacionados
 */
function renderRelated() {
    const relatedContainer = document.getElementById('relatedProducts');
    if (!relatedContainer) return;
    
    // Obtener otros productos
    const related = Object.values(productData).filter(p => p.id !== currentProduct.id);
    
    relatedContainer.innerHTML = related.map(product => `
        <article class="product-card">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                <button class="favorite-btn" onclick="toggleFavorite(event, {id: '${product.id}', name: '${product.name}', price: ${product.price}, image: '${product.images[0]}'})" aria-label="Agregar a favoritos">
                    <i class="ph ph-heart"></i>
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
                <button class="btn-add-cart" onclick="addToCartFromDetailRelated({id: '${product.id}', name: '${product.name}', price: ${product.price}, image: '${product.images[0]}'})">
                    <i class="ph ph-shopping-cart"></i>
                    Agregar
                </button>
            </div>
        </article>
    `).join('');
}

/**
 * Inicializar tabs
 */
function initTabs() {
    const tabHeaders = document.querySelectorAll('.tab-header');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remover active de todos
            tabHeaders.forEach(h => h.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            
            // Agregar active al seleccionado
            this.classList.add('active');
            document.getElementById(tabId)?.classList.add('active');
        });
    });
}

/**
 * Aumentar cantidad
 */
function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (input && input.value < 10) {
        input.value = parseInt(input.value) + 1;
        currentQuantity = input.value;
    }
}

/**
 * Disminuir cantidad
 */
function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (input && input.value > 1) {
        input.value = parseInt(input.value) - 1;
        currentQuantity = input.value;
    }
}

/**
 * Agregar al carrito desde detalle
 */
function addToCartFromDetail() {
    if (!currentProduct || typeof Cart === 'undefined') return;
    
    Cart.add({
        ...currentProduct,
        quantity: currentQuantity
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
            btn.innerHTML = '<i class="ph ph-shopping-cart"></i> Agregar al Carrito';
            btn.style.background = '';
        }, 2000);
    }
}

/**
 * Agregar al carrito desde relacionados
 */
function addToCartFromDetailRelated(product) {
    if (typeof Cart === 'undefined') return;
    
    Cart.add({
        ...product,
        quantity: 1
    });
    
    if (typeof Toast !== 'undefined') {
        Toast.success('Producto agregado al carrito');
    }
}

/**
 * Comprar ahora
 */
function buyNow() {
    if (!currentProduct || typeof Cart === 'undefined') return;
    
    // Agregar producto y redirigir al checkout
    Cart.add({
        ...currentProduct,
        quantity: currentQuantity
    });
    
    window.location.href = 'checkout.html';
}

/**
 * Toggle favorito desde detalle
 */
function toggleFavoriteFromDetail() {
    if (!currentProduct || typeof Favorites === 'undefined') return;
    
    const isNowFavorite = Favorites.toggle(currentProduct);
    updateFavoriteButton();
    
    if (typeof Toast !== 'undefined') {
        if (isNowFavorite) {
            Toast.success('Agregado a favoritos');
        } else {
            Toast.info('Eliminado de favoritos');
        }
    }
}

/**
 * Actualizar botón de favoritos
 */
function updateFavoriteButton() {
    if (!currentProduct || typeof Favorites === 'undefined') return;
    
    const btn = document.querySelector('.favorite-btn-large');
    if (btn) {
        const icon = btn.querySelector('i');
        if (Favorites.isFavorite(currentProduct.id)) {
            icon.classList.remove('ph-heart');
            icon.classList.add('ph-heart-straight');
            btn.classList.add('active');
        } else {
            icon.classList.remove('ph-heart-straight');
            icon.classList.add('ph-heart');
            btn.classList.remove('active');
        }
    }
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

/**
 * Utilidad: Generar estrellas HTML
 */
function getStarsHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += '<i class="ph ph-star-fill"></i>';
        } else if (i === rating + 0.5) {
            html += '<i class="ph ph-star-half"></i>';
        } else {
            html += '<i class="ph ph-star"></i>';
        }
    }
    return html;
}

// Hacer funciones globales
window.changeMainImage = changeMainImage;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.addToCartFromDetail = addToCartFromDetail;
window.addToCartFromDetailRelated = addToCartFromDetailRelated;
window.buyNow = buyNow;
window.toggleFavoriteFromDetail = toggleFavoriteFromDetail;
