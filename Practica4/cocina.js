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
function eliminarPromocion(idProducto) {
  promociones = promociones.filter(p => p.idProducto !== Number(idProducto));
}

function listarPromociones() {
  return promociones;
}

function buscarProductosEnPromocion() {
  let idsEnPromo = promociones.map(p => p.idProducto);
  return productos.filter(p => idsEnPromo.includes(p.id));
}
function buscarPromocionPorProducto(idProducto) {
  return promociones.find(p => p.idProducto === Number(idProducto));
}

function tienePromocion(idProducto) {
  return promociones.find(p => p.idProducto === Number(idProducto)) !== undefined;
}

function obtenerPrecioFinal(idProducto) {
  let promo = promociones.find(p => p.idProducto === Number(idProducto));
  if (promo) {
    return promo.precioConDescuento;
  }
  let producto = productos.find(p => p.id === Number(idProducto));
  return producto ? producto.precio : null;
}

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function revisarIngredientes() {
  console.log("Revisando ingredientes en la cocina...");
  await esperar(1500);
  
  let faltaIngrediente = Math.random() < 0.3; 
  if (faltaIngrediente) {
    throw new Error("Falta de ingrediente (ej. no hay granos de café).");
  }
  console.log('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Todos los ingredientes completos.');
}

async function molerGranos() {
  console.log("Moliendo granos de café...");
  await esperar(2000);
  console.log('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Granos molidos.');
}

async function calentarAgua() {
  console.log("Calentando agua...");
  await esperar(3000);
  console.log('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Agua caliente.');
}

async function filtrarCafe() {
  console.log("Filtrando el café...");
  await esperar(2500);
  console.log('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Café filtrado.');
}

async function servirTaza() {
  console.log("Sirviendo en la taza...");
  await esperar(1000);
  console.log('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Taza servida.');
}

async function prepararCafe() {
  console.log("--- INICIANDO PREPARACIÓN DE CAFÉ ---");
  try {
    await revisarIngredientes();
    await molerGranos();
    await calentarAgua();
    await filtrarCafe();
    await servirTaza();
    
    console.log('--- ¡EL CAFÉ ESTÁ LISTO PARA DISFRUTAR! <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="brown" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg> ---');
  } catch (error) {
    console.error('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg> Error en la cocina al preparar el café:', error.message);
  }
}
