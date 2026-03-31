/**
 * TuTienda360 - Página de Categorías
 * Muestra productos filtrados por categoría
 */

// ========================================
// Configuración de Categorías
// ========================================

const categoriesConfig = {
    'ropa': {
        title: 'Ropa y Accesorios',
        description: 'Moda para hombre, mujer y niños',
        icon: 'ph-tshirt',
        products: [
            { id: 'camiseta-algodon', name: 'Camiseta Algodón Premium', price: 49, oldPrice: 79, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', discount: 38 },
            { id: 'jeans-slim', name: 'Jeans Slim Fit Oscuro', price: 129, oldPrice: 179, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', discount: 28 },
            { id: 'casaca-cuero', name: 'Casaca de Cuero Sintético', price: 199, oldPrice: 299, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', discount: 33 },
            { id: 'vestido-verano', name: 'Vestido de Verano Floral', price: 89, oldPrice: 139, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop', discount: 36 },
            { id: 'zapatos-deportivos', name: 'Zapatos Deportivos Running', price: 159, oldPrice: 229, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', discount: 31 },
            { id: 'bolso-cuero', name: 'Bolso de Cuero Genuino', price: 179, oldPrice: 249, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop', discount: 28 }
        ]
    },
    'celulares': {
        title: 'Celulares y Smartphones',
        description: 'Los últimos modelos de smartphones',
        icon: 'ph-device-mobile',
        products: [
            { id: 'iphone-15', name: 'iPhone 15 Pro 256GB', price: 5499, oldPrice: 5999, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop', discount: 8 },
            { id: 'samsung-s24', name: 'Samsung Galaxy S24 Ultra', price: 4899, oldPrice: 5299, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop', discount: 8 },
            { id: 'xiaomi-14', name: 'Xiaomi 14 Pro 5G', price: 3299, oldPrice: 3699, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff23?w=400&h=400&fit=crop', discount: 11 },
            { id: 'pixel-8', name: 'Google Pixel 8 Pro', price: 3899, oldPrice: 4199, image: 'https://images.unsplash.com/photo-1635870723802-e88d76ae3f4c?w=400&h=400&fit=crop', discount: 7 },
            { id: 'oneplus-12', name: 'OnePlus 12 5G', price: 2899, oldPrice: 3199, image: 'https://images.unsplash.com/photo-1592899677712-a5a25450336c?w=400&h=400&fit=crop', discount: 9 },
            { id: 'motorola-edge', name: 'Motorola Edge 40 Pro', price: 2199, oldPrice: 2599, image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=400&fit=crop', discount: 15 }
        ]
    },
    'computacion': {
        title: 'Computación y Laptops',
        description: 'Laptops, PCs y accesorios',
        icon: 'ph-laptop',
        products: [
            { id: 'macbook-pro', name: 'MacBook Pro 14" M3', price: 7999, oldPrice: 8499, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', discount: 6 },
            { id: 'dell-xps', name: 'Dell XPS 15 Intel i7', price: 5499, oldPrice: 5999, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop', discount: 8 },
            { id: 'hp-spectre', name: 'HP Spectre x360', price: 4299, oldPrice: 4799, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', discount: 10 },
            { id: 'lenovo-thinkpad', name: 'Lenovo ThinkPad X1', price: 4899, oldPrice: 5299, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop', discount: 8 },
            { id: 'asus-rog', name: 'ASUS ROG Zephyrus G14', price: 5299, oldPrice: 5799, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop', discount: 9 },
            { id: 'imac-24', name: 'iMac 24" M1', price: 5199, oldPrice: 5599, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop', discount: 7 }
        ]
    },
    'tv-audio': {
        title: 'TV y Audio',
        description: 'Televisores y equipos de sonido',
        icon: 'ph-television',
        products: [
            { id: 'lg-oled', name: 'LG OLED 65" 4K', price: 6999, oldPrice: 7999, image: 'https://images.unsplash.com/photo-1593784991095-a20506948430?w=400&h=400&fit=crop', discount: 13 },
            { id: 'samsung-qled', name: 'Samsung QLED 75"', price: 8499, oldPrice: 9499, image: 'https://images.unsplash.com/photo-1509281373149-e957c629640d?w=400&h=400&fit=crop', discount: 11 },
            { id: 'sony-bravia', name: 'Sony Bravia 55" 4K', price: 4299, oldPrice: 4799, image: 'https://images.unsplash.com/photo-1579969406277-f7460e3e8cfc?w=400&h=400&fit=crop', discount: 10 },
            { id: 'sony-home-theater', name: 'Sony Home Theater 5.1', price: 1899, oldPrice: 2299, image: 'https://images.unsplash.com/photo-1545459720-aacaf509080e?w=400&h=400&fit=crop', discount: 17 },
            { id: 'bose-soundbar', name: 'Bose Soundbar 700', price: 2499, oldPrice: 2899, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', discount: 14 },
            { id: 'jbl-parlante', name: 'JBL Parlante Bluetooth', price: 599, oldPrice: 799, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop', discount: 25 }
        ]
    },
    'hogar': {
        title: 'Hogar y Muebles',
        description: 'Todo para tu hogar',
        icon: 'ph-house',
        products: [
            { id: 'sofa-3cuerpos', name: 'Sofá 3 Cuerpos Moderno', price: 1899, oldPrice: 2399, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea970?w=400&h=400&fit=crop', discount: 21 },
            { id: 'mesa-comedor', name: 'Mesa de Comedor 6p', price: 1299, oldPrice: 1599, image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop', discount: 19 },
            { id: 'cama-matrimonial', name: 'Cama Matrimonial con Base', price: 1599, oldPrice: 1999, image: 'https://images.unsplash.com/photo-1505693416388-334374242839?w=400&h=400&fit=crop', discount: 20 },
            { id: 'refrigeradora', name: 'Refrigeradora Samsung 400L', price: 2199, oldPrice: 2599, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop', discount: 15 },
            { id: 'lavadora-lg', name: 'Lavadora LG 18kg', price: 1799, oldPrice: 2099, image: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=400&h=400&fit=crop', discount: 14 },
            { id: 'lampara-pie', name: 'Lámpara de Pie Moderna', price: 299, oldPrice: 399, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', discount: 25 }
        ]
    },
    'gaming': {
        title: 'Gaming y Videojuegos',
        description: 'Consolas, juegos y accesorios',
        icon: 'ph-game-controller',
        products: [
            { id: 'ps5', name: 'PlayStation 5 Digital', price: 2499, oldPrice: 2799, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop', discount: 11 },
            { id: 'xbox-series-x', name: 'Xbox Series X 1TB', price: 2399, oldPrice: 2699, image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop', discount: 11 },
            { id: 'nintendo-switch', name: 'Nintendo Switch OLED', price: 1499, oldPrice: 1699, image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop', discount: 12 },
            { id: 'control-ps5', name: 'Control DualSense PS5', price: 299, oldPrice: 349, image: 'https://images.unsplash.com/photo-1592840496694-26d0450ab29c?w=400&h=400&fit=crop', discount: 14 },
            { id: 'headset-gaming', name: 'Headset Gaming RGB', price: 199, oldPrice: 279, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop', discount: 29 },
            { id: 'teclado-mecanico', name: 'Teclado Mecánico RGB', price: 349, oldPrice: 449, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop', discount: 22 }
        ]
    },
    'deportes': {
        title: 'Deportes y Fitness',
        description: 'Equipamiento deportivo',
        icon: 'ph-dumbbell',
        products: [
            { id: 'bicicleta-spinning', name: 'Bicicleta Spinning Pro', price: 1299, oldPrice: 1599, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop', discount: 19 },
            { id: 'pesas-ajustables', name: 'Set Pesas Ajustables', price: 399, oldPrice: 499, image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400&h=400&fit=crop', discount: 20 },
            { id: 'tapete-yoga', name: 'Tapete de Yoga Premium', price: 89, oldPrice: 129, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop', discount: 31 },
            { id: 'cinta-correr', name: 'Cinta de Correr Eléctrica', price: 2199, oldPrice: 2599, image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=400&fit=crop', discount: 15 },
            { id: 'pelota-fitness', name: 'Pelota de Fitness 65cm', price: 49, oldPrice: 69, image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400&h=400&fit=crop', discount: 29 },
            { id: 'bandas-resistencia', name: 'Set Bandas de Resistencia', price: 59, oldPrice: 89, image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop', discount: 34 }
        ]
    },
    // Categorías por defecto para las demás
    'default': {
        title: 'Productos',
        description: 'Explora nuestra selección',
        icon: 'ph-grid-four',
        products: []
    }
};

// Productos genéricos para categorías sin productos específicos
const genericProducts = [
    { id: 'prod-1', name: 'Producto Destacado 1', price: 99, oldPrice: 149, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', discount: 34 },
    { id: 'prod-2', name: 'Producto Destacado 2', price: 159, oldPrice: 199, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', discount: 20 },
    { id: 'prod-3', name: 'Producto Destacado 3', price: 229, oldPrice: 299, image: 'https://images.unsplash.com/photo-1572569028738-411a29630962?w=400&h=400&fit=crop', discount: 23 },
    { id: 'prod-4', name: 'Producto Destacado 4', price: 79, oldPrice: 119, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=400&fit=crop', discount: 34 },
    { id: 'prod-5', name: 'Producto Destacado 5', price: 349, oldPrice: 449, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', discount: 22 },
    { id: 'prod-6', name: 'Producto Destacado 6', price: 189, oldPrice: 249, image: 'https://images.unsplash.com/photo-1526178610171-1a44f12b0b8e?w=400&h=400&fit=crop', discount: 24 },
    { id: 'prod-7', name: 'Producto Destacado 7', price: 129, oldPrice: 179, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', discount: 28 },
    { id: 'prod-8', name: 'Producto Destacado 8', price: 269, oldPrice: 329, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', discount: 18 }
];

// ========================================
// Estado
// ========================================

let currentCategory = 'default';
let currentProducts = [];
let currentPage = 1;
const productsPerPage = 12;

// ========================================
// Inicialización
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Obtener categoría de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('cat');
    
    if (categoryParam) {
        currentCategory = categoryParam;
    }
    
    loadCategory();
});

// ========================================
// Cargar Categoría
// ========================================

function loadCategory() {
    const config = categoriesConfig[currentCategory] || categoriesConfig['default'];
    
    // Actualizar UI
    document.getElementById('categoryTitle').textContent = `${config.title} - TuTienda360`;
    document.getElementById('currentCategory').textContent = config.title;
    document.getElementById('categoryTitleLarge').textContent = config.title;
    document.getElementById('categoryDescription').textContent = config.description;
    
    // Actualizar ícono
    const iconElement = document.getElementById('categoryIcon');
    iconElement.innerHTML = `<i class="ph ${config.icon}"></i>`;
    
    // Cargar productos
    currentProducts = config.products.length > 0 ? config.products : genericProducts;
    renderProducts();
}

// ========================================
// Renderizar Productos
// ========================================

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = currentProducts.slice(start, end);
    
    grid.innerHTML = productsToShow.map(product => `
        <article class="product-card" onclick="viewProduct('${product.id}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="price-container">
                    ${product.oldPrice ? `<span class="old-price">S/ ${product.oldPrice.toLocaleString()}</span>` : ''}
                    <span class="current-price">S/ ${product.price.toLocaleString()}</span>
                </div>
                <div class="shipping-info">
                    <i class="ph ph-truck"></i>
                    <span>Envío gratis</span>
                </div>
                <button class="btn-add-cart" onclick="addToCartFromCategory(event, '${product.id}')">
                    <i class="ph ph-shopping-cart"></i>
                    Agregar
                </button>
            </div>
        </article>
    `).join('');
    
    // Actualizar paginación
    renderPagination();
}

// ========================================
// Paginación
// ========================================

function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(currentProducts.length / productsPerPage);
    
    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'flex';
    
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `<button class="page-btn"><i class="ph ph-dots-three"></i></button>`;
        }
    }
    
    pagination.innerHTML = html;
}

function goToPage(page) {
    currentPage = page;
    renderProducts();
    window.scrollTo({ top: 400, behavior: 'smooth' });
}

// ========================================
// Filtros
// ========================================

function toggleFilters() {
    const panel = document.getElementById('filtersPanel');
    
    if (!panel.classList.contains('active')) {
        // Crear estructura del panel si no existe
        panel.innerHTML = `
            <div class="filters-panel-content">
                <div class="filters-header">
                    <h3>Filtros</h3>
                    <button onclick="toggleFilters()"><i class="ph ph-x"></i></button>
                </div>
                <div class="filters-content">
                    <div class="filter-group">
                        <h4>Precio</h4>
                        <label class="checkbox-wrapper">
                            <input type="checkbox" value="0-50">
                            <span>Menos de S/ 50</span>
                        </label>
                        <label class="checkbox-wrapper">
                            <input type="checkbox" value="50-100">
                            <span>S/ 50 a S/ 100</span>
                        </label>
                        <label class="checkbox-wrapper">
                            <input type="checkbox" value="100-500">
                            <span>S/ 100 a S/ 500</span>
                        </label>
                        <label class="checkbox-wrapper">
                            <input type="checkbox" value="500+">
                            <span>Más de S/ 500</span>
                        </label>
                    </div>
                    <div class="filter-group">
                        <h4>Condición</h4>
                        <label class="checkbox-wrapper">
                            <input type="checkbox" value="new">
                            <span>Nuevo</span>
                        </label>
                        <label class="checkbox-wrapper">
                            <input type="checkbox" value="used">
                            <span>Usado</span>
                        </label>
                    </div>
                    <div class="filter-group">
                        <h4>Envío</h4>
                        <label class="checkbox-wrapper">
                            <input type="checkbox" value="free-shipping">
                            <span>Envío gratis</span>
                        </label>
                    </div>
                    <button class="btn btn-primary" onclick="applyFilters()">Aplicar filtros</button>
                </div>
            </div>
        `;
    }
    
    panel.classList.toggle('active');
    document.body.style.overflow = panel.classList.contains('active') ? 'hidden' : '';
}

function applyFilters() {
    toggleFilters();
    Toast.info('Filtros aplicados (demo)');
}

// ========================================
// Ordenar Productos
// ========================================

function sortProducts() {
    const sortValue = document.getElementById('sortSelect').value;
    
    switch(sortValue) {
        case 'price-asc':
            currentProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        case 'sales':
            // Simulado - en producción usar datos reales
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        default:
            // Relevancia - mantener orden original
            break;
    }
    
    currentPage = 1;
    renderProducts();
    Toast.info('Productos ordenados');
}

// ========================================
// Ver Producto
// ========================================

function viewProduct(productId) {
    window.location.href = `producto.html?id=${productId}`;
}

// ========================================
// Agregar al Carrito
// ========================================

function addToCartFromCategory(event, productId) {
    event.stopPropagation();
    
    const product = currentProducts.find(p => p.id === productId);
    
    if (product) {
        Cart.add({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        
        Toast.success('Producto agregado al carrito');
    }
}

// Exportar funciones globales
window.toggleFilters = toggleFilters;
window.applyFilters = applyFilters;
window.sortProducts = sortProducts;
window.viewProduct = viewProduct;
window.addToCartFromCategory = addToCartFromCategory;
window.goToPage = goToPage;
