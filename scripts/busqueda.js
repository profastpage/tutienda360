/**
 * TuTienda360 - Búsqueda con Autocompletado y Filtros
 * Mobile First - Optimizado
 */

// Base de datos de productos para búsqueda
const productosDB = [
    { id: 'samsung-a54', name: 'Smartphone Samsung Galaxy A54 5G 128GB', category: 'celulares', price: 974, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
    { id: 'iphone-14', name: 'iPhone 14 Pro 128GB', category: 'celulares', price: 4299, image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=400&fit=crop' },
    { id: 'hp-pavilion', name: 'Laptop HP Pavilion 15.6" Intel Core i5', category: 'computacion', price: 2124, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
    { id: 'macbook-air', name: 'MacBook Air M2 13" 256GB', category: 'computacion', price: 4899, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop' },
    { id: 'sony-xm5', name: 'Auriculares Sony WH-1000XM5', category: 'gaming', price: 959, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop' },
    { id: 'apple-watch', name: 'Apple Watch SE 44mm GPS', category: 'celulares', price: 839, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop' },
    { id: 'lg-tv', name: 'Smart TV LG 55" 4K UHD', category: 'hogar', price: 1519, image: 'https://images.unsplash.com/photo-1593784991095-a20506948430?w=400&h=400&fit=crop' },
    { id: 'casio-gshock', name: 'Casio G-Shock Digital Negro', category: 'ropa', price: 259, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop' },
    { id: 'auriculares', name: 'Auriculares Premium Wireless', category: 'gaming', price: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
    { id: 'sony-alpha', name: 'Cámara Mirrorless Sony Alpha', category: 'computacion', price: 3299, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop' },
    { id: 'ipad-air', name: 'Tablet iPad Air 64GB WiFi', category: 'computacion', price: 2199, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 'jardineria', name: 'Kit de Jardinería Interior', category: 'hogar', price: 89, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=400&fit=crop' },
    { id: 'ps5', name: 'PlayStation 5 Console', category: 'gaming', price: 2499, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop' },
    { id: 'nike-air', name: 'Nike Air Max 270', category: 'ropa', price: 459, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
    { id: 'sofa', name: 'Sofá Moderno 3 Cuerpos', category: 'hogar', price: 1899, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop' }
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
