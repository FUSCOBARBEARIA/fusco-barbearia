import {
db,
collection,
getDocs
} from "./firebase.js";

const tabela = document.getElementById("listaAgendamentos");
const filtroData = document.getElementById("filtroData");

let dataSelecionada = "";

async function carregarAgendamentos() {

    const snapshot = await getDocs(
        collection(db, "agendamentos")
    );

    const agendamentos = [];

    snapshot.forEach((doc) => {
        agendamentos.push(doc.data());
    });

    agendamentos.sort((a, b) => {

        if (a.data === b.data) {
            return a.hora.localeCompare(b.hora);
        }

        return a.data.localeCompare(b.data);

    });

    const agrupados = {};

    agendamentos.forEach((item) => {

        if (!agrupados[item.data]) {
            agrupados[item.data] = [];
        }

        agrupados[item.data].push(item);

    });

    tabela.innerHTML = "";

    Object.keys(agrupados).forEach((data) => {

        if (dataSelecionada && data !== dataSelecionada) {
            return;
        }

        tabela.innerHTML += `
        <tr>
            <th colspan="5">📅 ${data}</th>
        </tr>
        `;

        agrupados[data].forEach((agendamento) => {

            tabela.innerHTML += `
            <tr>
                <td>${agendamento.hora}</td>
                <td>${agendamento.nome}</td>
                <td>${agendamento.telefone}</td>
                <td>${agendamento.servico || "-"}</td>
                <td>
    <button class="btnExcluir">🗑️</button>
</td>
            </tr>
            `;

        });

    });

}

filtroData.addEventListener("change", () => {

    dataSelecionada = filtroData.value;

    carregarAgendamentos();

});

carregarAgendamentos();
