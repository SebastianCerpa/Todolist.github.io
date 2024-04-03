document.addEventListener("DOMContentLoaded", function() {
    // Referencias a elementos del DOM
    const inputTarea = document.getElementById("agregarTarea");
    const botonAgregar = document.getElementById("boton");
    const totalParrafo = document.querySelector(".info1 p:first-child span");
    const realizadasParrafo = document.querySelector(".info1 p:nth-child(2) span");
    const contenedorTareas = document.querySelector(".body");

    // Arreglo de tareas inicial
    let tareas = [
        { id: 1, descripcion: "Hacer la compra", completado: false },
        { id: 2, descripcion: "Estudiar para el examen", completado: false },
        { id: 3, descripcion: "Terminar proyecto de programación", completado: false }
    ];

    // Función para renderizar las tareas en la página
    function renderizarTareas() {
        contenedorTareas.innerHTML = "";
        tareas.forEach(tarea => {
            const tareaElemento = crearTareaElemento(tarea);
            contenedorTareas.appendChild(tareaElemento);
        });
        actualizarTotales();
        actualizarConteoRealizadas();
        actualizarConteoTotal();
    }

    // Función para crear un elemento de tarea
    function crearTareaElemento(tarea) {
        const tareaElemento = document.createElement("div");
        tareaElemento.classList.add("card");
        tareaElemento.dataset.id = tarea.id;
        tareaElemento.innerHTML = `
            <div class="listadosDeTareas"> 
            <p>${tarea.id}</p>
            <p>${tarea.descripcion}</p>
            </div>
            <input type="checkbox" ${tarea.completado ? 'checked' : ''}>
            <button class="eliminar">Eliminar</button>
        `;
        if (tarea.completado) {
            tareaElemento.classList.add("realizada");
        }
        return tareaElemento;
    }

    // Función para agregar una nueva tarea
    function agregarTarea() {
        const tareaTexto = inputTarea.value.trim();
        if (tareaTexto !== "") {
            const nuevaTarea = {
                id: tareas.length + 1,
                descripcion: tareaTexto,
                completado: false
            };
            tareas.push(nuevaTarea);
            inputTarea.value = "";
            actualizarTotales(); // Actualiza el contador de "tareas"
            renderizarTareas();
        } else {
            alert("Por favor ingrese una tarea válida.");
        }
    }

    // Función para eliminar una tarea
    function eliminarTarea(id) {
        tareas = tareas.filter(tarea => tarea.id !== id);
        renderizarTareas();
    }

    // Función para cambiar el estado de una tarea a completada
    function cambiarEstadoTarea(id, completado) {
        const tarea = tareas.find(tarea => tarea.id === id);
        tarea.completado = completado;
        renderizarTareas();
    }

    // Función para actualizar los totales de tareas
    function actualizarTotales() {
        totalParrafo.textContent = tareas.length;
    }

    // Función para actualizar el conteo de tareas realizadas
    function actualizarConteoRealizadas() {
        const realizadas = tareas.filter(tarea => tarea.completado).length;
        realizadasParrafo.textContent = realizadas;
    }

    // Función para actualizar el conteo total
    function actualizarConteoTotal() {
        totalParrafo.textContent = tareas.length;
    }

    // Evento para agregar una nueva tarea al hacer clic en el botón
    botonAgregar.addEventListener("click", agregarTarea);

    // Evento para eliminar una tarea al hacer clic en el botón "Eliminar"
    contenedorTareas.addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("eliminar")) {
            const tareaElemento = event.target.parentElement;
            const tareaId = parseInt(tareaElemento.dataset.id);
            eliminarTarea(tareaId);
        }
    });

    // Evento para cambiar el estado de una tarea al hacer clic en el checkbox
    contenedorTareas.addEventListener("change", function(event) {
        if (event.target && event.target.type === "checkbox") {
            const tareaElemento = event.target.parentElement;
            const tareaId = parseInt(tareaElemento.dataset.id);
            const completado = event.target.checked;
            cambiarEstadoTarea(tareaId, completado);
            actualizarConteoRealizadas(); // Actualiza el conteo de tareas realizadas
        }
    });

    // Renderizar las tareas iniciales
    renderizarTareas();
});
