let listaPedidos = [];
let carritoCaja = [];

function agregarPedido(pedido) {
  if (pedido.subtotal === undefined || pedido.iva === undefined) {
    const subtotal = pedido.items.reduce((acum, { precio }) => acum + Number(precio), 0);
    pedido.subtotal = subtotal;
    pedido.iva = subtotal * 0.16;
    pedido.total = subtotal + pedido.iva;
  }
  listaPedidos.push(pedido);
}

function listarPedidos() {
  return listaPedidos;
}

function obtenerTotalesAcumulados() {
  return listaPedidos.reduce(
    (acum, { subtotal = 0, iva = 0, total = 0 }) => {
      acum.subtotal += Number(subtotal);
      acum.iva += Number(iva);
      acum.total += Number(total);
      return acum;
    },
    { subtotal: 0, iva: 0, total: 0 }
  );
}

function obtenerTotalAcumulado() {
  const { total } = obtenerTotalesAcumulados();
  return total;
}

function cancelarPedidoCaja(id) {
  let pedido = listaPedidos.find(p => p.id === id);
  if (pedido && pedido.estado !== 'Pedido entregado' && pedido.estado !== 'Cancelado') {
    pedido.estado = 'Cancelado';
    renderRegistroPedidos();
    if (typeof renderPedidosCocina === "function") renderPedidosCocina();
  }
}

function renderRegistroPedidos() {
  let div = document.getElementById("listaPedidosCaja");
  if (!div) return;
  div.innerHTML = "";
  listaPedidos.forEach(pedido => {
    const { id, items, total: t = 0, estado } = pedido;
    let itemsStr = items.map(({ nombre }) => nombre).join(", ");
    let colorEstado = typeof getColorEstado === "function" ? getColorEstado(estado) : '#333';
    let botonCancelar = "";
    if (estado !== 'Pedido entregado' && estado !== 'Cancelado') {
      botonCancelar = `<button onclick="cancelarPedidoCaja(${id})" style="margin-left: 10px; padding: 2px 6px; font-size: 0.85em; cursor: pointer; background-color: #f44336; color: white; border: none; border-radius: 3px;">Cancelar</button>`;
    }
    div.innerHTML += `
      <div style="margin-bottom: 8px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background-color: #fcfcfc;">
        <strong>Pedido #${id}:</strong> ${itemsStr} - <strong>Total: $${Number(t).toFixed(2)}</strong> <br>
        <span style="font-size: 0.9em; color: #555;">
          Estado: <strong style="color: ${colorEstado};">${estado}</strong>
        </span>
        ${botonCancelar}
      </div>
    `;
  });
}

function renderCaja() {
  let div = document.getElementById("estadosPedidosCaja");
  if (!div) return;
  div.innerHTML = "";

  let pedidos = typeof listarPedidosCliente === "function" ? listarPedidosCliente() : [];
  if (pedidos.length === 0) {
    div.innerHTML = "Sin pedidos.";
    return;
  }

  pedidos.forEach(p => {
    div.innerHTML += `<div class="pedido-item">Pedido #${p.id}: <strong>${p.estado}</strong></div>`;
  });
}

function uiRegistrarPedido(pedido) {
  agregarPedido(pedido);
  renderRegistroPedidos();
}

function renderProductosCaja() {
  let div = document.getElementById("productosCaja");
  if (!div) return;
  div.innerHTML = "";

  if (typeof listarProductos !== "function") return;

  let lista = listarProductos();
  lista.forEach(p => {
    const { id, nombre, precio } = p;
    let precioMostrar = precio;
    let promoInfo = "";
    if (typeof listarPromociones === "function") {
      let promo = listarPromociones().find(pr => pr.idProducto === id);
      if (promo) {
        precioMostrar = promo.precioConDescuento;
        promoInfo = ` <span style="color: red; font-size: 0.85em; font-weight: bold;">(${promo.descuento}% desc.)</span>`;
      }
    }
    div.innerHTML += `
      <div style="margin-bottom: 5px; display: flex; align-items: center; gap: 8px;">
        <span>${nombre} - $${precioMostrar.toFixed(2)}${promoInfo}</span>
        <button onclick="uiAgregarAlCarritoCaja(${id})" style="padding: 2px 6px; cursor: pointer;">Añadir</button>
      </div>
    `;
  });
}

function uiAgregarAlCarritoCaja(id) {
  if (typeof listarProductos !== "function") return;
  let todos = listarProductos();
  let prod = todos.find(p => p.id === id);
  if (!prod) return;

  let precioFinal = prod.precio;
  if (typeof listarPromociones === "function") {
    let promo = listarPromociones().find(pr => pr.idProducto === id);
    if (promo) {
      precioFinal = promo.precioConDescuento;
    }
  }

  let item = carritoCaja.find(c => c.id === id);
  if (item) {
    item.cantidad++;
  } else {
    carritoCaja.push({
      id: prod.id,
      nombre: prod.nombre,
      precio: precioFinal,
      cantidad: 1
    });
  }
  uiRenderCarritoCaja();
}

function uiCambiarCantidadCaja(id, cambio) {
  let item = carritoCaja.find(c => c.id === id);
  if (!item) return;

  item.cantidad += cambio;
  if (item.cantidad <= 0) {
    carritoCaja = carritoCaja.filter(c => c.id !== id);
  }
  uiRenderCarritoCaja();
}

function uiRenderCarritoCaja() {
  let div = document.getElementById("carritoCajaContenido");
  if (!div) return;
  div.innerHTML = "";

  if (carritoCaja.length === 0) {
    div.innerHTML = "El carrito está vacío.";
    return;
  }

  let subtotal = 0;
  carritoCaja.forEach(item => {
    let itemSubtotal = item.precio * item.cantidad;
    subtotal += itemSubtotal;
    div.innerHTML += `
      <div style="margin-bottom: 6px; display: flex; align-items: center; gap: 15px; font-size: 0.95em;">
        <span>${item.nombre} - $${item.precio.toFixed(2)} x ${item.cantidad} ($${itemSubtotal.toFixed(2)})</span>
        <div style="display: inline-flex; gap: 3px;">
          <button onclick="uiCambiarCantidadCaja(${item.id}, 1)" style="padding: 1px 5px; cursor: pointer;">+</button>
          <button onclick="uiCambiarCantidadCaja(${item.id}, -1)" style="padding: 1px 5px; cursor: pointer;">-</button>
        </div>
      </div>
    `;
  });

  let iva = subtotal * 0.16;
  let total = subtotal + iva;

  div.innerHTML += `
    <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid #ccc; font-size: 0.9em; color: #555;">
      Subtotal: $${subtotal.toFixed(2)} | IVA (16%): $${iva.toFixed(2)} | <strong>Total: $${total.toFixed(2)}</strong>
    </div>
  `;
}

function uiCrearPedidoCaja() {
  if (carritoCaja.length === 0) {
    alert("Por favor, agrega al menos un producto al carrito de caja.");
    return;
  }

  let items = carritoCaja.map(item => ({
    id: item.id,
    nombre: item.cantidad > 1 ? `${item.nombre} (x${item.cantidad})` : item.nombre,
    precio: item.precio * item.cantidad
  }));

  const subtotal = items.reduce((acum, { precio }) => acum + Number(precio), 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  let pedidosShared = typeof listarPedidosCliente === "function" ? listarPedidosCliente() : [];

  let nuevoPedido = {
    id: pedidosShared.length + 1,
    items,
    subtotal,
    iva,
    total,
    estado: 'Pedido recibido'
  };

  pedidosShared.push(nuevoPedido);
  agregarPedido(nuevoPedido);
  renderRegistroPedidos();

  if (typeof renderPedidosCocina === "function") renderPedidosCocina();

  carritoCaja = [];
  uiRenderCarritoCaja();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductosCaja();
  renderRegistroPedidos();
  renderCaja();
  uiRenderCarritoCaja();
});
