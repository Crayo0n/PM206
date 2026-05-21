
let listaPedidos = [];

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
    div.innerHTML += `
      <div style="margin-bottom: 5px;">
        <label>
          <input type="checkbox" name="cajaCheck" value="${id}">
          ${nombre} - $${precio.toFixed(2)}
        </label>
      </div>
    `;
  });
}

function uiCrearPedidoCaja() {
  let checks = document.querySelectorAll('input[name="cajaCheck"]:checked');
  let ids = [];
  checks.forEach(c => ids.push(Number(c.value)));

  if (ids.length > 0) {
    let items = [];

    if (typeof listarProductos === "function") {
      let todosLosProductos = listarProductos();
      ids.forEach(id => {
        let prod = todosLosProductos.find(p => p.id === id);
        if (prod) {
          items.push(prod);
        }
      });
    }

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

    checks.forEach(c => c.checked = false);
  } else {
    alert("Por favor, selecciona al menos un producto.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductosCaja();
  renderCaja();
});
