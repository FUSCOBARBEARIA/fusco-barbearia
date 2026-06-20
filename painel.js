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

    let totalHoje = 0;
let faturamentoHoje = 0;

  agendamentos.forEach((item) => {

    if (!agrupados[item.data]) {
        agrupados[item.data] = [];
    }

    agrupados[item.data].push(item);

    const hoje = new Date().toISOString().split("T")[0];

    if(item.data === hoje){

        totalHoje++;

        const valor = parseFloat(
            (item.servico || "")
            .replace(/[^\d,]/g, "")
            .replace(",", ".")
        );

        if(!isNaN(valor)){
            faturamentoHoje += valor;
        }

    }

});

document.getElementById("totalHoje").textContent = totalHoje;

document.getElementById("faturamentoHoje").textContent =
    `R$ ${faturamentoHoje.toFixed(2).replace(".", ",")}`;

tabela.innerHTML = "";
    
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
                    <button class="btnExcluir" data-id="${agendamento.id}">
                        🗑️
                    </button>
                </td>
            </tr>
            `;

        });

    });

}

filtroData.addEventListener("change", () => {

    dataSelecionada = filtroData.value;

    document.addEventListener("click", async (e) => {

    if(!e.target.classList.contains("btnExcluir")){
        return;
    }

    const confirmar = confirm("Deseja excluir este agendamento?");

    if(!confirmar){
        return;
    }

    const id = e.target.dataset.id;

    await deleteDoc(
        doc(db, "agendamentos", id)
    );

    carregarAgendamentos();

});

    carregarAgendamentos();

});

carregarAgendamentos();
