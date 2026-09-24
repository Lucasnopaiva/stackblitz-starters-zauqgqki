const form = document.getElementById('formAtividade');
const input = document.getElementById('inputAtividade');
const lista = document.getElementById('listaAtividades');

const totalAtividades = document.getElementById('totalAtividades');
const totalPendentes = document.getElementById('totalPendentes');
const totalConcluidas = document.getElementById('totalConcluidas');

const filtros = document.querySelectorAll('.filter');

let filtroAtual = 'todas';

let atividades = [
  {
    id: 1,
    titulo: 'Finalizar atividade da faculdade',
    concluida: false,
  },
  {
    id: 2,
    titulo: 'Estudar JavaScript por 30 minutos',
    concluida: false,
  },
  {
    id: 3,
    titulo: 'Organizar tarefas da semana',
    concluida: true,
  },
];

function renderizar() {
  lista.innerHTML = '';

  let atividadesFiltradas = atividades;

  if (filtroAtual === 'pendentes') {
    atividadesFiltradas = atividades.filter(
      (atividade) => !atividade.concluida
    );
  }

  if (filtroAtual === 'concluidas') {
    atividadesFiltradas = atividades.filter((atividade) => atividade.concluida);
  }

  if (atividadesFiltradas.length === 0) {
    lista.innerHTML = `
      <div class="empty">

        <div class="empty-icon">
          ✓
        </div>

        <strong>Nenhuma atividade encontrada</strong>

        <p>
          Adicione uma nova atividade para começar.
        </p>

      </div>
    `;
  }

  atividadesFiltradas.forEach((atividade) => {
    const item = document.createElement('div');

    item.className = atividade.concluida ? 'task completed' : 'task';

    item.innerHTML = `

      <button
        class="check"
        onclick="alternarAtividade(${atividade.id})"
      >
        ${atividade.concluida ? '✓' : ''}
      </button>


      <div class="task-info">

        <div class="task-title">
          ${atividade.titulo}
        </div>

        <span class="task-status">

          ${atividade.concluida ? 'Concluída' : 'Pendente'}

        </span>

      </div>


      <button
        class="delete"
        onclick="excluirAtividade(${atividade.id})"
      >
        ×
      </button>

    `;

    lista.appendChild(item);
  });

  atualizarEstatisticas();
}

function adicionarAtividade(titulo) {
  atividades.unshift({
    id: Date.now(),

    titulo,

    concluida: false,
  });

  renderizar();
}

function alternarAtividade(id) {
  const atividade = atividades.find((item) => item.id === id);

  if (atividade) {
    atividade.concluida = !atividade.concluida;
  }

  renderizar();
}

function excluirAtividade(id) {
  atividades = atividades.filter((item) => item.id !== id);

  renderizar();
}

function atualizarEstatisticas() {
  const pendentes = atividades.filter((item) => !item.concluida).length;

  const concluidas = atividades.filter((item) => item.concluida).length;

  totalAtividades.textContent = atividades.length;

  totalPendentes.textContent = pendentes;

  totalConcluidas.textContent = concluidas;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const titulo = input.value.trim();

  if (!titulo) return;

  adicionarAtividade(titulo);

  input.value = '';

  input.focus();
});

filtros.forEach((botao) => {
  botao.addEventListener('click', function () {
    filtros.forEach((item) => item.classList.remove('active'));

    botao.classList.add('active');

    filtroAtual = botao.dataset.filter;

    renderizar();
  });
});

function focarInput() {
  input.focus();
}

renderizar();
