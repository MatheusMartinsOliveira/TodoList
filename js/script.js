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

function formatarData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

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
        if (item.concluida) {
            celulaTarefa.classList.add("concluida");
        }

        const celulaDescricao = document.createElement("td");
        celulaDescricao.textContent = item.descricao;
        if (item.concluida) {
            celulaDescricao.classList.add("concluida");
        }

        const celulaData = document.createElement("td");
        celulaData.textContent = formatarData(item.data);
        if (item.concluida) {
            celulaData.classList.add("concluida");
        }

        const celulaAcao = document.createElement("td");
        const containerAcoes = document.createElement("div");
        containerAcoes.className = "acao-container";

        const botaoExcluir = document.createElement("button");
        const botaoConfirmar = document.createElement("button");

        botaoExcluir.type = "button";
        botaoExcluir.className = "acao-btn excluir";
        botaoExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
        botaoExcluir.setAttribute("aria-label", "Excluir tarefa");
        botaoExcluir.addEventListener("click", () => {
            tarefas = tarefas.filter(tarefa => tarefa.id !== item.id);
            renderizarLista();
        });

        botaoConfirmar.type = "button";
        botaoConfirmar.className = "acao-btn confirmar";
        botaoConfirmar.innerHTML = '<i class="fa-solid fa-check"></i>';
        botaoConfirmar.setAttribute("aria-label", "Concluir tarefa");
        botaoConfirmar.style.display = item.concluida ? "none" : "inline-flex";
        botaoConfirmar.addEventListener("click", () => {
            item.concluida = !item.concluida;
            renderizarLista();
        });

        containerAcoes.append(botaoConfirmar, botaoExcluir);
        celulaAcao.append(containerAcoes);

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

    if(tarefa === "" || data === "") {
        erro.textContent = "Preencha os campos!";
        erro.hidden = false;
        return;
    }

    tarefas.push({
        id: proximoNumero,
        tarefa: tarefa,
        descricao: descricao,
        data: data,
        concluida: false
    })
    proximoNumero++;
    erro.hidden = true;
    formTarefas.reset();
    campoTarefa.focus();
    renderizarLista();
})

renderizarLista();

