let tarefas = [];
const campoTarefa = document.querySelector("#tarefa");
const botao = document.querySelector("#adicionar");
const corpoTabela = document.querySelector("#tbodyTarefas");
const formTarefas = document.querySelector("#formTarefas");
const campoDescricao = document.querySelector("#descricao");
const campoData = document.querySelector("#data");
const erro = document.querySelector("#erro");
const aviso = document.querySelector("#aviso");
let proximoNumero = 1;

function renderizarLista() {
    corpoTabela.innerHTML = "";

    if (tarefas.length === 0) {
        aviso.hidden = false;
        return;
    }

    aviso.hidden = true;

    tarefas.forEach(item => {
        const linha = document.createElement("tr");

        const celulaId = document.createElement("td");
        celulaId.textContent = item.id;

        const celulaTarefa = document.createElement("td");
        celulaTarefa.textContent = item.tarefa;

        const celulaDescricao = document.createElement("td");
        celulaDescricao.textContent = item.descricao;

        const celulaData = document.createElement("td");
        celulaData.textContent = item.data;

        const celulaAcao = document.createElement("td");
        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", () => {
            tarefas = tarefas.filter(tarefa => tarefa.id !== item.id);
            renderizarLista();
        });

        celulaAcao.append(botaoExcluir);

        linha.append(celulaId);
        linha.append(celulaTarefa);
        linha.append(celulaDescricao);
        linha.append(celulaData);
        linha.append(celulaAcao);

        corpoTabela.append(linha);
    });
}

formTarefas.addEventListener("submit", (event) => {
    event.preventDefault();

    const tarefa = campoTarefa.value.trim();
    const descricao = campoDescricao.value.trim();
    const data = campoData.value.trim();

    if(tarefa === "" || descricao === "" || data === "") {
        erro.textContent = "Preencha os campos!";
        erro.hidden = false;
        return;
    }

    tarefas.push({
        id: proximoNumero,
        tarefa: tarefa,
        descricao: descricao,
        data: data
    })
    proximoNumero++;
    erro.hidden = true;
    formTarefas.reset();
    campoTarefa.focus();
    renderizarLista();
})

renderizarLista();

