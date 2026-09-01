/* ===== BASE DE DATOS DE PRODUCTOS ===== */
const productos = [
    // BICICLETAS
    {
        id: 1,
        nombre: "Bicicleta Mountain Bike Pro",
        categoria: "bicicletas",
        precio: 450000,
        descripcion: "Bicicleta de montaña de alta gama con suspensión delantera",
        emoji: "🚴"
    },
    {
        id: 2,
        nombre: "Bicicleta BMX Freestyle",
        categoria: "bicicletas",
        precio: 280000,
        descripcion: "Perfecta para trucos y acrobacias",
        emoji: "🚲"
    },
    {
        id: 3,
        nombre: "Bicicleta Ruta Profesional",
        categoria: "bicicletas",
        precio: 650000,
        descripcion: "Ligera y aerodinámica para carreras",
        emoji: "🏍️"
    },
    {
        id: 4,
        nombre: "Bicicleta Urbana Comfort",
        categoria: "bicicletas",
        precio: 350000,
        descripcion: "Ideal para paseos diarios en la ciudad",
        emoji: "🚲"
    },
    // ACCESORIOS
    {
        id: 5,
        nombre: "Casco de Seguridad",
        categoria: "accesorios",
        precio: 85000,
        descripcion: "Casco certificado para máxima protección",
        emoji: "🎯"
    },
    {
        id: 6,
        nombre: "Luces LED Set",
        categoria: "accesorios",
        precio: 45000,
        descripcion: "Luces delantera y trasera recargables",
        emoji: "💡"
    },
    {
        id: 7,
        nombre: "Candado de Seguridad",
        categoria: "accesorios",
        precio: 55000,
        descripcion: "Candado U de acero reforzado",
        emoji: "🔒"
    },
    {
        id: 8,
        nombre: "Espejo Retrovisor",
        categoria: "accesorios",
        precio: 25000,
        descripcion: "Espejo ajustable para mayor visibilidad",
        emoji: "🪞"
    },
    // REPUESTOS
    {
        id: 9,
        nombre: "Llantas Pro 27.5",
        categoria: "repuestos",
        precio: 120000,
        descripcion: "Par de llantas de calidad premium",
        emoji: "⭕"
    },
    {
        id: 10,
        nombre: "Cadena de Bicicleta",
        categoria: "repuestos",
        precio: 35000,
        descripcion: "Cadena resistente y duradera",
        emoji: "⛓️"
    },
    {
        id: 11,
        nombre: "Pastillas de Freno",
        categoria: "repuestos",
        precio: 28000,
        descripcion: "Juego de pastillas de freno hidráulicas",
        emoji: "🛑"
    },
    {
        id: 12,
        nombre: "Manillar de Aluminio",
        categoria: "repuestos",
        precio: 65000,
        descripcion: "Manillar ligero y resistente",
        emoji: "🔧"
    }
];

/* ===== GALERÍA DE TRABAJOS ===== */
const galeriaTrabajos = [
    { id: 1, titulo: "Limpieza completa", emoji: "✨" },
    { id: 2, titulo: "Cambio de llantas", emoji: "⭕" },
    { id: 3, titulo: "Ajuste de frenos", emoji: "🛑" },
    { id: 4, titulo: "Alineación de ruedas", emoji: "⚙️" },
    { id: 5, titulo: "Cambio de cadena", emoji: "⛓️" },
    { id: 6, titulo: "Reparación de pinchazo", emoji: "🔧" }
];

/* ===== CARRITO ===== */
let carrito = [];

/* ===== FUNCIONES PRINCIPALES ===== */

// Cargar productos en la página
function cargarProductos(filtro = 'todos') {
    const productosGrid = document.getElementById('productos-grid');
    productosGrid.innerHTML = '';

    const productosFiltrados = filtro === 'todos' 
        ? productos 
        : productos.filter(p => p.categoria === filtro);

    productosFiltrados.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'producto-card';
        productoCard.innerHTML = `
            <div class="producto-image">${producto.emoji}</div>
            <div class="producto-info">
                <span class="producto-categoria">${producto.categoria.toUpperCase()}</span>
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <p class="producto-precio">$${producto.precio.toLocaleString('es-CO')}</p>
                <div class="producto-actions">
                    <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">
                        <i class="fas fa-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>
        `;
        productosGrid.appendChild(productoCard);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const productoEnCarrito = carrito.find(p => p.id === productoId);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
    mostrarNotificacion('Producto agregado al carrito');
}

// Actualizar carrito
function actualizarCarrito() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = carrito.reduce((total, p) => total + p.cantidad, 0);
    renderizarCarrito();
}

// Renderizar items del carrito
function renderizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = '';

    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p style="text-align: center; padding: 20px;">Tu carrito está vacío</p>';
        document.getElementById('ir-checkout').disabled = true;
        return;
    }

    document.getElementById('ir-checkout').disabled = false;

    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'carrito-item';
        itemElement.innerHTML = `
            <div class="carrito-item-info">
                <h4>${item.nombre}</h4>
                <p>Cantidad: ${item.cantidad}</p>
                <p class="carrito-item-precio">$${(item.precio * item.cantidad).toLocaleString('es-CO')}</p>
            </div>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        carritoItems.appendChild(itemElement);
    });

    actualizarTotal();
}

// Eliminar del carrito
function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(p => p.id !== productoId);
    actualizarCarrito();
    mostrarNotificacion('Producto eliminado del carrito');
}

// Actualizar total
function actualizarTotal() {
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    document.getElementById('total-precio').textContent = total.toLocaleString('es-CO');
}

// Ir al checkout
document.addEventListener('DOMContentLoaded', function() {
    const btnCheckout = document.getElementById('ir-checkout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', irAlCheckout);
    }
});

function irAlCheckout() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    // Abrir modal de checkout
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        checkoutModal.style.display = 'block';
    }
}

// Cargar galería
function cargarGaleria() {
    const galeriaGrid = document.getElementById('galeria-grid');
    if (!galeriaGrid) return;

    galeriaGrid.innerHTML = '';
    galeriaTrabajos.forEach(trabajo => {
        const item = document.createElement('div');
        item.className = 'galeria-item';
        item.innerHTML = `
            <div class="galeria-item-image">${trabajo.emoji}</div>
            <div class="galeria-item-overlay">
                <p>${trabajo.titulo}</p>
            </div>
        `;
        galeriaGrid.appendChild(item);
    });
}

// Modal del carrito
function setupModalCarrito() {
    const modal = document.getElementById('carrito-modal');
    const cartIcon = document.querySelector('.carrito-icon');
    const closeBtn = document.querySelector('.close');

    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Filtros de productos
function setupFiltros() {
    const filtros = document.querySelectorAll('.filtro-btn');
    filtros.forEach(btn => {
        btn.addEventListener('click', () => {
            filtros.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filtro = btn.dataset.filter;
            cargarProductos(filtro);
        });
    });
}

// Menú hamburguesa
function setupHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Formulario de mantenimiento
function setupFormMantenimiento() {
    const form = document.getElementById('form-mantenimiento');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            
            // Aquí puedes enviar los datos a un servidor o procesarlos
            console.log('Datos de mantenimiento:', Object.fromEntries(formData));
            
            alert('¡Reserva enviada! Nos contactaremos pronto para confirmar tu cita.');
            form.reset();
            mostrarNotificacion('Reserva de mantenimiento enviada');
        });
    }
}

// Formulario de contacto
function setupFormContacto() {
    const form = document.getElementById('form-contacto');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            alert('¡Mensaje enviado! Te responderemos pronto.');
            form.reset();
            mostrarNotificacion('Mensaje de contacto enviado');
        });
    }
}

// Notificaciones
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #e63946;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease-in-out;
    `;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

/* ===== INICIALIZAR ===== */
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
    cargarGaleria();
    setupModalCarrito();
    setupFiltros();
    setupHamburger();
    setupFormMantenimiento();
    setupFormContacto();
});

// Scroll smooth para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
