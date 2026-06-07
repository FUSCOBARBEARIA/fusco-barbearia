import { db, collection, addDoc } from "./firebase.js";

document.getElementById("agendamentoForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    try {

        await addDoc(collection(db, "agendamentos"), {
            nome,
            telefone,
            servico,
            data,
            hora,
            criadoEm: new Date()
        });

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

        window.open(url, "_blank");

        alert("Agendamento registrado com sucesso!");

    } catch(error) {

        console.error(error);
        alert("Erro ao salvar agendamento.");

    }

});