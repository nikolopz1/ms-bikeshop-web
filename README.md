# 🚲 MS BikeShop - Tienda Virtual

Bienvenido a **MS BikeShop**, la tienda en línea profesional para venta de bicicletas, accesorios y servicios de mantenimiento.

## ✨ Características Principales

- 🛒 **Catálogo de Productos**: Bicicletas, accesorios y repuestos organizados por categorías
- 🛍️ **Carrito de Compras**: Interfaz intuitiva para agregar y eliminar productos
- 💳 **Sistema de Checkout**: Formulario completo de compra con datos de envío
- 💰 **Múltiples Métodos de Pago**: Transferencia, Nequi, Daviplata y Efectivo contra entrega
- 🔧 **Reserva de Mantenimientos**: Sistema de citas para servicios de reparación
- 📸 **Galería de Trabajos**: Muestra los resultados de los mantenimientos realizados
- 📱 **Diseño Responsive**: Funciona perfectamente en móvil, tablet y desktop
- 📞 **Contacto Directo**: Integración con WhatsApp e Instagram

## 🎨 Diseño

- **Colores Corporativos**: Rojo (#e63946), Blanco y Negro
- **Identidad Visual**: Coherente con el logo de MS BikeShop
- **Eslogan**: "Wellness in Motion"

## 📁 Estructura de Archivos

```
ms-bikeshop-web/
├── index.html          # Página principal
├── checkout.html       # Página de checkout
├── styles.css          # Estilos globales
├── script.js           # Lógica de la tienda
├── checkout.js         # Lógica de compra
├── README.md           # Este archivo
└── images/             # Carpeta para logos e imágenes
    ├── logo.png        # Logo de la tienda
    └── mascota.png     # Mascota de MS BikeShop
```

## 🚀 Cómo Usar

### 1. **Descargar/Clonar el Repositorio**
```bash
git clone https://github.com/nikolopz1/ms-bikeshop-web.git
cd ms-bikeshop-web
```

### 2. **Abrir la Página Localmente**
- Simplemente abre `index.html` en tu navegador
- O usa un servidor local (recomendado):
  ```bash
  # Con Python 3
  python -m http.server 8000
  
  # Con Node.js (si tienes http-server)
  npx http-server
  ```

### 3. **Acceder a la Tienda**
- Abre `http://localhost:8000` en tu navegador

## 📦 Gestión de Productos

### Agregar Nuevo Producto

Abre `script.js` y busca la sección `const productos = [...]`

Agrega un nuevo objeto con esta estructura:

```javascript
{
    id: 13,                    // ID único del producto
    nombre: "Nombre del Producto",
    categoria: "bicicletas",   // bicicletas, accesorios, repuestos
    precio: 100000,            // Precio en pesos colombianos
    descripcion: "Descripción del producto",
    emoji: "🚲"               // Emoji representativo
}
```

### Modificar Precio de un Producto

Busca el producto en `script.js` y actualiza el campo `precio`.

### Eliminar un Producto

Elimina el objeto del producto de la array `productos` en `script.js`.

## 📝 Agregar a la Galería de Trabajos

Abre `script.js` y busca `const galeriaTrabajos = [...]`

Agrega un nuevo trabajo:

```javascript
{
    id: 7,
    titulo: "Nombre del trabajo",
    emoji: "🔧"
}
```

## 💳 Métodos de Pago

La tienda soporta los siguientes métodos de pago:

1. **Transferencia Bancaria**: El cliente realiza una transferencia a tu cuenta
2. **Nequi**: Billetera digital para pagos móviles
3. **Daviplata**: Servicio de billetera de Davivienda
4. **Efectivo Contra Entrega**: Pago al recibir el producto

## 📧 Configurar Contacto

### WhatsApp
Cambia el número en los siguientes lugares:

- En `index.html`: Busca `321 378 3612` y reemplaza
- Links: `https://wa.me/573213783612` → usa tu número

### Email de Contacto
Actualmente los formularios guardan datos localmente. Para recibir emails:
- Opción 1: Usar un servicio como Formspree o EmailJS
- Opción 2: Implementar un backend (Node.js, PHP, Python)

### Instagram
Busca `@MS_Bikeshop_` y reemplaza con tu usuario

## 🌐 Publicar la Tienda Online

### Opción 1: GitHub Pages (GRATIS)
1. El repositorio ya está en GitHub
2. Ve a **Settings → Pages**
3. Selecciona rama `main` como fuente
4. Tu tienda estará en: `https://nikolopz1.github.io/ms-bikeshop-web/`

### Opción 2: Netlify (GRATIS)
1. Ve a [netlify.com](https://netlify.com)
2. Conecta tu repositorio de GitHub
3. Deploya automáticamente

### Opción 3: Tu propio servidor
- Sube los archivos vía FTP a tu hosting
- Asegúrate de que todos los archivos estén en la raíz

## 🔐 Almacenamiento de Datos

Actualmente la tienda usa `localStorage` del navegador para:
- Guardar el carrito
- Guardar pedidos realizados

### Para Persistencia Real (Base de Datos)
Necesitarías:
1. Un backend (Node.js, Python, PHP, etc.)
2. Una base de datos (MongoDB, MySQL, etc.)
3. API para comunicación

## 🎯 Funcionalidades Implementadas

✅ Catálogo de productos dinámico
✅ Filtrado por categoría
✅ Carrito de compras funcional
✅ Cálculo automático de totales
✅ Formulario de compra completo
✅ Múltiples métodos de pago
✅ Sistema de reserva de mantenimientos
✅ Galería de trabajos
✅ Formulario de contacto
✅ Menú responsivo
✅ Notificaciones al usuario
✅ Integración con WhatsApp
✅ Diseño profesional y moderno

## 🔧 Personalización Avanzada

### Cambiar Colores
Abre `styles.css` y modifica las variables globales:

```css
:root {
    --color-primary: #e63946;      /* Rojo principal */
    --color-secondary: #000;       /* Negro */
    --color-light: #ffffff;        /* Blanco */
    --color-gray: #f5f5f5;         /* Gris claro */
}
```

### Agregar Más Filtros de Productos
1. Agrega nuevas categorías en `const productos`
2. El sistema se adaptará automáticamente

### Cambiar Fuente
En `styles.css`, busca `--font-main` y actualiza

## 📱 Compatible Con

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Navegadores móviles

## 📞 Soporte

Para actualizar la tienda o agregar nuevas funciones:

1. **Edita los archivos directamente en GitHub** (sin necesidad de código)
2. **O clona localmente** y usa Git para actualizaciones

## 📊 Próximas Mejoras Posibles

- [ ] Backend para almacenar pedidos en base de datos
- [ ] Sistema de usuarios registrados
- [ ] Notificaciones por email
- [ ] Panel administrativo
- [ ] Integración con pasarelas de pago reales
- [ ] Sistema de tracking de envíos
- [ ] Cupones de descuento
- [ ] Reseñas de clientes

## 📄 Licencia

Proyecto personal de MS BikeShop - 2024

## 👨‍💼 Créditos

Desarrollado con ❤️ para MS BikeShop
**Wellness in Motion** 🚲

---

**¿Necesitas ayuda?** Contacta:
- 📱 WhatsApp: [321 378 3612](https://wa.me/573213783612)
- 📸 Instagram: [@MS_Bikeshop_](https://instagram.com/MS_Bikeshop_)
