import {
db,
collection,
getDocs,
deleteDoc,
doc
} from "./firebase.js";

const tabela = document.getElementById("listaAgendamentos");
const filtroData = document.getElementById("filtroData");

let dataSelecionada = "";

async function carregarAgendamentos() {

    const snapshot = await getDocs(
        collection(db, "agendamentos")
    );

    const agendamentos = [];

    snapshot.forEach((docItem) => {
        agendamentos.push({
            id: docItem.id,
            ...docItem.data()
        });
    });

    agendamentos.sort((a, b) => {

        if (a.data === b.data) {
            return a.hora.localeCompare(b.hora);
        }

        return a.data.localeCompare(b.data);

    });

 const agrupados = {};

let totalExibido = 0;
let faturamentoExibido = 0;

console.log("HOJE:", new Date().toISOString().split("T")[0]);

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

            totalExibido++;

const valor = parseFloat(
    (agendamento.servico || "")
    .replace(/[^\d,]/g, "")
    .replace(",", ".")
);

if(!isNaN(valor)){
    faturamentoExibido += valor;
}

            tabela.innerHTML += `
            <tr>
                <td>${agendamento.hora}</td>
                <td>${agendamento.nome}</td>
                <td>${agendamento.telefone}</td>
                <td>${agendamento.servico || "-"}</td>
                <td>
                    <button class="btnExcluir" data-id="${agendamento.id}">
                        🗑️
                    </button>
                </td>
            </tr>
            `;

        });

    });

    document.getElementById("totalHoje").textContent =
    totalExibido;

document.getElementById("faturamentoHoje").textContent =
    `R$ ${faturamentoExibido.toFixed(2).replace(".", ",")}`;

}

filtroData.addEventListener("change", () => {

    dataSelecionada = filtroData.value;

    carregarAgendamentos();

});

document.addEventListener("click", async (e) => {

    const botao = e.target.closest(".btnExcluir");

    if(!botao){
        return;
    }

    const confirmar = confirm("Deseja excluir este agendamento?");

    if(!confirmar){
        return;
    }

    const id = botao.dataset.id;

    await deleteDoc(
        doc(db, "agendamentos", id)
    );

    carregarAgendamentos();

});

carregarAgendamentos();
