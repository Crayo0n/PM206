let productos = [
  { id: 1, nombre: "Cafe Americano", precio: 35 },
  { id: 2, nombre: "Capuccino", precio: 45 },
  { id: 3, nombre: "Muffin", precio: 30 }
];

function agregarProducto(id, nombre, precio) {
  productos.push({ id: Number(id), nombre, precio: Number(precio) });
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

