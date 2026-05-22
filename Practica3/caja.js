
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

function renderCaja() {
  let div = document.getElementById("listaPedidosCaja");
  if (!div) return;
  div.innerHTML = "";

  let pedidos = listarPedidos();
  pedidos.forEach(pedido => {
    const { id, items, subtotal: s = 0, iva: i = 0, total: t = 0 } = pedido;
    let itemsStr = items.map(({ nombre }) => nombre).join(", ");

    div.innerHTML += `
      <div style="margin-bottom: 8px; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #fafafa;">
        <strong>Pedido #${id}:</strong> ${itemsStr} <br>
        <span style="color: #666; font-size: 0.9em;">
          Subtotal: $${Number(s).toFixed(2)} | IVA (16%): $${Number(i).toFixed(2)} | <strong>Total: $${Number(t).toFixed(2)}</strong>
        </span>
      </div>
    `;
  });
}

function uiRegistrarPedido(pedido) {
  agregarPedido(pedido);
  renderCaja();
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
  if (carritoCaja.length > 0) {
    let items = carritoCaja.map(item => ({
      id: item.id,
      nombre: item.cantidad > 1 ? `${item.nombre} (x${item.cantidad})` : item.nombre,
      precio: item.precio * item.cantidad
    }));

    const subtotal = items.reduce((acum, { precio }) => acum + Number(precio), 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    let nuevoPedido = {
      id: listarPedidos().length + 1,
      items,
      subtotal,
      iva,
      total
    };

    uiRegistrarPedido(nuevoPedido);

    carritoCaja = [];
    uiRenderCarritoCaja();
  } else {
    alert("Por favor, agrega al menos un producto al carrito de caja.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductosCaja();
  renderCaja();
  uiRenderCarritoCaja();
});
