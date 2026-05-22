let pedidosCliente = [];

function consultarProductos() {
  if (typeof listarProductos === "function") {
    return listarProductos();
  }
  return productos;
}

function crearPedidoProductos(ids, promoIds = []) {
  let items = [];
  let total = 0;
  let todosLosProductos = (typeof listarProductos === "function") ? listarProductos() : productos;

  // Agregar productos regulares
  ids.forEach(id => {
    let prod = todosLosProductos.find(p => p.id === Number(id));
    if (prod) {
      items.push(prod);
      total += prod.precio;
    }
  });

  // Agregar productos en promoción
  if (typeof listarPromociones === "function") {
    let todasLasPromociones = listarPromociones();
    promoIds.forEach(id => {
      let promo = todasLasPromociones.find(p => p.idProducto === Number(id));
      if (promo) {
        // Formatear la promoción como un producto para la caja
        items.push({
          id: promo.idProducto,
          nombre: `[PROMO] ${promo.nombreProducto}`,
          precio: promo.precioConDescuento,
          categoria: "Promoción"
        });
        total += promo.precioConDescuento;
      }
    });
  }

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

function uiConsultarPromociones() {
  let div = document.getElementById("listaPromocionesCliente");
  if (!div) return;
  div.innerHTML = "";
  let lista = listarPromociones();
  
  if (lista.length === 0) {
    div.innerHTML = "<p>No hay promociones disponibles por el momento.</p>";
    return;
  }
  
  lista.forEach(promo => {
    div.innerHTML += `
      <div style="border: 1px solid #ffcc00; padding: 10px; border-radius: 5px; margin-bottom: 10px; background-color: #fffdf0; display: inline-block; width: 200px; vertical-align: top;">
         <div style="font-weight: bold; margin-bottom: 5px; color: #cc5500;">
           ${promo.descripcion}
         </div>
         <div style="margin-bottom: 10px;">
           <span style="text-decoration: line-through; color: #999;">$${promo.precioOriginal}</span>
           <span style="font-size: 1.2em; color: #d32f2f; font-weight: bold;">$${promo.precioConDescuento}</span>
         </div>
         <label style="cursor: pointer; display: block; text-align: center; background-color: #ff9800; color: white; padding: 5px; border-radius: 3px;">
           <input type="checkbox" name="promocionesCheck" value="${promo.idProducto}">
           Agregar al Pedido
         </label>
      </div>
    `;
  });
}

function uiCrearPedido() {
  let checks = document.querySelectorAll('input[name="pedidosCheck"]:checked');
  let ids = [];
  checks.forEach(c => ids.push(Number(c.value)));

  let promoChecks = document.querySelectorAll('input[name="promocionesCheck"]:checked');
  let promoIds = [];
  promoChecks.forEach(c => promoIds.push(Number(c.value)));

  if (ids.length > 0 || promoIds.length > 0) {
    crearPedidoProductos(ids, promoIds);
    renderClientePedidos();
    uiConsultarProductos();
    uiConsultarPromociones(); // Reset checks in promotions
    checks.forEach(c => c.checked = false);
    promoChecks.forEach(c => c.checked = false);
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
  uiConsultarPromociones();
});

