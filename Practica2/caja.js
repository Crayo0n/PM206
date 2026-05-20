let listaPedidos = [];
let totalAcumulado = 0;

// Lógica de Datos (Core Logic)
function agregarPedido(pedido) {
  listaPedidos.push(pedido);
  totalAcumulado += Number(pedido.total);
}

function listarPedidos() {
  return listaPedidos;
}

function obtenerTotalAcumulado() {
  return totalAcumulado;
}

// Funciones de Interfaz (UI) y Renderizado
function renderCaja() {
  let totalEl = document.getElementById("totalCaja");
  if (totalEl) {
    totalEl.innerText = obtenerTotalAcumulado();
  }
  
  let div = document.getElementById("listaPedidosCaja");
  if (!div) return;
  div.innerHTML = "";
  
  let pedidos = listarPedidos();
  pedidos.forEach(p => {
    let itemsStr = p.items.map(item => item.nombre).join(", ");
    div.innerHTML += `<div>Pedido #${p.id}: ${itemsStr} - Total: $${p.total}</div>`;
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
    div.innerHTML += `
      <div>
        <input type="checkbox" name="cajaCheck" value="${p.id}">
        ${p.nombre} - $${p.precio}
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
    let total = 0;
    
    if (typeof listarProductos === "function") {
      let todosLosProductos = listarProductos();
      ids.forEach(id => {
        let prod = todosLosProductos.find(p => p.id === id);
        if (prod) {
          items.push(prod);
          total += prod.precio;
        }
      });
    }
    
    let nuevoPedido = {
      id: listarPedidos().length + 1,
      items: items,
      total: total
    };
    
    uiRegistrarPedido(nuevoPedido);
    
    // Desmarcar todos los checkboxes
    checks.forEach(c => c.checked = false);
  } else {
    alert("Por favor, selecciona al menos un producto.");
  }
}

// Inicialización de la interfaz de la Caja
document.addEventListener("DOMContentLoaded", () => {
  renderProductosCaja();
  renderCaja();
});

