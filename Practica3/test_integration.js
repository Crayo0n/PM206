// Mocking the DOM environment slightly to test pure logic
const fs = require('fs');

// Simple DOM Mock
global.document = {
  addEventListener: () => {},
  getElementById: () => ({ innerHTML: '', value: '' }),
  querySelectorAll: () => []
};

// Load scripts
eval(fs.readFileSync('./Practica3/cocina.js', 'utf8'));
eval(fs.readFileSync('./Practica3/caja.js', 'utf8'));
eval(fs.readFileSync('./Practica3/cliente.js', 'utf8'));

// Test logic
console.log("=== Initial State ===");
console.log("Productos:", listarProductos());
console.log("Promociones:", listarPromociones());

console.log("\n=== Adding Promotion ===");
agregarPromocion(1, 20, "20% off on Cafe Americano");
console.log("Promociones:", listarPromociones());

console.log("\n=== Creating Order with Promotion ===");
crearPedidoProductos([], [1]); // Order only the promotion
let pedidos = listarPedidosCliente();
console.log("Pedidos Cliente:", pedidos);

console.log("\n=== Checking Caja ===");
let pedidosCaja = listarPedidos();
console.log("Pedidos Caja:", pedidosCaja);

let testPassed = false;
if (pedidosCaja.length > 0) {
  let pedido = pedidosCaja[0];
  if (pedido.items[0].nombre === "[PROMO] Cafe Americano" && pedido.items[0].precio === 28) {
    testPassed = true;
  }
}

if (testPassed) {
  console.log("\n✅ Integration Test Passed: Promotion is correctly billed at a discount price in Caja.");
} else {
  console.log("\n❌ Integration Test Failed.");
  process.exit(1);
}
