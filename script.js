import {
    db,
    collection,
    addDoc,
    getDocs,
    query,
    where
} from "./firebase.js";

const selectHora = document.getElementById("hora");
const inputData = document.getElementById("data");

const horarios = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00"
];

async function atualizarHorarios() {

    const data = inputData.value;

    if (!data) return;

    selectHora.innerHTML =
        '<option value="">Escolha um horário</option>';

    const q = query(
        collection(db, "agendamentos"),
        where("data", "==", data)
    );

    const snapshot = await getDocs(q);

    const ocupados = [];

    snapshot.forEach((doc) => {
        ocupados.push(doc.data().hora);
    });

    horarios.forEach((hora) => {

        if (!ocupados.includes(hora)) {

            const option = document.createElement("option");
            option.value = hora;
            option.textContent = hora;

            selectHora.appendChild(option);

        }

    });

}

inputData.addEventListener("change", atualizarHorarios);

document.getElementById("agendamentoForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    const mensagem =
`Olá! Gostaria de agendar um horário.

Nome: ${nome}
Telefone: ${telefone}
Serviço: ${servico}
Data: ${data}
Horário: ${hora}`;

    const numero = "5514996909094";

    const url =
`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    // Abre o WhatsApp primeiro (funciona melhor no iPhone)
    window.location.href = url;

    try {

        await addDoc(collection(db, "agendamentos"), {
            nome,
            telefone,
            servico,
            data,
            hora,
            criadoEm: new Date()
        });

    } catch(error) {

        console.error(error);

    }

});
