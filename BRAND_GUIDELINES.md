# 🎨 Brand Guidelines - TuTienda360

## Marca y Posicionamiento

### Nombre
**TuTienda360**

### Tagline
*"Tu marketplace de confianza"*

### Personalidad de Marca
- **Cercana** - Trato amigable y accesible
- **Confiable** - Seguridad en cada compra
- **Moderna** - Tecnología y diseño actual
- **Completa** - 360° de variedad

---

## 🎨 Sistema Visual

### Logotipo

#### Versión Principal
```
TuTienda360
├── "TuTienda" → Color: #343A40 (Gray 800)
└── "360" → Color: #0061FF (Primary Blue)
```

#### Tipografía del Logo
- **Fuente:** Inter
- **Peso:** Bold (700)
- **Tamaño base:** 24px (desktop)

#### Uso correcto
✅ Fondo claro o blanco
✅ Mantener área de protección
✅ Usar colores oficiales

#### Uso incorrecto
❌ No deformar el logo
❌ No cambiar colores arbitrariamente
❌ No usar sobre fondos que reduzcan legibilidad

---

## 🎨 Paleta de Colores

### Colores Primarios

```
┌─────────────────┐
│  #0061FF        │  Primary Blue
│  ████           │  Uso: Branding, CTAs, enlaces
└─────────────────┘

┌─────────────────┐
│  #004ED4        │  Primary Dark
│  ████           │  Uso: Hover states, active
└─────────────────┘

┌─────────────────┐
│  #3385FF        │  Primary Light
│  ████           │  Uso: Fondos, gradientes
└─────────────────┘
```

### Colores Secundarios

```
┌─────────────────┐
│  #00C7FC        │  Cyan
│  ████           │  Uso: Gradientes, acentos
└─────────────────┘

┌─────────────────┐
│  #FFD500        │  Yellow
│  ████           │  Uso: Ofertas, badges, highlights
└─────────────────┘
```

### Colores Neutros

```
#FFFFFF  → Blanco (fondos)
#F8F9FA  → Gray 50 (fondos secundarios)
#F1F3F5  → Gray 100 (bordes, inputs)
#DEE2E6  → Gray 300 (separadores)
#ADB5BD  → Gray 500 (texto secundario)
#6C757D  → Gray 600 (texto terciario)
#343A40  → Gray 800 (texto principal)
#212529  → Gray 900 (títulos)
```

### Colores Semánticos

```
#00C853  → Éxito (envíos, confirmaciones)
#D32F2F  → Error (alertas, errores)
#FFA000  → Warning (atención)
#0288D1  → Info (información)
```

---

## 📝 Tipografía

### Familia Principal: Inter

**Origen:** Google Fonts (gratuita)

### Jerarquía Tipográfica

#### Títulos
```
H1: 36px / Bold (700) / Line-height: 1.25
H2: 24px / Bold (700) / Line-height: 1.25
H3: 20px / Semibold (600) / Line-height: 1.25
H4: 18px / Semibold (600) / Line-height: 1.25
```

#### Cuerpo
```
Base: 16px / Regular (400) / Line-height: 1.5
Small: 14px / Regular (400) / Line-height: 1.5
XSmall: 12px / Regular (400) / Line-height: 1.5
```

#### Botones y CTAs
```
Button: 16px / Semibold (600)
Label: 14px / Medium (500)
```

---

## 🖼️ Uso de Imágenes

### Estilo Fotográfico
- ✅ Imágenes limpias y bien iluminadas
- ✅ Fondos neutros para productos
- ✅ Estilo de vida para banners
- ✅ Diversidad e inclusión

### Bordes y Efectos
- **Border Radius:** 12px-16px (imágenes)
- **Sombras:** Suaves, elevación progresiva
- **Hover:** Scale 1.08, transición 350ms

### Relación de Aspecto
- **Productos:** 1:1 (cuadrado)
- **Banners:** 3:2 o 16:9
- **Categorías:** 1:1 (iconos)

---

## 🎭 Tono de Voz

### Personalidad Comunicacional

**Cercano pero profesional**
- ✅ "Encuentra tus productos favoritos"
- ✅ "Estamos aquí para ayudarte"
- ✅ "Compra segura y rápida"

**Evitar**
- ❌ Lenguaje demasiado técnico
- ❌ Formalidad excesiva
- ❌ Jerga complicada

### Ejemplos de Copy

#### Homepage
- **Título:** "¡Fechas Especiales TuTienda360!"
- **Subtítulo:** "Hasta 50% OFF en miles de productos"
- **CTA:** "Ver ofertas"

#### Beneficios
- "Pago seguro" - "Protegemos tus pagos con tecnología de punta"
- "Envíos rápidos" - "Recibe tus productos en 24-48 horas"
- "Compra protegida" - "Garantía de devolución si no estás satisfecho"

---

## 📐 Sistema de Espaciado

### Escala de Espaciado (base: 4px)

```
0   → 0px
1   → 4px
2   → 8px
3   → 12px
4   → 16px
5   → 20px
6   → 24px
8   → 32px
10  → 40px
12  → 48px
16  → 64px
```

### Aplicación
- **Márgenes entre secciones:** 48px-64px
- **Espaciado interno de cards:** 16px-24px
- **Gap entre elementos:** 8px-16px

---

## 🔘 Componentes UI

### Botones

#### Primario
```css
background: #0061FF
color: #FFFFFF
padding: 12px 24px
border-radius: 12px
font-weight: 600
```

#### Secundario
```css
background: #FFFFFF
color: #0061FF
border: 2px solid #0061FF
```

### Cards

#### Producto
```
Background: #FFFFFF
Border-radius: 12px
Shadow: 0 1px 2px rgba(0,0,0,0.05)
Hover: 0 20px 25px rgba(0,0,0,0.1)
```

#### Categoría
```
Background: #FFFFFF
Border-radius: 16px
Icon: 64px círculo con gradiente
```

---

## 📱 Responsive

### Breakpoints

```
Mobile:      < 480px
Tablet:      480px - 768px
Desktop S:   768px - 992px
Desktop M:   992px - 1200px
Desktop L:   > 1200px
```

### Reglas
- Mobile-first approach
- Contenedor máximo: 1200px
- Padding lateral: 16px (mobile), 24px (desktop)

---

## ✨ Animaciones

### Duraciones
```
Fast:    150ms
Normal:  250ms
Slow:    350ms
```

### Easing
```
Default: ease
Entrance: ease-out
Exit: ease-in
```

### Animaciones Comunes

#### Hover en Cards
```css
transform: translateY(-4px)
transition: all 0.3s ease
box-shadow: 0 20px 25px rgba(0,0,0,0.1)
```

#### Click en Botones
```css
transform: scale(0.95)
transition: transform 0.1s ease
```

---

## 🎯 Principios de Diseño

1. **Claridad ante todo** - El usuario debe entender rápidamente
2. **Consistencia** - Mismos patrones en toda la experiencia
3. **Jerarquía visual** - Guiar la atención del usuario
4. **Accesibilidad** - Diseño para todos
5. **Rendimiento** - Rápido y eficiente

---

## 📊 Métricas de Éxito

### Visuales
- ✅ Consistencia en toda la plataforma
- ✅ Reconocimiento de marca > 80%
- ✅ Satisfacción visual del usuario

### Experiencia
- ✅ Tiempo en página > 3 minutos
- ✅ Tasa de rebote < 40%
- ✅ Conversión > 2.5%

---

## 🔄 Versiones

**v1.0** - Marzo 2026
- Identidad inicial
- Sistema de diseño base
- Componentes principales

---

**TuTienda360** © 2026
*Tu marketplace de confianza*
