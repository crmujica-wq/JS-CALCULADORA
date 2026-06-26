/**
 * PROYECTO MÓDULO 3: CALCULADORA INTERACTIVA MULTIFUNCIÓN
 * Fundamentos de Programación en JavaScript

 */

// ESTRUCTURAS DE DATOS 
const configuracionCalculadora = {
    nombre: "Calculadora JS-Pro .",
    version: "2.1",
    autor: "Cristian Rojas .",
    permiteNegativos: true
};

//historial de operaciones 
let historialOperaciones = [];

// FUNCIONES 
function sumar(a, b) { return a + b; }
function restar(a, b) { return a - b; }
function multiplicar(a, b) { return a * b; }

function dividir(a, b) {
    //  división por cero 
    if (b === 0) {
        return "Error: No se puede dividir por cero.";
    }
    return a / b;
}

// Solicita y valida la entrada numérica del usuario 
function pedirNumero(mensaje) {
    let numero;
    let esValido = false;

    while (!esValido) {
        const entrada = prompt(mensaje);
        if (entrada === null) return null; // El usuario canceló la operación

        numero = parseFloat(entrada);

        if (!isNaN(numero)) {
            esValido = true;
        } else {
            alert("Por favor, ingresa un número válido.");
        }
    }
    return numero;
}

// Procesa la operación seleccionada (anidadas)
function procesarOperacion(tipoOperacion) {
    const num1 = pedirNumero("Ingresa el primer número:");
    if (num1 === null) return;

    const num2 = pedirNumero("Ingresa el segundo número:");
    if (num2 === null) return;

    let resultado;
    let signo = "";

    // Control de flujo para determinar la operación 
    switch (tipoOperacion) {
        case 1:
            resultado = sumar(num1, num2);
            signo = "+";
            break;
        case 2:
            resultado = restar(num1, num2);
            signo = "-";
            break;
        case 3:
            resultado = multiplicar(num1, num2);
            signo = "*";
            break;
        case 4:
            resultado = dividir(num1, num2);
            signo = "/";
            break;
        default:
            return;
    }

    // Estructuración de datos en un Objeto 
    const registroCalculo = {
        operacion: `Operación (Opción ${tipoOperacion})`,
        expresion: `${num1} ${signo} ${num2}`,
        resultado: resultado
    };

    if (tipoOperacion === 4 && num2 === 0) {
        registroCalculo.operacion = "División Errónea";
    }

    // Inserción en el arreglo global
    historialOperaciones.push(registroCalculo);

    // Corroboración simultánea: Consola + Ventana Alerta 
    console.log(`[CÁLCULO REGISTRADO]: ${registroCalculo.expresion} = ${resultado}`);
    alert(`Resultado: ${resultado}`);
}

// Métodos iterativos avanzados de arreglos 
function mostrarHistorial() {
    console.log(`\n--- HISTORIAL DE OPERACIONES (${configuracionCalculadora.nombre}) ---`);

    if (historialOperaciones.length === 0) {
        console.log("No se han realizado operaciones en esta sesión.");
        alert("El historial está vacío.");
        return;
    }

    // Uso de .forEach() para iterar los objetos del historial
    historialOperaciones.forEach((item, indice) => {
        console.log(`${indice + 1}. [${item.operacion}] ${item.expresion} => Resultado: ${item.resultado}`);
    });

    // Uso de .map() para transformar e imprimir la lista condensada
    const soloResultados = historialOperaciones.map(item => item.resultado);
    console.log("Lista de resultados puros: " + soloResultados.join(" | "));

    alert(`Historial visualizado en la consola (F12). Se han registrado ${historialOperaciones.length} operaciones.`);
}

//CONTROL DEL MENÚ PRINCIPAL 
function iniciarCalculadora() {
    console.log(`Iniciando ${configuracionCalculadora.nombre} v${configuracionCalculadora.version}...`);
    alert(`Bienvenido a la ${configuracionCalculadora.nombre}\nDesarrollada por: ${configuracionCalculadora.autor}`);

    let ejecutar = true;

    while (ejecutar) {
        const seleccion = prompt(
            "Selecciona una operación matemática:\n" +
            "1. Suma (+)\n" +
            "2. Resta (-)\n" +
            "3. Multiplicación (*)\n" +
            "4. División (/)\n" +
            "5. Ver Historial de Operaciones\n" +
            "6. Salir"
        );

        if (seleccion === null) {
            ejecutar = false;
            break;
        }

        switch (seleccion.trim()) {
            case "1":
            case "2":
            case "3":
            case "4":
                procesarOperacion(parseInt(seleccion));
                break;
            case "5":
                mostrarHistorial();
                break;
            case "6":
                ejecutar = false;
                break;
            default:
                alert("Opción no válida. Por favor, selecciona un número del 1 al 6.");
                break;
        }
    }

    console.log("Calculadora finalizada de forma segura.");
    alert("¡Gracias por usar la calculadora! Hasta la próxima.");
}