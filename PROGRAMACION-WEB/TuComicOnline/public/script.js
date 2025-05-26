// Manejo del envío del formulario de carga
document
  .getElementById("comic-upload-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Recoger datos del formulario
    const formData = {
      titulo: document.getElementById("comic-title").value,
      descripcion: document.getElementById("comic-description").value,
      paginas: document.getElementById("comic-pages").value,
      categorias: Array.from(
        document.querySelectorAll('input[name="category"]:checked')
      ).map((el) => el.value),
    };

    // Enviar a Google Apps Script (reemplaza TU_URL_DE_APPS_SCRIPT por el URL real)
    fetch("TU_URL_DE_APPS_SCRIPT", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert("¡Cómic enviado con éxito!");
        this.reset();
      })
      .catch((error) => {
        alert("Error al enviar: " + error.message);
      });
  });

/* ------------------- Firebase Modular ------------------- */
// Importa las funciones necesarias del SDK modular
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

// Configuración de Firebase (reemplaza estos valores con los de tu proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyA-Vi0YAa9YCDefs15XMZtBnel6Z_iKvk8",
  authDomain: "tucomiconline-8015d.firebaseapp.com",
  projectId: "tucomiconline-8015d",
  storageBucket: "tucomiconline-8015d.appspot.com", // Revisa este valor
  messagingSenderId: "333995248665",
  appId: "1:333995248665:web:11da2b947fe80dab0dee88",
  measurementId: "G-43WCCJ9HLL"
};


// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

console.log("Firebase inicializado correctamente");

// Ejemplo: Obtener la URL de una imagen específica (página doble)
// Asegúrate de que el archivo se llame exactamente "13-14.jpg" o incluya el guion
const imageDoubleRef = ref(storage, "BLUE LOCK/CAPITULO 1/13-14.jpg");
getDownloadURL(imageDoubleRef)
  .then((url) => {
    console.log("URL de la imagen doble:", url);
    // Aquí puedes, por ejemplo, asignar el src a una imagen en el DOM:
    // document.getElementById("id-de-tu-imagen").src = url;
  })
  .catch((error) => {
    console.error("Error al obtener URL de imagen doble:", error);
  });

// Listar todas las imágenes del capítulo (por ejemplo, del 01 hasta el 86)
// Se aplicará un filtro para archivos con extensiones .jpg, .jp o .jpeg
const chapterRef = ref(storage, "BLUE LOCK/CAPITULO 1/");
import { getDownloadURL, listAll, ref } from "firebase/storage";

// Definición de la referencia al capítulo en Storage
const chapterRef = ref(storage, "BLUE LOCK/CAPITULO 1/");

listAll(chapterRef)
  .then((result) => {
    // Filtrar sólo los archivos que tengan extensión .jpg, .jp o .jpeg
    let imageRefs = result.items.filter((item) => {
      const name = item.name.toLowerCase();
      return (
        name.endsWith(".jpg") ||
        name.endsWith(".jp") ||
        name.endsWith(".jpeg")
      );
    });

    // Ordenar las imágenes numéricamente basándose en el primer número del nombre.
    // En caso de páginas dobles (ej. "13-14"), se toma el número inicial (13)
    imageRefs.sort((a, b) => {
      // Usamos expresiones regulares para eliminar la extensión y obtener el nombre base
      const nameA = a.name.replace(/\.(jpg|jp|jpeg)$/i, "");
      const nameB = b.name.replace(/\.(jpg|jp|jpeg)$/i, "");
      const numA = parseFloat(nameA.split("-")[0]);
      const numB = parseFloat(nameB.split("-")[0]);
      return numA - numB;
    });

    console.log("Archivos filtrados y ordenados:", imageRefs);

    // Recorrer cada imagen para obtener su URL y agregarla al DOM o procesarla según necesites
    imageRefs.forEach((imageItem) => {
      getDownloadURL(imageItem)
        .then((url) => {
          console.log("Imagen URL:", url);
          // Ejemplo: Insertar la imagen en un contenedor del DOM.
          const img = document.createElement("img");
          img.src = url;
          // Si el nombre contiene un guion ('-'), se considera doble página y se le añade una clase.
          if (imageItem.name.includes("-")) {
            img.classList.add("double-page");
            // Puedes ajustar estilos adicionales vía JS si lo deseas:
            img.style.width = "100%";
          } else {
            img.style.width = "auto";
          }
          // Asegúrate de tener un contenedor con id="contenedor-imagenes" en tu HTML.
          document.getElementById("contenedor-imagenes").appendChild(img);
        })
        .catch((error) => {
          console.error("Error al obtener URL de imagen:", error);
        });
    });
  })
  .catch((error) => {
    console.error("Error al listar imágenes:", error);
  });
