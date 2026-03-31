/**
 * TuTienda360 - Búsqueda con Autocompletado y Filtros
 * Mobile First - Optimizado
 */

// Base de datos de productos para búsqueda (50 productos)
const productosDB = [
    { id: 'samsung-a54', name: 'Smartphone Samsung Galaxy A54 5G 128GB', category: 'celulares', price: 974, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
    { id: 'iphone-14', name: 'iPhone 14 Pro 128GB', category: 'celulares', price: 4299, image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=400&fit=crop' },
    { id: 'iphone-15', name: 'iPhone 15 Pro Max 256GB', category: 'celulares', price: 5899, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop' },
    { id: 'xiaomi-13', name: 'Xiaomi 13 Pro 256GB', category: 'celulares', price: 3299, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
    { id: 'pixel-7', name: 'Google Pixel 7 Pro 128GB', category: 'celulares', price: 2899, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff23?w=400&h=400&fit=crop' },
    { id: 'oneplus-11', name: 'OnePlus 11 5G 256GB', category: 'celulares', price: 2499, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
    { id: 'hp-pavilion', name: 'Laptop HP Pavilion 15.6" Intel Core i5', category: 'computacion', price: 2124, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
    { id: 'macbook-air', name: 'MacBook Air M2 13" 256GB', category: 'computacion', price: 4899, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop' },
    { id: 'macbook-pro', name: 'MacBook Pro 14" M3 Pro 512GB', category: 'computacion', price: 7999, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop' },
    { id: 'dell-xps', name: 'Dell XPS 13 Plus Intel i7', category: 'computacion', price: 5299, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop' },
    { id: 'lenovo-thinkpad', name: 'Lenovo ThinkPad X1 Carbon', category: 'computacion', price: 4599, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
    { id: 'asus-rog', name: 'ASUS ROG Strix G15 Gaming', category: 'computacion', price: 3899, image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop' },
    { id: 'sony-xm5', name: 'Auriculares Sony WH-1000XM5', category: 'gaming', price: 959, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop' },
    { id: 'apple-watch', name: 'Apple Watch SE 44mm GPS', category: 'celulares', price: 839, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop' },
    { id: 'lg-tv', name: 'Smart TV LG 55" 4K UHD', category: 'hogar', price: 1519, image: 'https://images.unsplash.com/photo-1593784991095-a20506948430?w=400&h=400&fit=crop' },
    { id: 'casio-gshock', name: 'Casio G-Shock Digital Negro', category: 'ropa', price: 259, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop' },
    { id: 'auriculares', name: 'Auriculares Premium Wireless', category: 'gaming', price: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
    { id: 'sony-alpha', name: 'Cámara Mirrorless Sony Alpha', category: 'computacion', price: 3299, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop' },
    { id: 'ipad-air', name: 'Tablet iPad Air 64GB WiFi', category: 'computacion', price: 2199, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 'ipad-pro', name: 'iPad Pro 12.9" 256GB WiFi', category: 'computacion', price: 4299, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 'jardineria', name: 'Kit de Jardinería Interior', category: 'hogar', price: 89, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=400&fit=crop' },
    { id: 'ps5', name: 'PlayStation 5 Console', category: 'gaming', price: 2499, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop' },
    { id: 'ps5-dualsense', name: 'Control DualSense PS5', category: 'gaming', price: 249, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop' },
    { id: 'xbox-series', name: 'Xbox Series X 1TB', category: 'gaming', price: 2399, image: 'https://images.unsplash.com/photo-1621259182902-885f5f3a1c05?w=400&h=400&fit=crop' },
    { id: 'nintendo-switch', name: 'Nintendo Switch OLED', category: 'gaming', price: 1399, image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop' },
    { id: 'nike-air', name: 'Nike Air Max 270', category: 'ropa', price: 459, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
    { id: 'adidas-ultraboost', name: 'Adidas Ultraboost 22', category: 'ropa', price: 599, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
    { id: 'sofa', name: 'Sofá Moderno 3 Cuerpos', category: 'hogar', price: 1899, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop' },
    { id: 'silla-gaming', name: 'Silla Gaming Ergonómica', category: 'hogar', price: 899, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop' },
    { id: 'escritorio', name: 'Escritorio Moderno Blanco', category: 'hogar', price: 699, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop' },
    { id: 'lampara', name: 'Lámpara de Mesa LED', category: 'hogar', price: 159, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop' },
    { id: 'cafetera', name: 'Cafetera Espresso Automática', category: 'hogar', price: 1299, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop' },
    { id: 'licuadora', name: 'Licuadora de Alta Potencia', category: 'hogar', price: 399, image: 'https://images.unsplash.com/photo-1570222094114-28a9d88a27e6?w=400&h=400&fit=crop' },
    { id: 'aspiradora', name: 'Aspiradora Robot Xiaomi', category: 'hogar', price: 899, image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&h=400&fit=crop' },
    { id: 'aire-acondicionado', name: 'Aire Acondicionado 12000 BTU', category: 'hogar', price: 1599, image: 'https://images.unsplash.com/photo-1614631446501-4e15c53a5c67?w=400&h=400&fit=crop' },
    { id: 'camisa-polo', name: 'Camisa Polo Algodón', category: 'ropa', price: 89, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
    { id: 'jeans-levi', name: 'Jeans Levi\'s 501 Original', category: 'ropa', price: 299, image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=400&fit=crop' },
    { id: 'zapatillas-vans', name: 'Vans Old Skool Classic', category: 'ropa', price: 249, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop' },
    { id: 'reloj-casio', name: 'Casio Vintage A168WA', category: 'ropa', price: 189, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop' },
    { id: 'mochila', name: 'Mochila Urbana Impermeable', category: 'ropa', price: 179, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
    { id: 'gafas-rayban', name: 'Gafas de Sol Ray-Ban Aviator', category: 'ropa', price: 459, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop' },
    { id: 'bocina-jbl', name: 'Bocina JBL Flip 6 Portable', category: 'gaming', price: 399, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
    { id: 'teclado-mechanical', name: 'Teclado Mecánico RGB', category: 'gaming', price: 349, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop' },
    { id: 'mouse-gaming', name: 'Mouse Gaming Logitech G Pro', category: 'gaming', price: 299, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop' },
    { id: 'monitor-27', name: 'Monitor 27" 144Hz Curvo', category: 'computacion', price: 1299, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop' },
    { id: 'webcam', name: 'Webcam Logitech C920 Full HD', category: 'computacion', price: 299, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop' },
    { id: 'microfono', name: 'Micrófono USB Blue Yeti', category: 'gaming', price: 449, image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop' },
    { id: 'impresora', name: 'Impresora HP LaserJet Pro', category: 'computacion', price: 899, image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=400&fit=crop' },
    { id: 'disco-externo', name: 'Disco Duro Externo 2TB', category: 'computacion', price: 249, image: 'https://images.unsplash.com/photo-1597872250977-479f96429a78?w=400&h=400&fit=crop' },
    { id: 'usb-flash', name: 'Memoria USB 3.0 128GB', category: 'computacion', price: 59, image: 'https://images.unsplash.com/photo-1597872250977-479f96429a78?w=400&h=400&fit=crop' }
];

// Estado actual
let currentQuery = '';
let currentResults = [];
let currentSort = 'relevancia';
let activeFilters = {
    categorias: [],
    precioMin: null,
    precioMax: null,
    condicion: []
};

document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initAutocomplete();
    loadSearchResults();
});

/**
 * Inicializar búsqueda
 */
function initSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    currentQuery = urlParams.get('q') || '';
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = currentQuery;
    }
    
    const searchTitle = document.getElementById('searchTitleText');
    if (searchTitle && currentQuery) {
        searchTitle.textContent = `Resultados para "${currentQuery}"`;
    }
}

/**
 * Inicializar autocompletado
 */
function initAutocomplete() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    // Crear contenedor de sugerencias
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    searchInput.parentNode.appendChild(suggestionsContainer);
    
    // Escuchar input
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        if (query.length >= 2) {
            showSuggestions(query);
        } else {
            hideSuggestions();
        }
    });
    
    // Escuchar teclas
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            hideSuggestions();
        }
    });
    
    // Cerrar al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            hideSuggestions();
        }
    });
}

/**
 * Mostrar sugerencias
 */
function showSuggestions(query) {
    const suggestionsContainer = document.querySelector('.search-suggestions');
    if (!suggestionsContainer) return;
    
    // Filtrar productos
    const suggestions = productosDB.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    
    if (suggestions.length === 0) {
        hideSuggestions();
        return;
    }
    
    // Renderizar sugerencias
    suggestionsContainer.innerHTML = `
        <div class="suggestions-header">
            <i class="ph ph-magnifying-glass"></i>
            <span>Sugerencias</span>
        </div>
        ${suggestions.map(product => `
            <div class="suggestion-item" onclick="searchProduct('${product.id}')">
                <img src="${product.image}" alt="${product.name}">
                <div class="suggestion-info">
                    <span class="suggestion-name">${highlightMatch(product.name, query)}</span>
                    <span class="suggestion-price">${formatCurrency(product.price)}</span>
                </div>
            </div>
        `).join('')}
        <div class="suggestion-footer" onclick="executeSearch('${query}')">
            <i class="ph ph-arrow-right"></i>
            <span>Ver todos los resultados para "${query}"</span>
        </div>
    `;
    
    suggestionsContainer.classList.add('active');
}

/**
 * Ocultar sugerencias
 */
function hideSuggestions() {
    const suggestionsContainer = document.querySelector('.search-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.classList.remove('active');
    }
}

/**
 * Resaltar match en texto
 */
function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

/**
 * Buscar producto específico
 */
function searchProduct(productId) {
    window.location.href = `producto-detalle.html?id=${productId}`;
}

/**
 * Ejecutar búsqueda
 */
function executeSearch(query) {
    window.location.href = `busqueda.html?q=${encodeURIComponent(query)}`;
}

/**
 * Cargar resultados de búsqueda
 */
function loadSearchResults() {
    if (!currentQuery) {
        // Mostrar todos los productos
        currentResults = [...productosDB];
    } else {
        // Filtrar por query
        currentResults = productosDB.filter(p => 
            p.name.toLowerCase().includes(currentQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(currentQuery.toLowerCase())
        );
    }
    
    applyFiltersAndSort();
}

/**
 * Aplicar filtros y ordenamiento
 */
function applyFiltersAndSort() {
    let results = [...currentResults];
    
    // Aplicar filtros de categoría
    if (activeFilters.categorias.length > 0) {
        results = results.filter(p => activeFilters.categorias.includes(p.category));
    }
    
    // Aplicar filtro de precio
    if (activeFilters.precioMin !== null) {
        results = results.filter(p => p.price >= activeFilters.precioMin);
    }
    if (activeFilters.precioMax !== null) {
        results = results.filter(p => p.price <= activeFilters.precioMax);
    }
    
    // Ordenar
    switch (currentSort) {
        case 'precio-asc':
            results.sort((a, b) => a.price - b.price);
            break;
        case 'precio-desc':
            results.sort((a, b) => b.price - a.price);
            break;
        case 'nombre-asc':
            results.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    renderResults(results);
}

/**
 * Renderizar resultados
 */
function renderResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    const emptyState = document.getElementById('searchEmpty');
    const resultCount = document.getElementById('searchResultCount');
    
    if (!resultsContainer) return;
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '';
        if (emptyState) emptyState.style.display = 'flex';
        if (resultCount) resultCount.textContent = '0 productos encontrados';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    if (resultCount) resultCount.textContent = `${results.length} productos encontrados`;
    
    resultsContainer.innerHTML = results.map(product => `
        <article class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <button class="favorite-btn" onclick="toggleFavorite(event, {id: '${product.id}', name: '${product.name}', price: ${product.price}, image: '${product.image}'})" aria-label="Agregar a favoritos">
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
                <button class="btn-add-cart" onclick="addToCartFromSearch({id: '${product.id}', name: '${product.name}', price: ${product.price}, image: '${product.image}'})">
                    <i class="ph ph-shopping-cart"></i>
                    Agregar
                </button>
            </div>
        </article>
    `).join('');
}

/**
 * Toggle panel de filtros
 */
function toggleFiltros() {
    const panel = document.getElementById('filtersPanel');
    const overlay = document.getElementById('filtersOverlay');
    
    if (panel && overlay) {
        panel.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = panel.classList.contains('active') ? 'hidden' : '';
    }
}

/**
 * Aplicar filtros
 */
function aplicarFiltros() {
    // Obtener categorías seleccionadas
    const categoriaChecks = document.querySelectorAll('#categoriaFiltros input:checked');
    activeFilters.categorias = Array.from(categoriaChecks).map(c => c.value);
    
    // Obtener rango de precio
    const precioMin = document.getElementById('precioMin').value;
    const precioMax = document.getElementById('precioMax').value;
    
    activeFilters.precioMin = precioMin ? parseFloat(precioMin) : null;
    activeFilters.precioMax = precioMax ? parseFloat(precioMax) : null;
    
    applyFiltersAndSort();
    toggleFiltros();
    
    if (typeof Toast !== 'undefined') {
        Toast.success('Filtros aplicados');
    }
}

/**
 * Ordenar productos
 */
function ordenarProductos() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        currentSort = sortSelect.value;
        applyFiltersAndSort();
    }
}

/**
 * Agregar al carrito desde búsqueda
 */
function addToCartFromSearch(product) {
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
}

// Hacer funciones globales
window.toggleFiltros = toggleFiltros;
window.aplicarFiltros = aplicarFiltros;
window.ordenarProductos = ordenarProductos;
window.searchProduct = searchProduct;
window.executeSearch = executeSearch;
window.addToCartFromSearch = addToCartFromSearch;
