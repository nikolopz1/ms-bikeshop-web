/* ===== CHECKOUT SCRIPT ===== */

// Obtener carrito del localStorage (simulado)
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Si no hay carrito, usar datos de demostración
if (carrito.length === 0) {
    carrito = [
        { id: 1, nombre: "Bicicleta Mountain Bike Pro", precio: 450000, cantidad: 1 },
        { id: 5, nombre: "Casco de Seguridad", precio: 85000, cantidad: 1 }
    ];
}

// Mostrar resumen de compra
function mostrarResumen() {
    const resumenItems = document.getElementById('resumen-items');
    resumenItems.innerHTML = '';

    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'resumen-item';
        itemElement.innerHTML = `
            <div class="item-info">
                <h4>${item.nombre}</h4>
                <p>Cantidad: ${item.cantidad}</p>
            </div>
            <div class="item-precio">
                $${(item.precio * item.cantidad).toLocaleString('es-CO')}
            </div>
        `;
        resumenItems.appendChild(itemElement);
    });

    actualizarTotal();
}

// Actualizar total
function actualizarTotal() {
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    document.getElementById('resumen-total').textContent = total.toLocaleString('es-CO');
}

// Manejar envío del formulario
document.addEventListener('DOMContentLoaded', function() {
    mostrarResumen();

    const formCheckout = document.getElementById('form-checkout');
    if (formCheckout) {
        formCheckout.addEventListener('submit', procesarPedido);
    }
});

function procesarPedido(e) {
    e.preventDefault();

    // Obtener datos del formulario
    const formData = new FormData(document.getElementById('form-checkout'));
    const datos = Object.fromEntries(formData);

    // Calcular total
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    // Crear objeto de pedido
    const pedido = {
        id: 'PED-' + Date.now(),
        fecha: new Date().toLocaleDateString('es-CO'),
        cliente: datos,
        items: carrito,
        total: total,
        estado: 'pendiente_pago'
    };

    // Guardar pedido en localStorage
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    // Limpiar carrito
    localStorage.removeItem('carrito');

    // Mostrar confirmación según método de pago
    mostrarConfirmacionPago(datos.metodo_pago, pedido);
}

function mostrarConfirmacionPago(metodoPago, pedido) {
    let mensaje = '';
    let detalles = '';

    const total = pedido.total;

    switch(metodoPago) {
        case 'transferencia':
            mensaje = '¡Pedido confirmado! Realiza tu transferencia bancaria';
            detalles = `
                <p><strong>Número de Referencia:</strong> ${pedido.id}</p>
                <p><strong>Banco Destino:</strong> Banco de tu preferencia</p>
                <p><strong>Monto:</strong> $${total.toLocaleString('es-CO')}</p>
                <p style="color: #666; font-size: 14px;">Te contactaremos por WhatsApp para confirmar el pago.</p>
            `;
            break;
        case 'nequi':
            mensaje = '¡Pedido confirmado! Realiza el pago por Nequi';
            detalles = `
                <p><strong>Número de Referencia:</strong> ${pedido.id}</p>
                <p><strong>Monto:</strong> $${total.toLocaleString('es-CO')}</p>
                <p style="color: #666; font-size: 14px;">Te contactaremos por WhatsApp para coordinar el pago.</p>
            `;
            break;
        case 'daviplata':
            mensaje = '¡Pedido confirmado! Realiza el pago por Daviplata';
            detalles = `
                <p><strong>Número de Referencia:</strong> ${pedido.id}</p>
                <p><strong>Monto:</strong> $${total.toLocaleString('es-CO')}</p>
                <p style="color: #666; font-size: 14px;">Te contactaremos por WhatsApp para coordinar el pago.</p>
            `;
            break;
        case 'efectivo':
            mensaje = '¡Pedido confirmado! Pago contra entrega';
            detalles = `
                <p><strong>Número de Referencia:</strong> ${pedido.id}</p>
                <p><strong>Monto a Pagar:</strong> $${total.toLocaleString('es-CO')}</p>
                <p style="color: #666; font-size: 14px;">Te contactaremos por WhatsApp para confirmar la entrega.</p>
            `;
            break;
    }

    // Crear modal de confirmación
    const modalHTML = `
        <div id="confirmacion-modal" class="modal-confirmacion">
            <div class="modal-confirmacion-content">
                <div class="confirmacion-icono">✓</div>
                <h2>${mensaje}</h2>
                <div class="confirmacion-detalles">
                    ${detalles}
                </div>
                <div class="confirmacion-contacto">
                    <h3>Contacta con nosotros</h3>
                    <a href="https://wa.me/573213783612" class="btn btn-primary" target="_blank">
                        <i class="fab fa-whatsapp"></i> Confirmar por WhatsApp
                    </a>
                </div>
                <p style="margin-top: 20px; font-size: 14px; color: #666;">
                    También recibirás un email de confirmación en breve.
                </p>
                <a href="index.html" class="btn btn-secondary" style="margin-top: 10px; display: block; text-align: center;">
                    Volver a la tienda
                </a>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.getElementById('confirmacion-modal');
    modal.style.display = 'block';
}

// Agregar estilos para el checkout
const checkoutStyles = document.createElement('style');
checkoutStyles.textContent = `
    .checkout-section {
        padding: 60px 0;
        background-color: #f5f5f5;
        min-height: 80vh;
    }

    .checkout-section h1 {
        text-align: center;
        font-size: 48px;
        margin-bottom: 50px;
        color: #000;
    }

    .checkout-content {
        display: grid;
        grid-template-columns: 1fr 1.5fr;
        gap: 40px;
    }

    .checkout-resumen {
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        height: fit-content;
        position: sticky;
        top: 100px;
    }

    .checkout-resumen h2 {
        margin-bottom: 20px;
        font-size: 24px;
        color: #000;
    }

    .resumen-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid #eee;
    }

    .resumen-item:last-child {
        border-bottom: none;
    }

    .item-info h4 {
        margin-bottom: 5px;
        font-size: 16px;
    }

    .item-info p {
        font-size: 14px;
        color: #666;
    }

    .item-precio {
        font-weight: bold;
        color: #e63946;
        font-size: 18px;
    }

    .resumen-total {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 2px solid #e63946;
    }

    .resumen-total h3 {
        color: #e63946;
        font-size: 24px;
        text-align: right;
    }

    .checkout-form {
        background-color: white;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .checkout-form h2 {
        margin-bottom: 30px;
        font-size: 28px;
        color: #000;
    }

    fieldset {
        border: none;
        padding: 0 0 30px 0;
        margin-bottom: 30px;
        border-bottom: 2px solid #f5f5f5;
    }

    fieldset:last-of-type {
        border-bottom: none;
    }

    legend {
        font-size: 18px;
        font-weight: 600;
        color: #e63946;
        margin-bottom: 20px;
        display: block;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #333;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-family: inherit;
        font-size: 16px;
    }

    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #e63946;
        box-shadow: 0 0 5px rgba(230, 57, 70, 0.3);
    }

    .metodos-pago {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }

    .opcion-pago {
        display: flex;
        align-items: center;
        padding: 15px;
        border: 2px solid #ddd;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s;
    }

    .opcion-pago:hover {
        border-color: #e63946;
        background-color: #fff5f5;
    }

    .opcion-pago input {
        width: 18px !important;
        height: 18px;
        margin-right: 10px;
        cursor: pointer;
    }

    .opcion-pago span {
        font-weight: 500;
        color: #333;
    }

    .terminos {
        margin: 30px 0;
        padding: 20px;
        background-color: #f5f5f5;
        border-radius: 5px;
    }

    .terminos label {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .terminos input {
        width: 18px !important;
        height: 18px;
        margin-right: 10px;
        cursor: pointer;
    }

    .btn-grande {
        width: 100%;
        padding: 15px !important;
        font-size: 18px;
        margin-top: 20px;
    }

    .modal-confirmacion {
        display: block;
        position: fixed;
        z-index: 3000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        animation: fadeIn 0.3s;
    }

    .modal-confirmacion-content {
        background-color: white;
        margin: 5% auto;
        padding: 50px;
        border-radius: 15px;
        width: 90%;
        max-width: 500px;
        text-align: center;
    }

    .confirmacion-icono {
        width: 80px;
        height: 80px;
        background-color: #e63946;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
        margin: 0 auto 20px;
    }

    .modal-confirmacion-content h2 {
        color: #e63946;
        font-size: 28px;
        margin-bottom: 20px;
    }

    .confirmacion-detalles {
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
        text-align: left;
    }

    .confirmacion-detalles p {
        margin: 10px 0;
    }

    .confirmacion-contacto {
        margin: 30px 0;
    }

    .confirmacion-contacto h3 {
        margin-bottom: 15px;
        font-size: 18px;
    }

    @media (max-width: 768px) {
        .checkout-content {
            grid-template-columns: 1fr;
        }

        .checkout-resumen {
            position: static;
        }

        .checkout-section h1 {
            font-size: 32px;
        }

        .metodos-pago {
            grid-template-columns: 1fr;
        }

        .modal-confirmacion-content {
            padding: 30px;
            width: 95%;
        }

        .checkout-form {
            padding: 20px;
        }

        .checkout-resumen {
            padding: 20px;
        }
    }
`;
document.head.appendChild(checkoutStyles);
