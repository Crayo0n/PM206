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

function renderCocina(listaFiltro) {
  let div = document.getElementById("listaProductosCocina");
  if (!div) return;
  div.innerHTML = "";
  let lista = listaFiltro || listarProductos();
  
  if (lista.length === 0) {
    div.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }
  
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

function uiFiltrarProductosCocina(funcionFiltro) {
  let lista = funcionFiltro();
  renderCocina(lista);
}

function uiBuscarPorNombreCocina() {
  let nombre = document.getElementById("busquedaCocina").value.trim();
  if (nombre === "") {
    renderCocina();
    return;
  }
  let producto = buscarProductoPorNombre(nombre);
  let lista = producto ? [producto] : [];
  renderCocina(lista);
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

function renderPromocionesCocina() {
  let div = document.getElementById("listaPromocionesCocina");
  if (!div) return;
  div.innerHTML = "";
  let lista = listarPromociones();
  lista.forEach(promo => {
    div.innerHTML += `<div class="producto-item">[Prod ID: ${promo.idProducto}] ${promo.descripcion} - $${promo.precioConDescuento}</div>`;
  });
}

function uiCrearPromocionCocina() {
  let idProducto = document.getElementById("promoProdId").value;
  let descuento = document.getElementById("promoDescuento").value;
  let descripcion = document.getElementById("promoDesc").value;
  
  if (idProducto && descuento) {
    agregarPromocion(idProducto, descuento, descripcion);
    
    document.getElementById("promoProdId").value = "";
    document.getElementById("promoDescuento").value = "";
    document.getElementById("promoDesc").value = "";
    
    renderPromocionesCocina();
    // Actualizar también la vista del cliente si existe
    if (typeof uiConsultarPromociones === "function") {
      uiConsultarPromociones();
    }
  } else {
    alert("Por favor, ingresa el ID del producto y el porcentaje de descuento.");
  }
}

