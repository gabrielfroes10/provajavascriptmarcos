// Questão 01
const recuperarFilmesAlocados = () => {
  const alocados = document.getElementById('alocados');

  return Array.from(alocados.children[1].children);
};

const recuperarFilmesEmEstoque = () => {
  const estoque = document.getElementById('disponiveis');

  return Array.from(estoque.children[1].children);
};

const atualizarInformacoesAnaliticas = () => {
  const alocados = recuperarFilmesAlocados();
  const estoque = recuperarFilmesEmEstoque();

  const tabelaAnalise = document.getElementById('analise').children[1];

  tabelaAnalise.innerHTML = '';

  const trAnalise = document.createElement('tr');

  const tdAlocados = document.createElement('td');

  tdAlocados.innerText = alocados.filter((alocado) => {
    const dataDevolucao = alocado.children[1].innerText;

    return dataDevolucao === '' || dataDevolucao === null;
  }).length;

  const tdEstoque = document.createElement('td');
  tdEstoque.innerText = estoque.length;

  trAnalise.appendChild(tdAlocados);
  trAnalise.appendChild(tdEstoque);

  tabelaAnalise.appendChild(trAnalise);
};

atualizarInformacoesAnaliticas();



function atualizaListaDeFilmes() {
  const listaDeFilmes = recuperarFilmesEmEstoque();

  const selectFilme = document.getElementById('nomeFilme');
  selectFilme.innerHTML = '';

  listaDeFilmes.forEach((filme) => {
    const option = new Option(
      filme.children[0].innerText,
      filme.children[0].innerText,
    );
    selectFilme.appendChild(option);
  });
}

atualizaListaDeFilmes();

const formLocacao = document.getElementById('form-locacao');

formLocacao.addEventListener('submit', (event) => {
  event.preventDefault();

  const form = event.target;

  const { nomeCliente, nomeFilme } = form;

  const alocados = document.getElementById('alocados').children[1];
  const trAlocados = document.createElement('tr');

  const tdDataLocacao = document.createElement('td');
  tdDataLocacao.innerText = new Date().toLocaleDateString('pt-BR');

  const tdDataDevolucao = document.createElement('td');
  tdDataDevolucao.innerText = '';

  const tdNomeCliente = document.createElement('td');
  tdNomeCliente.innerText = nomeCliente.value;

  const tdNomeFilme = document.createElement('td');
  tdNomeFilme.innerText = nomeFilme.value;

  const tdBotaoDevolucao = document.createElement('td');
  const botaoDevolucao = document.createElement('button');
  botaoDevolucao.innerText = 'Devolver';

  botaoDevolucao.addEventListener('click', realizarDevolucao);

  tdBotaoDevolucao.appendChild(botaoDevolucao);

  trAlocados.appendChild(tdDataLocacao);
  trAlocados.appendChild(tdDataDevolucao);
  trAlocados.appendChild(tdNomeCliente);
  trAlocados.appendChild(tdNomeFilme);
  trAlocados.appendChild(tdBotaoDevolucao);

  alocados.appendChild(trAlocados);

  atualizarInformacoesAnaliticas();
  pintarTabelaDeFilmes();

  form.reset();
});



const pintarTabelaDeFilmes = () => {
  const filmes = recuperarFilmesEmEstoque();

  const filmesAlocados = recuperarFilmesAlocados();

  const nomesFilmesAlocados = filmesAlocados
    .filter((alocado) => {
      const dataDevolucao = alocado.children[1].innerText;

      return dataDevolucao === null || dataDevolucao === '';
    })
    .map((filme) => {
      const nomeAlocado = filme.children[3].innerHTML;

      return nomeAlocado;
    });

  filmes.forEach((filme) => {
    const nomeFilme = filme.children[0].innerText;

    if (nomesFilmesAlocados.includes(nomeFilme)) {
      filme.style.backgroundColor = 'red';
    } else {
      filme.style.backgroundColor = 'green';
    }
  });
};

pintarTabelaDeFilmes();



const realizarDevolucao = (event) => {
  const tr = event.target.parentNode.parentNode;

  const dataDevolucao = new Date().toLocaleDateString('pt-BR');

  tr.children[1].innerText = dataDevolucao;
  tr.children[4].remove();

  atualizarInformacoesAnaliticas();
  pintarTabelaDeFilmes();
};

const alocadosHead = document.getElementById('alocados').children[0];
const alocadosBody = document.getElementById('alocados').children[1];

const tdHead = document.createElement('th');
alocadosHead.children[0].appendChild(tdHead);

Array.from(alocadosBody.children).forEach((tr) => {
  const dataDevolucao = tr.children[1].innerText;
  if (dataDevolucao === null || dataDevolucao === '') {
    const td = document.createElement('td');
    const botaoDevolucao = document.createElement('button');
    botaoDevolucao.innerText = 'Devolver';

    botaoDevolucao.addEventListener('click', realizarDevolucao);

    td.appendChild(botaoDevolucao);
    tr.appendChild(td);
  }
});
