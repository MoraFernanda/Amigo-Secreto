document.addEventListener("DOMContentLoaded", function() {
    let participantes = [];

    const agregarBtn = document.getElementById("agregar");
    const nombreInput = document.getElementById("nombre");
    const lista = document.getElementById("lista");
    const sortearBtn = document.getElementById("sortear");
    const borrarBtn = document.getElementById("borrar")
    const resultadoDiv = document.getElementById("resultado");

    if (!agregarBtn || !nombreInput || !lista || !sortearBtn || !resultadoDiv) {
        console.error("Error: No se encontraron todos los elementos en el DOM.");
        return;
    }

    // Agregar participantes a la lista
    agregarBtn.addEventListener("click", function() {
        const nombre = nombreInput.value.trim();
        
        if (nombre === "") {
            alert("Por favor, ingresa un nombre válido.");
            return;
        }
        
        if (participantes.includes(nombre)) {
            alert("El nombre ya ha sido ingresado. Por favor, usa un distintivo para diferenciarlo.");
            return;
        }
        
        participantes.push(nombre);
        actualizarLista();
        nombreInput.value = "";
    });


    // Actualizar la lista en pantalla
    function actualizarLista() {
        lista.innerHTML = "";
        participantes.forEach(function(nombre) {
            const li = document.createElement("li");
            li.textContent = nombre;
            lista.appendChild(li);
        });
    }

    // Sorteo del Amigo Secreto
    sortearBtn.addEventListener("click", function() {
        if (participantes.length < 2) {
            alert("Debes ingresar al menos 2 participantes.");
            return;
        }
        
        let copia = participantes.slice();
        let resultado = {};
        
        for (let i = 0; i < participantes.length; i++) {
            let persona = participantes[i];
            let opciones = copia.filter(function(p) { return p !== persona; });
            
            if (opciones.length === 0) {
                console.error("No hay opciones disponibles para el sorteo");
                alert("Error en el sorteo, intenta de nuevo.");
                return;
            }
            
            let elegido = opciones[Math.floor(Math.random() * opciones.length)];
            resultado[persona] = elegido;
            
            copia = copia.filter(function(p) { return p !== elegido; });
        }
        
        console.log("Resultado generado:", resultado);
        mostrarResultado(resultado);
    });


    // Borrar resultados y participantes
    borrarBtn.addEventListener("click", function() {
        participantes = [];
        lista.innerHTML = "";
        resultadoDiv.innerHTML = "";
        nombreInput.value = "";
    });

    // Mostrar los resultados en pantalla
    function mostrarResultado(resultado) {
        resultadoDiv.innerHTML = "<h2>Resultados:</h2>";
        for (var persona in resultado) {
            if (resultado.hasOwnProperty(persona)) {
                resultadoDiv.innerHTML += "<p><strong>" + persona + "</strong> le regala a <strong>" + resultado[persona] + "</strong></p>";
            }
        }
    }
});
