
// Definir la clase Activity
class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

// Definir la clase Repository
class Repository {
    constructor() {
        this.activities = [];
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(id, title, description, imgUrl) {
        const newActivity = new Activity(id, title, description, imgUrl);
        this.activities.push(newActivity);
        return newActivity;
    }

    // Extra Credit: Método para eliminar una actividad por ID
    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
    }
}

// Crear una instancia de Repository
const myRepository = new Repository();

// Función para crear la tarjeta de actividad y agregar un botón de eliminar
function createActivityCard(activityInstance) {
    // Destructuring para extraer propiedades de la instancia de Activity
    const { id, title, description, imgUrl } = activityInstance;

    // Crear elementos HTML
    const titleElement = document.createElement("h3");
    const descriptionElement = document.createElement("p");
    const imgElement = document.createElement("img");
    const cardElement = document.createElement("div");
    const deleteButton = document.createElement('button');


    // Asignar valores a las propiedades de los elementos
    titleElement.innerHTML = title;
    descriptionElement.innerHTML = description;
    imgElement.src = imgUrl;

    // Asignar clases CSS
    titleElement.classList.add("activity-title");
    descriptionElement.classList.add("activity-description");
    imgElement.classList.add("activity-image");
    cardElement.classList.add("activity-card");

    // Configurar el botón de eliminar
    deleteButton.innerText = 'Eliminar';
    deleteButton.classList.add('delete-button');
    deleteButton.dataset.id = id;

    // "Appendear" los elementos al div de la tarjeta
    cardElement.appendChild(titleElement);
    cardElement.appendChild(descriptionElement);
    cardElement.appendChild(imgElement);
    cardElement.appendChild(deleteButton);

    // Asignar clase CSS al div de la tarjeta
    cardElement.classList.add("activity-card");

    return cardElement;
}

// Función para renderizar todas las actividades en un contenedor
function renderAllActivities(repositoryInstance, containerId) {
    // Seleccionar el contenedor donde queremos agregar las actividades
    const container = document.getElementById(containerId);

    // Vaciar el contenido actual del contenedor
    container.innerHTML = '';

    // Obtener el listado completo de actividades desde el Repository
    const activities = repositoryInstance.getAllActivities();

    // Mapear el listado de actividades para convertirlos en elementos HTML
    const activityElements = activities.map(activity => createActivityCard(activity));

    // "Appendear" todos los elementos HTML dentro del contenedor seleccionado
    activityElements.forEach(activityElement => container.appendChild(activityElement));
}

// Cargar actividades al inicio
loadActivities();

// Agregar un evento al formulario
document.getElementById('activity-form').addEventListener('submit', function (event) {
    // Prevenir el comportamiento por defecto del formulario
    event.preventDefault();

    // Seleccionar los inputs de title, description e imgUrl
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');
    const imgUrlInput = document.getElementById('imgUrl-input');

    // Tomar los valores ingresados en los inputs y guardarlos en variables
    const title = titleInput.value;
    const description = descriptionInput.value;
    const imgUrl = imgUrlInput.value;

    // Validar que estos valores estén completos
    if (!title || !description || !imgUrl) {
        // Mostrar un mensaje de error al usuario
        alert('Por favor, completa todos los campos.');
        return; // Cortar el proceso si hay datos incompletos
    }

    // Llamar al método correspondiente de la instancia de Repository para crear una nueva actividad
    const newActivity = myRepository.createActivity(Date.now(), title, description, imgUrl);

    // Recargar el contenedor de actividades
    loadActivities();

    // Limpiar los campos del formulario
    titleInput.value = '';
    descriptionInput.value = '';
    imgUrlInput.value = '';
});

// Event Listener para el botón que agrega actividades
document.getElementById('submit-button').addEventListener('click', function (event) {
    // Ejecutar la función handler al hacer clic en el botón
    handler(event);
});

// Agregar un evento al contenedor de actividades para gestionar clics en las tarjetas
document.getElementById('actividades-container').addEventListener('click', function (event) {
    // Verificar si el clic fue en un botón para eliminar
    if (event.target.classList.contains('delete-button')) {
        // Obtener el ID de la actividad desde el atributo data-id
        const activityId = event.target.dataset.id;

        // Llamar al método deleteActivity de la instancia de Repository
        myRepository.deleteActivity(parseInt(activityId));

        // Invocar la función para "refrescar" el contenedor de actividades
        renderAllActivities(myRepository, "actividades-container");
    }
});

// Función para cargar actividades al inicio
function loadActivities() {
    renderAllActivities(myRepository, "actividades-container");
}
