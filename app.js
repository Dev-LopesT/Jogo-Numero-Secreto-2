let listaNumSorteados = [];
let numMaximo = 100;
let numSecreto = gerarNumAleatorio();
console.log(numSecreto);
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Chinese Male", { rate: 1.2 });
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do Número Secreto");
  exibirTextoNaTela("p", `Escolha um número de 1 à ${numMaximo}`);
}

exibirMensagemInicial();

function gerarNumAleatorio() {
  let numEscolhido = Math.floor(Math.random() * numMaximo + 1);
  let quantidadeElementosLista = listaNumSorteados.length;

  if (quantidadeElementosLista == numMaximo) {
    listaNumSorteados = [];
  }

  if (listaNumSorteados.includes(numEscolhido)) {
    return gerarNumAleatorio();
  } else {
    listaNumSorteados.push(numEscolhido);
    console.log(listaNumSorteados);
    return numEscolhido;
  }
}

function chutarNumero() {
  let inpChute = document.querySelector("input").value;

  if (inpChute == numSecreto) {
    let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Parabéns você acertou com ${tentativas} ${palavraTentativas}`;
    exibirTextoNaTela("h1", "Acertou!");
    exibirTextoNaTela("p", mensagemTentativas);
    document.querySelector("#reiniciar").removeAttribute("disabled");
  } else {
    if (inpChute < numSecreto) {
      exibirTextoNaTela("p", "O Número Secreto é maior!");
    } else if (inpChute > numSecreto) {
      exibirTextoNaTela("p", "O Número Secreto é menor");
    } else {
      exibirTextoNaTela("p", "Número Incorreto");
    }
    tentativas++;
    limparCampo();
  }
}

function limparCampo() {
  inpChute = document.querySelector("input");
  inpChute.value = "";
}

function novoJogo() {
  document.querySelector("#reiniciar").setAttribute("disabled", "");
  numSecreto = gerarNumAleatorio(numMaximo);
  console.log(numSecreto);
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial(numMaximo);
}
