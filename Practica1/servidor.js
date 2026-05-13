console.log("Hola Mundo JS desde el servidor")

/*Operaciones*/
let edad1= 11
const edad2= 42

console.log("Edad Promedio")
console.log((edad1+edad2)/2)

/*Medir tiempo de un proceso*/
console.time("miproceso")

    for(let i=0; i<1000000; i++){}

console.timeEnd("miproceso")

/*Objetos tipo tabla*/
let usuarios= [
    {nombre: "Mauricio", edad: 21},
    {nombre: "Rodriguez", edad: 22},
]
console.table(usuarios)