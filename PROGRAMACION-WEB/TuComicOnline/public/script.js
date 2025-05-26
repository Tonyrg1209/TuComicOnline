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

/* ------------------- Firebase Modular ------------------- 
*/// Elimina la configuración duplicada y usa solo Firebase Modular v9+
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-Vi0YAa9YCDefs15XMZtBnel6Z_iKvk8",
  authDomain: "tucomiconline-8015d.firebaseapp.com",
  projectId: "tucomiconline-8015d",
  storageBucket: "tucomiconline-8015d.appspot.com",
  messagingSenderId: "333995248665",
  appId: "1:333995248665:web:11da2b947fe80dab0dee88",
  measurementId: "G-43WCCJ9HLL"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Función para cargar la portada de Blue Lock (01.jpg)
function loadComicCover() {
  const coverRef = ref(storage, "BLUE LOCK/01.jpg");
  getDownloadURL(coverRef)
    .then((url) => {
      const coverImg = document.getElementById("blueLockCover");
      if (coverImg) coverImg.src = url;
    })
    .catch((error) => {
      console.error("Error al cargar portada:", error);
    });
}

// Cargar portada al iniciar
loadComicCover();