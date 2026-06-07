import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjfBL-mpW2g_123rsyU3zBrwrB0YnMKJU",
  authDomain: "fusco-barbearia.firebaseapp.com",
  projectId: "fusco-barbearia",
  storageBucket: "fusco-barbearia.firebasestorage.app",
  messagingSenderId: "406222693001",
  appId: "1:406222693001:web:41748cb88932a0e8271c58"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;