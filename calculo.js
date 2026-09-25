const inputMedia = document.querySelector("#media");
const inputDados = document.querySelector("#dados");
const form = document.querySelector("#form-calculo");
const containerResultados = document.querySelector("#container-resultados");
const btnDesvio = document.querySelector("#btn-desvio");
const painelResultado = document.querySelector("#painel-resultado");

// Agora usamos duas listas para armazenar os passos
const listaSubtracoes = [];
const listaQuadrados = [];

// Evento para descer com o ENTER (Mantido)
inputMedia.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        inputDados.focus();
    }
});

// Evento de Envio do Formulário
form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    const sub = Number(inputDados.value) - Number(inputMedia.value);
    const pow = Math.pow(sub, 2);
    
    // Guarda os valores em suas respectivas listas
    listaSubtracoes.push(Number(sub.toFixed(4)));
    listaQuadrados.push(Number(pow.toFixed(4)));

    // Mostra o resultado parcial na tela
    const paragrafoResultado = document.createElement("p");
    paragrafoResultado.textContent = `Dado inserido: ${inputDados.value} | Subtração: ${sub} | Potência: ${pow}`;
    containerResultados.appendChild(paragrafoResultado);

    // Limpa o campo de dados para facilitar a próxima digitação e mantém o foco nele
    inputDados.value = "";
    inputDados.focus();
});

// Evento do Cálculo do Desvio Padrão
btnDesvio.addEventListener("click", () => {
    const quantidade = listaQuadrados.length;

    // Mostra o painel que estava escondido pelo CSS
    painelResultado.style.display = "block";

    if (quantidade <= 1) {
        painelResultado.innerHTML = "<p><strong>Erro:</strong> Adicione pelo menos 2 dados para o cálculo amostral.</p>";
        return;
    }

    // Cálculos
    const somaQuadrados = listaQuadrados.reduce((acc, num) => acc + num, 0);
    const variancia = somaQuadrados / (quantidade - 1);
    const desvioPadrao = Math.sqrt(variancia);

    // Injeta o relatório completo no painel em formato HTML
    painelResultado.innerHTML = `
        <p><strong>Subtrações :</strong> [ ${listaSubtracoes.join(", ")} ]</p>
        <p><strong>Quadrados:</strong> [ ${listaQuadrados.join(", ")} ]</p>
        <p><strong>Soma dos Quadrados:</strong> ${somaQuadrados.toFixed(4)}</p>
        <p><strong>Quantidade Adicionada (N):</strong> ${quantidade}</p>
        <hr style="margin: 10px 0; border: 0; border-top: 1px solid #ccc;">
        <p style="font-size: 1.2rem; color: #e74c3c;"><strong>Desvio Padrão:</strong> ${desvioPadrao.toFixed(4)}</p>
    `;
});