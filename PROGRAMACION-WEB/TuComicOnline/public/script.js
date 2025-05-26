document.getElementById('comic-upload-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Recoger datos
    const formData = {
        titulo: document.getElementById('comic-title').value,
        descripcion: document.getElementById('comic-description').value,
        paginas: document.getElementById('comic-pages').value,
        categorias: Array.from(document.querySelectorAll('input[name="category"]:checked')).map(el => el.value)
    };
    
    // Enviar a Google Apps Script
    fetch('TU_URL_DE_APPS_SCRIPT', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert('¡Cómic enviado con éxito!');
        this.reset();
    })
    .catch(error => {
        alert('Error al enviar: ' + error.message);
    });
});

// Importa las funciones necesarias del SDK modular
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Importa otros servicios que necesites, por ejemplo:
// import { getStorage } from "firebase/storage";

// Configuración de Firebase: reemplaza estos valores con los datos de tu proyecto desde la consola de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA-Vi0YAa9YCDefs15XMZtBnel6Z_iKvk8",
  authDomain: "tucomiconline-8015d.firebaseapp.com",
  projectId: "tucomiconline-8015d",
  storageBucket: "tucomiconline-8015d.firebasestorage.app",
  messagingSenderId: "333995248665",
  appId: "1:333995248665:web:11da2b947fe80dab0dee88",
  measurementId: "G-43WCCJ9HLL"
};

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Analytics (opcional, si lo requieres)
const analytics = getAnalytics(app);

// Si necesitas Storage, podrías inicializarlo de la siguiente forma:
// import { getStorage } from "firebase/storage";
// const storage = getStorage(app);

console.log("Firebase inicializado correctamente");  

const storageRef = firebase.storage().ref();
storageRef.child("BLUE LOCK/CAPITULO 1/13-14.jpg").getDownloadURL().then((url) => {
    console.log("URL de la imagen:", url);
});
const chapterRef = firebase.storage().ref().child("BLUE LOCK/CAPITULO 1/");
chapterRef.listAll().then((result) => {
    result.items.forEach((imageRef) => {
        imageRef.getDownloadURL().then((url) => {
            console.log("Imagen:", url);
            // Aquí puedes agregar la URL a tu página web
        });
    });
});

<img class="double-page" src="URL_DE_13-14.jpg" alt="Doble página">
