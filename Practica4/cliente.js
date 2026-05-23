let pedidosCliente = [];
let carritoCliente = [];

function consultarProductos() {
  if (typeof listarProductos === "function") {
    return listarProductos();
  }
  return productos;
}

function listarPedidosCliente() {
  return pedidosCliente;
}

function uiConsultarProductos() {
  let div = document.getElementById("listaProductosCliente");
  if (!div) return;
  div.innerHTML = "";
  let lista = consultarProductos();
  lista.forEach(p => {
    let precioMostrar = p.precio;
    let promoInfo = "";
    if (typeof listarPromociones === "function") {
      let promo = listarPromociones().find(pr => pr.idProducto === p.id);
      if (promo) {
        precioMostrar = promo.precioConDescuento;
        promoInfo = ` <span style="color: red; font-size: 0.85em; font-weight: bold;">(Promoción: $${precioMostrar.toFixed(2)})</span>`;
      }
    }
    div.innerHTML += `
      <div style="margin-bottom: 5px; display: flex; align-items: center; gap: 8px;">
        <span>${p.nombre} - $${p.precio.toFixed(2)}${promoInfo}</span>
        <button onclick="uiAgregarAlCarritoCliente(${p.id})" style="padding: 2px 6px; cursor: pointer;">Añadir al Carrito</button>
      </div>
    `;
  });
}

function uiAgregarAlCarritoCliente(id) {
  let todosLosProductos = (typeof listarProductos === "function") ? listarProductos() : productos;
  let prod = todosLosProductos.find(p => p.id === Number(id));
  if (!prod) return;

  let precioFinal = prod.precio;
  if (typeof listarPromociones === "function") {
    let promo = listarPromociones().find(pr => pr.idProducto === prod.id);
    if (promo) {
      precioFinal = promo.precioConDescuento;
    }
  }

  let item = carritoCliente.find(c => c.id === Number(id));
  if (item) {
    item.cantidad++;
  } else {
    carritoCliente.push({
      id: prod.id,
      nombre: prod.nombre,
      precio: precioFinal,
      cantidad: 1
    });
  }
  uiRenderCarritoCliente();
}

function uiCambiarCantidadCliente(id, cambio) {
  let item = carritoCliente.find(c => c.id === Number(id));
  if (!item) return;

  item.cantidad += cambio;
  if (item.cantidad <= 0) {
    carritoCliente = carritoCliente.filter(c => c.id !== Number(id));
  }
  uiRenderCarritoCliente();
}

function uiRenderCarritoCliente() {
  let div = document.getElementById("carritoClienteContenido");
  if (!div) return;
  div.innerHTML = "";

  if (carritoCliente.length === 0) {
    div.innerHTML = "El carrito está vacío.";
    return;
  }

  let total = 0;
  carritoCliente.forEach(item => {
    let itemSubtotal = item.precio * item.cantidad;
    total += itemSubtotal;
    div.innerHTML += `
      <div style="margin-bottom: 6px; display: flex; align-items: center; gap: 15px; font-size: 0.95em;">
        <span>${item.nombre} - $${item.precio.toFixed(2)} x ${item.cantidad} ($${itemSubtotal.toFixed(2)})</span>
        <div style="display: inline-flex; gap: 3px;">
          <button onclick="uiCambiarCantidadCliente(${item.id}, 1)" style="padding: 1px 5px; cursor: pointer;">+</button>
          <button onclick="uiCambiarCantidadCliente(${item.id}, -1)" style="padding: 1px 5px; cursor: pointer;">-</button>
        </div>
      </div>
    `;
  });

  div.innerHTML += `
    <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid #ccc; font-size: 0.95em;">
      <strong>Total a pagar: $${total.toFixed(2)}</strong>
    </div>
  `;
}

function uiConsultarPromociones() {
  let div = document.getElementById("listaPromocionesCliente");
  if (!div) return;
  div.innerHTML = "";
  let lista = (typeof listarPromociones === "function") ? listarPromociones() : [];
  
  if (lista.length === 0) {
    div.innerHTML = "<p>No hay promociones disponibles por el momento.</p>";
    return;
  }
  
  lista.forEach(promo => {
    div.innerHTML += `
      <div style="font-weight: bold; margin-bottom: 5px;">
         ${promo.descripcion} - $${promo.precioConDescuento}
      </div>
    `;
  });
}

function uiCrearPedido() {
  if (carritoCliente.length > 0) {
    let items = carritoCliente.map(item => ({
      id: item.id,
      nombre: item.cantidad > 1 ? `${item.nombre} (x${item.cantidad})` : item.nombre,
      precio: item.precio * item.cantidad
    }));

    let total = items.reduce((acum, { precio }) => acum + Number(precio), 0);

    let nuevoPedido = {
      id: pedidosCliente.length + 1,
      items: items,
      total: total
    };

    pedidosCliente.push(nuevoPedido);

    if (typeof uiRegistrarPedido === "function") {
      uiRegistrarPedido(nuevoPedido);
    } else if (typeof agregarPedido === "function") {
      agregarPedido(nuevoPedido);
    }

    carritoCliente = [];
    uiRenderCarritoCliente();
    renderClientePedidos();
  } else {
    alert("Por favor, añade al menos un producto al carrito de compras.");
  }
}

function renderClientePedidos() {
  let div = document.getElementById("listaPedidosCliente");
  if (!div) return;
  div.innerHTML = "";
  let pedidos = listarPedidosCliente();
  pedidos.forEach(p => {
    let itemsStr = p.items.map(item => item.nombre).join(", ");
    div.innerHTML += `<div>Pedido #${p.id}: ${itemsStr} - Total: $${p.total.toFixed(2)}</div>`;
  });
}

// Inicialización de la interfaz
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderCocina === "function") {
    renderCocina();
  }
  uiConsultarProductos();
  uiConsultarPromociones();
  uiRenderCarritoCliente();
});

