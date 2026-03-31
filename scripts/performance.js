/**
 * TuTienda360 - Optimizaciones de Rendimiento
 * Lazy Loading, Preload y optimizaciones varias
 */

// ========================================
// Lazy Loading para Imágenes
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    initPreload();
    initDebounceScroll();
});

/**
 * Inicializar Lazy Loading
 * Usa loading="lazy" nativo + Intersection Observer para fallback
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // El navegador soporta loading="lazy" nativo
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback con Intersection Observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Preload de recursos críticos
 */
function initPreload() {
    // Preload de fuentes
    preloadFont('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    // Preload de iconos
    preloadScript('https://unpkg.com/@phosphor-icons/web');
}

/**
 * Preload de stylesheet
 */
function preloadFont(href) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
}

/**
 * Preload de script
 */
function preloadScript(src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = src;
    document.head.appendChild(link);
}

/**
 * Debounce para scroll
 * Optimiza eventos de scroll
 */
function initDebounceScroll() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Manejar scroll
 */
function handleScroll() {
    // Header shadow on scroll
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    }
}

// ========================================
// Optimización de Imágenes
// ========================================

/**
 * Convertir imágenes a WebP si es soportado
 */
function supportsWebP() {
    return new Promise(resolve => {
        const canvas = document.createElement('canvas');
        if (canvas.getContext && canvas.getContext('2d')) {
            resolve(canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0);
        } else {
            resolve(false);
        }
    });
}

// ========================================
// Cache de Peticiones
// ========================================

/**
 * Cache simple para peticiones fetch
 */
const fetchCache = new Map();

async function cachedFetch(url, options = {}) {
    if (fetchCache.has(url)) {
        return fetchCache.get(url);
    }
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    fetchCache.set(url, data);
    return data;
}

// ========================================
// Throttle para funciones
// ========================================

/**
 * Throttle para limitar ejecución de funciones
 */
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

// ========================================
// Clean Up de Observers
// ========================================

/**
 * Limpiar observers cuando se descarga la página
 */
window.addEventListener('beforeunload', function() {
    fetchCache.clear();
});

// ========================================
// Performance Monitoring
// ========================================

/**
 * Reportar métricas de rendimiento
 */
function reportPerformance() {
    if (window.performance) {
        const timing = performance.timing;
        const navigationStart = timing.navigationStart;
        
        const metrics = {
            domContentLoaded: timing.domContentLoadedEventEnd - navigationStart,
            load: timing.loadEventEnd - navigationStart,
            firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
            firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0
        };
        
        console.log('Performance Metrics:', metrics);
    }
}

window.addEventListener('load', reportPerformance);

// ========================================
// Exportar globalmente
// ========================================

window.cachedFetch = cachedFetch;
window.throttle = throttle;
window.supportsWebP = supportsWebP;
