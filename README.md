# 🛒 TuTienda360 - Marketplace Profesional

**Marketplace de e-commerce 100% funcional, mobile first y PWA**

![TuTienda360](https://img.shields.io/badge/Version-2.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![PWA](https://img.shields.io/badge/PWA-Ready-orange)

---

## ✨ Características Principales

###  Mobile First & Responsive
- Diseño **mobile first** optimizado para celulares
- Scroll solo vertical (sin scroll horizontal indeseado)
- Navegación táctil optimizada
- Breakpoints: 480px, 768px, 992px, 1200px
- Menú hamburguesa con animación suave

### 🌓 Modo Oscuro/Claro
- Toggle en el header
- Persistencia en localStorage
- Detección de preferencia del sistema
- Transiciones suaves entre temas

### ❤️ Sistema de Favoritos
- Agregar/eliminar productos favoritos
- Página dedicada de favoritos
- Contador en tiempo real en el header
- Persistencia en localStorage

### 🔍 Búsqueda con Autocompletado
- Sugerencias en tiempo real
- Highlight de coincidencias
- 50+ productos en base de datos
- Filtros por categoría, precio y condición
- Ordenamiento por precio y nombre

###  Seguimiento de Pedidos
- Timeline visual con estados
- Información detallada de envío
- Productos del pedido
- Botones de contacto (WhatsApp, Teléfono)

### 👤 Panel de Usuario
- Historial de pedidos
- Información personal editable
- Estados de pedidos en tiempo real
- Cerrar sesión

### 📲 PWA (Progressive Web App)
- Instalable en dispositivos móviles
- Service Worker con cache estratégico
- Funcionamiento offline parcial
- Meta tags para iOS y Android

### ⚡ Optimizaciones de Rendimiento
- Lazy loading nativo de imágenes
- Intersection Observer para fallback
- Preload de recursos críticos
- Debounce para eventos de scroll
- Cache de peticiones fetch
- Throttle para funciones pesadas

---

## 📁 Estructura del Proyecto

```
TuTienda360/
├── index.html                 # Página principal
├── busqueda.html              # Búsqueda con autocompletado
├── favoritos.html             # Página de favoritos
├── producto-detalle.html      # Detalle de producto
├── perfil.html                # Panel de usuario
├── seguimiento.html           # Seguimiento de pedidos
├── carrito.html               # Carrito de compras
├── checkout.html              # Finalizar compra
├── login.html                 # Login/Registro
├── categorias.html            # Página de categorías
├── manifest.json              # PWA Manifest
├── sw.js                      # Service Worker
├── styles/
│   ├── main.css              # Estilos globales + Modo oscuro
│   ├── busqueda.css          # Búsqueda y filtros
│   ├── favoritos.css         # Página de favoritos
│   ├── producto.css          # Detalle de producto
│   ├── perfil.css            # Panel de usuario
│   ├── seguimiento.css       # Seguimiento de pedidos
│   ├── carrito.css           # Carrito
│   ├── checkout.css          # Checkout
│   └── auth.css              # Autenticación
└── scripts/
    ├── main.js               # Lógica principal
    ├── utils.js              # Utilidades globales (Cart, Toast)
    ├── theme.js              # Modo oscuro/claro
    ├── favoritos.js          # Sistema de favoritos
    ├── favoritos-page.js     # Página de favoritos
    ├── busqueda.js           # Búsqueda con autocompletado
    ├── producto-detalle.js   # Detalle de producto
    ├── perfil.js             # Panel de usuario
    ├── seguimiento.js        # Seguimiento de pedidos
    └── performance.js        # Optimizaciones de rendimiento
```

---

## 🚀 Cómo Usar

### Opción 1: Abrir directamente
```
1. Navega a la carpeta TuTienda360
2. Haz doble click en index.html
```

### Opción 2: Servidor local (Recomendado para PWA)
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

---

## 📱 Páginas Disponibles

| Página | URL | Descripción |
|--------|-----|-------------|
| Home | `index.html` | Página principal con productos destacados |
| Búsqueda | `busqueda.html?q=` | Búsqueda con autocompletado y filtros |
| Favoritos | `favoritos.html` | Productos favoritos guardados |
| Producto | `producto-detalle.html?id=` | Detalle de producto con galería y reseñas |
| Perfil | `perfil.html` | Panel de usuario con historial de pedidos |
| Seguimiento | `seguimiento.html?id=` | Tracking de pedido en tiempo real |
| Carrito | `carrito.html` | Gestión de productos en el carrito |
| Checkout | `checkout.html` | Finalizar compra con pasos visuales |
| Login | `login.html` | Inicio de sesión y registro |
| Categorías | `categorias.html` | Filtrado por categorías |

---

## 🎨 Identidad Visual

### Marca
- **Nombre:** TuTienda360
- **Tagline:** Tu marketplace de confianza
- **Color Principal:** `#0061FF` (Azul)

### Paleta de Colores
```css
--color-primary: #0061FF;
--color-primary-dark: #004ED4;
--color-secondary: #00C7FC;
--color-accent: #FFD500;
--color-success: #00C853;
--color-error: #D32F2F;
```

### Tipografía
- **Fuente:** Inter (Google Fonts)
- **Pesos:** 300, 400, 500, 600, 700

---

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript ES6+** - Vanilla JS sin frameworks
- **Google Fonts** - Tipografía Inter
- **Phosphor Icons** - Iconografía moderna
- **Unsplash** - Imágenes de productos
- **localStorage** - Persistencia de datos

---

## 💾 Persistencia de Datos

El proyecto usa `localStorage` para:

| Key | Datos |
|-----|-------|
| `tutienda360_cart` | Carrito de compras |
| `tutienda360_user` | Usuario logueado |
| `tutienda360_users` | Lista de usuarios |
| `tutienda360_orders` | Historial de pedidos |
| `tutienda360_favorites` | Productos favoritos |
| `tutienda360_theme` | Preferencia de tema (oscuro/claro) |

---

## 🔧 Funciones Globales

### Carrito
```javascript
Cart.add({ id, name, price, image, quantity })
Cart.get()
Cart.remove(productId)
Cart.getTotalPrice()
Cart.updateCount()
```

### Favoritos
```javascript
Favorites.add({ id, name, price, image })
Favorites.get()
Favorites.remove(productId)
Favorites.isFavorite(productId)
Favorites.toggle(product)
```

### Notificaciones Toast
```javascript
Toast.success('Mensaje')
Toast.error('Mensaje')
Toast.warning('Mensaje')
Toast.info('Mensaje')
```

### Utilidades
```javascript
formatCurrency(amount)
FormValidator.isValidEmail(email)
FormValidator.isValidPhone(phone)
toggleMobileMenu()
```

---

## 📊 Métricas de Rendimiento

- **Sin dependencias externas** (excepto fuentes e iconos)
- **Carga rápida** - Solo CSS y JS esencial
- **Responsive** - Funciona en todos los dispositivos
- **Accesible** - Atributos ARIA y semántica HTML
- **PWA Ready** - Instalable y con cache estratégico

---

## 🚀 Roadmap

### ✅ Completado (v2.0)
- [x] Modo oscuro/claro
- [x] Sistema de favoritos
- [x] Búsqueda con autocompletado
- [x] Filtros avanzados
- [x] Página de producto detallada
- [x] Panel de usuario con historial
- [x] Seguimiento de pedidos
- [x] PWA con Service Worker
- [x] Optimizaciones de rendimiento
- [x] 50+ productos en base de datos

### 🔄 Próximamente
- [ ] Backend con Node.js/Express
- [ ] Base de datos real (MongoDB/PostgreSQL)
- [ ] API REST
- [ ] Panel de administración
- [ ] Pasarela de pagos real
- [ ] Multi-idioma
- [ ] Chat con vendedores
- [ ] Notificaciones push

---

## 📄 Licencia

Proyecto educativo. Libre uso para aprendizaje y demos.

---

## 👨💻 Autor

**TuTienda360** - Tu marketplace de confianza

© 2026 - Hecho con ❤️ para emprendedores

---

## 🔗 Enlaces

- [Repositorio GitHub](https://github.com/profastpage/tutienda360)
- [Demo en Vivo](#)
- [Documentación](#)

---

## 📱 Capturas

### Mobile
- Header compacto con búsqueda
- Navegación solo vertical
- Scroll horizontal solo en imágenes/thumbnails

### Desktop
- Header completo con navegación
- Grid de productos responsive (2-6 columnas)
- Panel de filtros deslizable

---

**Última actualización:** Marzo 2026
**Versión:** 2.0.0
