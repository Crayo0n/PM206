let productos = [
  { id: 1, nombre: "Cafe Americano", precio: 35, categoria: "Bebida" },
  { id: 2, nombre: "Capuccino", precio: 45, categoria: "Bebida" },
  { id: 3, nombre: "Muffin", precio: 30, categoria: "Postre" }
];

function agregarProducto(id, nombre, precio, categoria = "Otro") {
  productos.push({ id: Number(id), nombre, precio: Number(precio), categoria });
}

function editarProducto(id, nuevoNombre, nuevoPrecio) {
  let producto = productos.find(p => p.id === Number(id));
  if (producto) {
    producto.nombre = nuevoNombre;
    producto.precio = Number(nuevoPrecio);
  }
}

function eliminarProducto(id) {
  productos = productos.filter(p => p.id !== Number(id));
}

function listarProductos() {
  return productos;
}
let productoEditandoId = null;

function renderCocina() {
  let div = document.getElementById("listaProductosCocina");
  if (!div) return;
  div.innerHTML = "";
  let lista = listarProductos();
  lista.forEach(p => {
    if (p.id === productoEditandoId) {
      div.innerHTML += `
        <div class="producto-item">
          [${p.id}] 
          <input type="text" id="editNombre-${p.id}" value="${p.nombre}" style="padding: 2px 5px; margin-right: 5px;">
          - $
          <input type="number" id="editPrecio-${p.id}" value="${p.precio}" style="width: 70px; padding: 2px 5px; margin-right: 5px;">
          <button onclick="uiGuardarEdicion(${p.id})">Guardar</button>
          <button onclick="uiCancelarEdicion()">Cancelar</button>
        </div>
      `;
    } else {
      div.innerHTML += `
        <div class="producto-item">
          [${p.id}] ${p.nombre} - $${p.precio}
          <button onclick="uiHabilitarEdicion(${p.id})">Editar</button>
          <button onclick="uiEliminarProducto(${p.id})">Eliminar</button>
        </div>
      `;
    }
  });
}

function uiAgregarProducto() {
  let id = document.getElementById("prodId").value;
  let nombre = document.getElementById("prodNombre").value;
  let precio = document.getElementById("prodPrecio").value;
  if (id && nombre && precio) {
    agregarProducto(id, nombre, precio);
    document.getElementById("prodId").value = "";
    document.getElementById("prodNombre").value = "";
    document.getElementById("prodPrecio").value = "";
    renderCocina();
    if (typeof uiConsultarProductos === "function") {
      uiConsultarProductos();
    }
    if (typeof renderProductosCaja === "function") {
      renderProductosCaja();
    }
  }
}

function uiHabilitarEdicion(id) {
  productoEditandoId = id;
  renderCocina();
}

function uiCancelarEdicion() {
  productoEditandoId = null;
  renderCocina();
}

function uiGuardarEdicion(id) {
  let nuevoNombre = document.getElementById(`editNombre-${id}`).value.trim();
  let nuevoPrecio = document.getElementById(`editPrecio-${id}`).value.trim();
  if (nuevoNombre && nuevoPrecio) {
    editarProducto(id, nuevoNombre, nuevoPrecio);
    productoEditandoId = null;
    renderCocina();
    if (typeof uiConsultarProductos === "function") {
      uiConsultarProductos();
    }
    if (typeof renderProductosCaja === "function") {
      renderProductosCaja();
    }
  } else {
    alert("Por favor, completa todos los campos.");
  }
}

function uiEliminarProducto(id) {
  eliminarProducto(id);
  renderCocina();
  if (typeof uiConsultarProductos === "function") {
    uiConsultarProductos();
  }
  if (typeof renderProductosCaja === "function") {
    renderProductosCaja();
  }
}

function buscarProductosBaratos() {
  return productos.filter(p => p.precio < 40);
}

function buscarProductosCaros() {
  return productos.filter(p => p.precio >= 40);
}

function buscarBebidas() {
  const palabrasClave = ["cafe", "capuccino", "agua", "refresco", "jugo", "te", "bebida", "café"];
  return productos.filter(p => 
    (p.categoria && p.categoria.toLowerCase() === "bebida") || 
    palabrasClave.some(palabra => p.nombre.toLowerCase().includes(palabra))
  );
}

function buscarPostres() {
  const palabrasClave = ["muffin", "pastel", "galleta", "crepa", "postre", "pay"];
  return productos.filter(p => 
    (p.categoria && p.categoria.toLowerCase() === "postre") || 
    palabrasClave.some(palabra => p.nombre.toLowerCase().includes(palabra))
  );
}

function buscarProductoPorNombre(nombreBuscado) {
  return productos.find(p => p.nombre.toLowerCase() === nombreBuscado.toLowerCase());
}

function buscarProductoPorId(id) {
  return productos.find(p => p.id === Number(id));
}
let promociones = [];
function agregarPromocion(idProducto, descuento, descripcion) {
  let producto = productos.find(p => p.id === Number(idProducto));
  if (producto) {
    promociones.push({
      idProducto: Number(idProducto),
      nombreProducto: producto.nombre,
      precioOriginal: producto.precio,
      descuento: Number(descuento),
      precioConDescuento: +(producto.precio * (1 - Number(descuento) / 100)).toFixed(2),
      descripcion: descripcion || `${descuento}% de descuento en ${producto.nombre}`
    });
  }
}


function listarPromociones() {
  return promociones;
}



function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function renderPedidosCocina() {
  let div = document.getElementById("listaPedidosCocina");
  if (!div) return;
  div.innerHTML = "";
  let pedidos = (typeof listarPedidosCliente === "function") ? listarPedidosCliente() : [];
  
  if (pedidos.length === 0) {
    div.innerHTML = "<p>No hay pedidos pendientes en la cocina.</p>";
    return;
  }
  
  pedidos.forEach(p => {
    let itemsStr = p.items.map(item => item.nombre).join(", ");
    let botonPreparar = "";
    if (p.estado === 'Pedido recibido') {
      botonPreparar = `<button onclick="uiIniciarPreparacion(${p.id})" style="margin-left: 10px; padding: 2px 6px; cursor: pointer; background-color: #2196F3; color: white; border: none; border-radius: 3px;">Preparar Pedido</button>`;
    }
    
    let colorEstado = '#333';
    if (typeof getColorEstado === 'function') {
      colorEstado = getColorEstado(p.estado);
    }
    
    div.innerHTML += `
      <div style="margin-bottom: 8px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background-color: #fafafa;">
        <strong>Pedido #${p.id}:</strong> ${itemsStr} | 
        Estado: <strong style="color: ${colorEstado};">${p.estado}</strong>
        ${botonPreparar}
      </div>
    `;
  });
}

async function uiIniciarPreparacion(pedidoId) {
  let pedidos = (typeof listarPedidosCliente === "function") ? listarPedidosCliente() : [];
  let p = pedidos.find(item => item.id === pedidoId);
  if (!p) return;
  
  // 1. Cambiar a Preparando
  p.estado = 'Preparando';
  actualizarTodasLasVistas();
  
  // 2. Esperar 5s y pasar a Empacando si no se ha cancelado
  await esperar(5000);
  if (p.estado === 'Cancelado') return;
  p.estado = 'Empacando';
  actualizarTodasLasVistas();
  
  // 3. Esperar 5s y pasar a Pedido entregado si no se ha cancelado
  await esperar(5000);
  if (p.estado === 'Cancelado') return;
  p.estado = 'Pedido entregado';
  actualizarTodasLasVistas();
}

function actualizarTodasLasVistas() {
  renderPedidosCocina();
  if (typeof renderClientePedidos === "function") {
    renderClientePedidos();
  }
  if (typeof renderCaja === "function") {
    renderCaja();
  }
}
