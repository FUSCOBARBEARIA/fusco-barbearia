document.getElementById("agendamentoForm").addEventListener("submit", function(e){

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

    window.open(url, "_blank");

});