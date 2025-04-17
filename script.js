// ================== CONFIGURAÇÃO INICIAL ==================
let audio = document.getElementById("audio");
let perguntas = [
  { pergunta: "Em qual dia eu te pedi em namoro?", opcoes: ["14/05", "14/04", "02/02"], correta: 1 },
  { pergunta: "Qual é o nome do meu corte de cabelo?", opcoes: ["Taper Fade", "Low Fade", "Mid Fade"], correta: 2 },
  { pergunta: "Qual foi a primeira série que assistimos juntos?", opcoes: ["Round 6", "Alice in Borderland", "Death Note"], correta: 1 },
  { pergunta: "Qual é o meu anime favorito?", opcoes: ["Shingeki no Kyojin", "Kimetsu no Yaiba", "Naruto"], correta: 0 },
  { pergunta: "Qual é a minha cor favorita?", opcoes: ["Ciano", "Preto", "Azul"], correta: 2 },
  { pergunta: "Qual o nome da minha profissão?", opcoes: ["Auxiliar Jurídico", "Auxiliar de Logística", "Auxiliar Administrativo"], correta: 2 },
  { pergunta: "Qual é a data do meu aniversário?", opcoes: ["18/10", "18/11", "18/09"], correta: 0 },
  { pergunta: "Qual o meu estilo de música favorito?", opcoes: ["Funk", "Geek", "Eletrônica"], correta: 1 },
  { pergunta: "Qual é o nome do meu perfume?", opcoes: ["Egeo Blue", "Egeo Pina Blast", "Egeo Spicy Vibe"], correta: 1 },
  { pergunta: "O que eu te dei de presente no dia dos namorados?", opcoes: ["Aliança de Namoro", "Vestido", "Quadro"], correta: 2 }
];

let perguntaAtual = 0;
let acertos = 0;

// ================== IR PARA PLAYLIST ==================
function irParaPlaylist() {
  document.getElementById("introducao").style.display = "none";
  document.getElementById("playlist").style.display = "block";
}

// ================== INICIAR QUIZ ==================
function iniciarQuiz() {
  const musicas = document.getElementsByName("musica");
  let selecionada = null;

  // Verifica qual música foi selecionada
  for (let musica of musicas) {
    if (musica.checked) {
      selecionada = musica.value;
      break;
    }
  }

  // Se nenhuma música foi escolhida, pede para o usuário selecionar uma
  if (!selecionada) {
    alert("Você esqueceu de escolher uma música, vida!");
    return;
  }

  // Atualiza o áudio com a música selecionada
  audio.src = selecionada;

  // Esconde a área da playlist e mostra o quiz
  document.getElementById("playlist").style.display = "none"; // Esconde a playlist
  document.getElementById("quiz").style.display = "block"; // Exibe o quiz

  mostrarPergunta(); // Chama a função que exibe a primeira pergunta
}

// ================== MOSTRAR PERGUNTA ==================
function mostrarPergunta() {
  if (perguntaAtual >= perguntas.length) {
    finalizarQuiz();
    return;
  }

  const container = document.getElementById("pergunta-container");
  container.innerHTML = "";

  let p = document.createElement("p");
  p.textContent = `Pergunta ${perguntaAtual + 1}: ${perguntas[perguntaAtual].pergunta}`;
  container.appendChild(p);

  perguntas[perguntaAtual].opcoes.forEach((opcao, index) => {
    let label = document.createElement("label");
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "resposta";
    input.value = index;
    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + opcao));
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });

  let botao = document.createElement("button");
  botao.textContent = "Próxima";
  botao.onclick = verificarResposta;
  container.appendChild(botao);
}

// ================== VERIFICAR RESPOSTA ==================
function verificarResposta() {
  const radios = document.getElementsByName("resposta");
  let selecionada = null;
  for (let radio of radios) {
    if (radio.checked) {
      selecionada = parseInt(radio.value);
      break;
    }
  }

  if (selecionada === null) {
    alert("Escolha uma resposta, amorzinho!");
    return;
  }

  if (selecionada === perguntas[perguntaAtual].correta) {
    acertos++;
  }

  perguntaAtual++;
  mostrarPergunta();
}

// ================== FINALIZAR QUIZ ==================
function finalizarQuiz() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("final-message").style.display = "block";

  let titulo = document.getElementById("titulo-final");
  let mensagem = document.getElementById("mensagem-final");

  if (acertos >= 8) {
    titulo.textContent = "Caraca amor, mandou muito bem!! 💖";
    mensagem.textContent = `Acertou ${acertos} de 10! Então você realmente me conhece, amo muito você, viu?`;
    document.getElementById("btn-final").textContent = "Veja sua Surpresa";
    document.getElementById("btn-final").onclick = verSurpresa; // Chama função para mostrar a surpresa
  } else {
    titulo.textContent = "Afe vida, poxa...";
    mensagem.textContent = `Você acertou ${acertos} de 10. Faz de novo, é pra acertar mais, viu?`;
    document.getElementById("btn-final").textContent = "Refazer Quiz";
    document.getElementById("btn-final").onclick = refazerQuiz; // Chama função para refazer o quiz
  }
}

// ================== VEJA SUA SURPRESA ==================
function verSurpresa() {
  // Altere o conteúdo da página ou direcione para uma nova página
  window.location.href = "surpresa.html"; // Redireciona para a página surpresa.html
}


// ================== REFAZER QUIZ ==================
function refazerQuiz() {
  perguntaAtual = 0;
  acertos = 0;
  document.getElementById("final-message").style.display = "none";
  document.getElementById("playlist").style.display = "block";
  document.getElementById("quiz").style.display = "none";
}
