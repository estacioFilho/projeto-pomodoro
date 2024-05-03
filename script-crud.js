const addNovaTarefa = document.getElementsByClassName('app__button--add-task')[0];
const formulario = document.getElementsByClassName('app__form-add-task')[0];
const textArea = document.getElementsByClassName('app__form-textarea')[0];
const salvarTarefa = document.getElementsByClassName('app__form-footer__button--confirm')[0];
const listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const ulTarefas = document.getElementsByClassName('app__section-task-list')[0];
console.log(listaTarefas)
addNovaTarefa.addEventListener('click', () => {
    formulario.classList.toggle('hidden');
})

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }

    listaTarefas.push(tarefa);
    const elementeTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementeTarefa);
    localStorage.setItem('tarefas', JSON.stringify(listaTarefas));
    textArea.value = '';
    formulario.classList.add('hidden');
})

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');
    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>`;
    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = tarefa.descricao;
    const botaoEditar = document.createElement('button')
    botaoEditar.classList.add('app_button-edit')
    const iconeEditar = document.createElement('img');
    iconeEditar.setAttribute('src', 'imagens/edit.png');

    botaoEditar.append(iconeEditar);
    li.append(svg);
    li.append(paragrafo);
    li.append(botaoEditar);
    return li;
}

listaTarefas.forEach(tarefas => {
   const elementeTarefa = criarElementoTarefa(tarefas);
   ulTarefas.append(elementeTarefa);
});