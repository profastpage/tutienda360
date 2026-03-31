# 🛒 TuTienda360 - Marketplace Mobile First

**Marketplace de e-commerce 100% responsive, desarrollado con HTML, CSS y JavaScript vanilla.**

---

## ✨ Características Principales

###  Mobile First & Responsive
- Diseño **mobile first** que se adapta a todos los dispositivos
- Breakpoints: 480px, 768px, 992px, 1200px
- Menú hamburguesa para móvil
- Scroll horizontal en navegación secundaria
- Grid de productos adaptable (1-6 columnas)

### 🛍️ Funcionalidades Completas
- ✅ Catálogo de productos por categorías
- ✅ Carrito de compras con localStorage
- ✅ Checkout completo con múltiples métodos de pago
- ✅ Autenticación (login/registro)
- ✅ Sistema de reseñas y calificaciones
- ✅ Búsqueda y filtrado de productos
- ✅ Notificaciones toast

### 🎨 Diseño Moderno
- Tipografía Inter (Google Fonts)
- Iconos Phosphor Icons
- Animaciones suaves
- Modo oscuro compatible
- Imágenes de Unsplash

---

## 📁 Estructura del Proyecto

```
TuTienda360/
├── index.html              # Homepage
├── producto.html           # Detalle de producto
├── carrito.html            # Carrito de compras
├── checkout.html           # Finalizar compra
├── login.html              # Login/Registro
├── categorias.html         # Página de categorías
├── styles/
│   ├── main.css           # Estilos globales (responsive)
│   ├── producto.css       # Página de producto
│   ├── carrito.css        # Carrito
│   ├── checkout.css       # Checkout
│   ├── auth.css           # Autenticación
│   └── categorias.css     # Categorías
└── scripts/
    ├── utils.js           # Utilidades globales
    ├── main.js            # Homepage + menú móvil
    ├── producto.js        # Detalle de producto
    ├── carrito.js         # Gestión del carrito
    ├── checkout.js        # Procesamiento de pago
    ├── auth.js            # Login/Registro
    └── categorias.js      # Filtrado por categorías
```

---

## 🚀 Cómo Usar

### Opción 1: Abrir directamente
```
1. Navega a la carpeta TuTienda360
2. Haz doble click en index.html
```

### Opción 2: Servidor local
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

## 📱 Responsive Breakpoints

| Dispositivo | Ancho | Columnas |
|-------------|-------|----------|
| Mobile XS | < 480px | 1-2 |
| Mobile LG | 480px - 768px | 2 |
| Tablet | 768px - 992px | 3-4 |
| Desktop | 992px - 1200px | 4-6 |
| Desktop XL | > 1200px | 6 |

---

## 🎨 Identidad Visual

### Marca
- **Nombre:** TuTienda360
- **Tagline:** Tu marketplace de confianza
- **Color Principal:** `#0061FF` (Azul)

### Paleta de Colores
```css
--color-primary: #0061FF;
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
- **CSS3** - Variables, Grid, Flexbox
- **JavaScript ES6+** - Vanilla JS
- **Google Fonts** - Inter
- **Phosphor Icons** - Iconos
- **Unsplash** - Imágenes

---

## 📦 Funcionalidades por Página

### Homepage (`index.html`)
- Banner promocional
- 12 categorías principales
- Ofertas del día (6 productos)
- Productos destacados (4 productos)
- Beneficios
- Búsqueda funcional

### Categorías (`categorias.html`)
- Filtrado por categoría (URL param)
- Filtros laterales (precio, condición, envío)
- Ordenamiento (precio, relevancia)
- Paginación
- 8 categorías con productos específicos

### Producto (`producto.html`)
- Galería de imágenes
- Selector de variantes
- Reseñas y calificaciones
- Preguntas y respuestas
- Productos relacionados

### Carrito (`carrito.html`)
- Gestión de cantidades
- Eliminación de productos
- Cupones de descuento
- Cálculo de envío
- Resumen del pedido

### Checkout (`checkout.html`)
- Datos de contacto
- Dirección de envío
- Métodos de pago:
  - Tarjeta
  - Yape
  - Plin
  - Transferencia
- Confirmación de pedido

### Login (`login.html`)
- Inicio de sesión
- Registro de usuario
- Validación de formularios
- Login social simulado

---

## 💾 Persistencia de Datos

El proyecto usa `localStorage` para:

| Key | Datos |
|-----|-------|
| `tutienda360_cart` | Carrito de compras |
| `tutienda360_user` | Usuario logueado |
| `tutienda360_users` | Usuarios registrados |
| `tutienda360_order` | Pedido en proceso |
| `tutienda360_orders` | Historial de pedidos |

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

### Notificaciones
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

## 🎯 Flujo de Compra

```
1. Explorar productos (home/categorías)
   ↓
2. Ver detalle de producto
   ↓
3. Agregar al carrito
   ↓
4. Ver carrito → Revisar productos
   ↓
5. Checkout → Datos de envío y pago
   ↓
6. Confirmación → Número de pedido
```

---

## 📊 Mejoras Implementadas

### Responsive
- ✅ Mobile first approach
- ✅ Menú hamburguesa funcional
- ✅ Grid adaptable (1-6 columnas)
- ✅ Imágenes con lazy loading
- ✅ Touch-friendly (botones grandes)

### Categorías
- ✅ 8 categorías con productos reales
- ✅ URLs con parámetros (`?cat=ropa`)
- ✅ Íconos específicos por categoría
- ✅ Filtros y ordenamiento

### Imágenes
- ✅ Unsplash source URLs
- ✅ Lazy loading
- ✅ Tamaños optimizados (400x400)
- ✅ Alt text descriptivo

---

## 🚀 Próximas Mejoras

- [ ] Backend con Node.js
- [ ] Base de datos real
- [ ] API REST
- [ ] Panel de administración
- [ ] Búsqueda con Elasticsearch
- [ ] PWA (Progressive Web App)
- [ ] Modo oscuro
- [ ] Multi-idioma

---

## 📄 Licencia

Proyecto educativo. Libre uso para aprendizaje y demos.

---

## 👨‍ Autor

**TuTienda360** - Tu marketplace de confianza

© 2026 - Hecho con ❤️

---

## 🔗 Enlaces

- [Homepage](index.html)
- [Categorías](categorias.html)
- [Carrito](carrito.html)
- [Login](login.html)
