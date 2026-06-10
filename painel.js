import {
    db,
    collection,
    getDocs
} from "./firebase.js";

const tabela =
document.getElementById("listaAgendamentos");

async function carregarAgendamentos(){

    const snapshot =
    await getDocs(
        collection(db, "agendamentos")
    );

    snapshot.forEach((doc) => {

        const dados = doc.data();

        tabela.innerHTML += `
        <tr>
            <td>${dados.nome}</td>
            <td>${dados.telefone}</td>
            <td>${dados.servico}</td>
            <td>${dados.data}</td>
            <td>${dados.hora}</td>
        </tr>
        `;

    });

}

carregarAgendamentos();
