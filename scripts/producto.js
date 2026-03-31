/**
 * TuTienda360 - Página de Producto
 * Funcionalidades específicas de la página de producto
 */

// ========================================
// Estado del producto
// ========================================

let currentProduct = {
    id: 'samsung-a54-256',
    name: 'Smartphone Samsung Galaxy A54 5G 128GB Negro',
    price: 974,
    oldPrice: 1299,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=800&fit=crop',
    color: 'negro',
    storage: '256GB',
    quantity: 1
};

// ========================================
// Galería de Imágenes
// ========================================

function changeImage(thumbnail, imageUrl) {
    // Actualizar imagen principal
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = imageUrl;
            mainImage.style.opacity = '1';
        }, 150);
    }
    
    // Actualizar thumbnail activo
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
    
    // Actualizar producto
    currentProduct.image = imageUrl;
}

// ========================================
// Selector de Cantidad
// ========================================

function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (input && input.value < 10) {
        input.value = parseInt(input.value) + 1;
        currentProduct.quantity = parseInt(input.value);
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (input && input.value > 1) {
        input.value = parseInt(input.value) - 1;
        currentProduct.quantity = parseInt(input.value);
    }
}

// ========================================
// Opciones del Producto
// ========================================

function initProductOptions() {
    // Selector de color
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            currentProduct.color = this.dataset.color;
            
            // Feedback visual
            Toast.info(`Color seleccionado: ${this.title}`);
        });
    });
    
    // Selector de almacenamiento
    document.querySelectorAll('.storage-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.storage-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            currentProduct.storage = this.dataset.storage;
            
            // Actualizar precio según almacenamiento
            updatePriceByStorage(this.dataset.storage);
            
            Toast.info(`Almacenamiento: ${this.dataset.storage}`);
        });
    });
}

function updatePriceByStorage(storage) {
    const basePrice = 974;
    const priceElement = document.querySelector('.current-price-large');
    const oldPriceElement = document.querySelector('.old-price');
    const installmentElement = document.querySelector('.installment-price');
    
    if (storage === '128GB') {
        currentProduct.price = basePrice - 100;
    } else {
        currentProduct.price = basePrice;
    }
    
    if (priceElement) {
        priceElement.textContent = formatCurrency(currentProduct.price);
    }
    
    if (oldPriceElement) {
        oldPriceElement.textContent = formatCurrency(currentProduct.oldPrice);
    }
    
    if (installmentElement) {
        installmentElement.textContent = formatCurrency(currentProduct.price / 3);
    }
}

// ========================================
// Agregar al Carrito
// ========================================

function addToCartFromProduct() {
    const productToAdd = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        oldPrice: currentProduct.oldPrice,
        image: currentProduct.image,
        color: currentProduct.color,
        storage: currentProduct.storage,
        quantity: currentProduct.quantity
    };
    
    Cart.add(productToAdd);
    Toast.success('Producto agregado al carrito');
    
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

// ========================================
// Tabs
// ========================================

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remover active de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Activar seleccionado
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Scroll suave hacia el contenido
            if (window.innerWidth < 768) {
                const rect = document.getElementById(tabId).getBoundingClientRect();
                if (rect.top < 100) {
                    window.scrollBy({
                        top: rect.top - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ========================================
// Sistema de Opiniones
// ========================================

function initReviews() {
    // Botones de útil/no útil
    document.querySelectorAll('.helpful-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const isHelpful = this.querySelector('.ph-thumbs-up');
            
            if (isHelpful) {
                const countSpan = this.querySelector('span');
                const count = parseInt(countSpan.textContent.replace(/[()]/g, ''));
                
                if (this.classList.contains('voted')) {
                    // Remover voto
                    this.classList.remove('voted');
                    countSpan.textContent = `(${count - 1})`;
                } else {
                    // Agregar voto
                    this.classList.add('voted');
                    this.style.background = 'var(--color-gray-200)';
                    countSpan.textContent = `(${count + 1})`;
                    
                    // Remover voto del otro botón
                    const otherBtn = this.parentElement.querySelector('.helpful-btn:not(:first-child)');
                    if (otherBtn && otherBtn.classList.contains('voted')) {
                        otherBtn.classList.remove('voted');
                        otherBtn.style.background = '';
                        const otherCount = otherBtn.querySelector('span');
                        otherCount.textContent = `(${parseInt(otherCount.textContent.replace(/[()]/g, '')) - 1})`;
                    }
                }
            }
        });
    });
    
    // Botón de escribir opinión
    const writeReviewBtn = document.querySelector('.reviews-header .btn-primary');
    if (writeReviewBtn) {
        writeReviewBtn.addEventListener('click', function() {
            // Aquí se abriría un modal o se navegaría a la página de escribir opinión
            Toast.info('Funcionalidad de escribir opinión - Próximamente');
        });
    }
}

// ========================================
// Preguntas y Respuestas
// ========================================

function initQuestions() {
    const askBtn = document.querySelector('.questions-header .btn-primary');
    if (askBtn) {
        askBtn.addEventListener('click', function() {
            Toast.info('Funcionalidad de hacer pregunta - Próximamente');
        });
    }
}

// ========================================
// Productos Relacionados
// ========================================

function initRelatedProducts() {
    document.querySelectorAll('.related-products .product-card').forEach(card => {
        card.addEventListener('click', function() {
            // En una implementación real, esto navegaría al producto
            console.log('Producto relacionado seleccionado');
        });
    });
}

// ========================================
// Contacto con Vendedor
// ========================================

function initSellerContact() {
    const contactBtn = document.querySelector('.seller-info .btn-outline');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            Toast.info('Abriendo chat con el vendedor...');
            // Aquí se abriría un modal de chat
        });
    }
}

// ========================================
// Favoritos
// ========================================

function initFavorites() {
    const favoriteBtn = document.querySelector('.product-actions .btn-secondary');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('ph-heart')) {
                icon.classList.remove('ph-heart');
                icon.classList.add('ph-heart-fill');
                this.style.color = '#D32F2F';
                Toast.success('Agregado a favoritos');
            } else {
                icon.classList.remove('ph-heart-fill');
                icon.classList.add('ph-heart');
                this.style.color = '';
                Toast.info('Eliminado de favoritos');
            }
        });
    }
}

// ========================================
// Zoom en Imagen (Desktop)
// ========================================

function initImageZoom() {
    const mainImage = document.querySelector('.main-image');
    if (!mainImage || window.innerWidth <= 768) return;
    
    mainImage.addEventListener('mousemove', function(e) {
        const img = this.querySelector('img');
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        const y = (e.clientY - rect.top) / rect.height * 100;
        
        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = 'scale(1.5)';
    });
    
    mainImage.addEventListener('mouseleave', function() {
        const img = this.querySelector('img');
        img.style.transformOrigin = 'center center';
        img.style.transform = 'scale(1)';
    });
}

// ========================================
// Inicialización
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initProductOptions();
    initTabs();
    initReviews();
    initQuestions();
    initRelatedProducts();
    initSellerContact();
    initFavorites();
    initImageZoom();
    
    // Animación de entrada
    document.querySelector('.product-info-section').style.opacity = '0';
    document.querySelector('.product-info-section').style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.querySelector('.product-info-section').style.transition = 'all 0.5s ease';
        document.querySelector('.product-info-section').style.opacity = '1';
        document.querySelector('.product-info-section').style.transform = 'translateY(0)';
    }, 100);
});

// Exportar funciones globales
window.changeImage = changeImage;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.addToCartFromProduct = addToCartFromProduct;
