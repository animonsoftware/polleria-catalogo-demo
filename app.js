// ====== DATOS DEL NEGOCIO (cámbialos para otro cliente) ======
const NUMERO = "59171731376";      // 591 + tu número de 8 dígitos
const NEGOCIO = "Pollería El Buen Sabor";
const productos = [
  { id: 1, nombre: "Pollo entero", precio: 90 },
  { id: 2, nombre: "Medio pollo", precio: 50 },
  { id: 3, nombre: "pollo económico", precio: 20 },
  { id: 4, nombre: "Charque frito", precio: 25 },
  { id: 5, nombre: "Majadito de charque", precio: 20 }
];
// Aquí se guarda cuántas unidades eligió el cliente de cada producto
const cantidades = {};
const menu = document.getElementById("menu");
const lista = document.getElementById("lista");
const totalSpan = document.getElementById("total");
function cantidadDe(id) {
  return cantidades[id] || 0;
}
function calcularTotal() {
  let total = 0;
  productos.forEach(function (p) {
    total = total + cantidadDe(p.id) * p.precio;
  });
  return total;
}
function pintarMenu() {
  menu.innerHTML = "";
  productos.forEach(function (p) {
    const div = document.createElement("div");
    div.className = "plato";
    div.innerHTML =
      "<h3>" + p.nombre + "</h3>" +
      '<p class="precio">Bs ' + p.precio + "</p>" +
      '<div class="controles">' +
      '<button onclick="cambiar(' + p.id + ', -1)">-</button>' +
 "<span>" + cantidadDe(p.id) + "</span>" +
      '<button onclick="cambiar(' + p.id + ', 1)">+</button>' +
      "</div>";
    menu.appendChild(div);
  });
}
function pintarResumen() {
  lista.innerHTML = "";
  productos.forEach(function (p) {
    const c = cantidadDe(p.id);
    if (c > 0) {
      const li = document.createElement("li");
      li.textContent = c + " x " + p.nombre + " = Bs " + (c * p.precio);
      lista.appendChild(li);
    }
  });
  totalSpan.textContent = calcularTotal();
}
function cambiar(id, cambio) {
  cantidades[id] = Math.max(0, cantidadDe(id) + cambio);
  pintarMenu();
  pintarResumen();
}
function enviarPedido() {
  const total = calcularTotal();
  if (total === 0) {
    alert("Primero elige al menos un producto.");
    return;
  }
  let mensaje = "Hola, quiero hacer un pedido en " + NEGOCIO + ":\n";
  productos.forEach(function (p) {
    const c = cantidadDe(p.id);
    if (c > 0) {
      mensaje = mensaje + "- " + c + " x " + p.nombre + "\n";
    }
  });
  mensaje = mensaje + "Total: Bs " + total + "\n";
  const nombre = document.getElementById("nombre").value.trim();
  const nota = document.getElementById("nota").value.trim();
  if (nombre) { mensaje = mensaje + "Nombre: " + nombre + "\n"; }
  if (nota) { mensaje = mensaje + "Dirección o nota: " + nota + "\n"; }
  const url = "https://wa.me/" + NUMERO + "?text=" + encodeURIComponent(mensaje);
  window.open(url, "_blank");
}
document.getElementById("enviar").addEventListener("click", enviarPedido);
pintarMenu();
pintarResumen();