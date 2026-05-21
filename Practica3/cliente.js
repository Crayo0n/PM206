let pedidosCliente = [];

function consultarProductos() {
  if (typeof listarProductos === "function") {
    return listarProductos();
  }
  return productos;
}

function crearPedidoProductos(ids) {
  let items = [];
  let total = 0;
  let todosLosProductos = (typeof listarProductos === "function") ? listarProductos() : productos;
  ids.forEach(id => {
    let prod = todosLosProductos.find(p => p.id === Number(id));
    if (prod) {
      items.push(prod);
      total += prod.precio;
    }
  });
  let nuevoPedido = {
    id: pedidosCliente.length + 1,
    items: items,
    total: total
  };
  pedidosCliente.push(nuevoPedido);
  if (typeof uiRegistrarPedido === "function") {
    uiRegistrarPedido(nuevoPedido);
  } else {
    agregarPedido(nuevoPedido);
  }
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
    div.innerHTML += `
      <div>
        <input type="checkbox" name="pedidosCheck" value="${p.id}">
        ${p.nombre} - $${p.precio}
      </div>
    `;
  });
}

function uiCrearPedido() {
  let checks = document.querySelectorAll('input[name="pedidosCheck"]:checked');
  let ids = [];
  checks.forEach(c => ids.push(Number(c.value)));
  if (ids.length > 0) {
    crearPedidoProductos(ids);
    renderClientePedidos();
    uiConsultarProductos();
    checks.forEach(c => c.checked = false);
  }
}

function renderClientePedidos() {
  let div = document.getElementById("listaPedidosCliente");
  if (!div) return;
  div.innerHTML = "";
  let pedidos = listarPedidosCliente();
  pedidos.forEach(p => {
    let itemsStr = p.items.map(item => item.nombre).join(", ");
    div.innerHTML += `<div>Pedido #${p.id}: ${itemsStr} - Total: $${p.total}</div>`;
  });
}

// Inicialización de la interfaz
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderCocina === "function") {
    renderCocina();
  }
  uiConsultarProductos();
});

