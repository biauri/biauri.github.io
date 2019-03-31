// É gerado um número aleatório de 1 a 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// É criada uma constante correspondente ao elemento .guesses
const guesses = document.querySelector('.guesses');
// É criada uma constante correspondente ao elemento .lastResult
const lastResult = document.querySelector('.lastResult');
// É criada uma constante correspondente ao elemento .lowOrHi
const lowOrHi = document.querySelector('.lowOrHi');

// É criada uma constante correspondente ao elemento .guessSubmit
const guessSubmit = document.querySelector('.guessSubmit');
// É criada uma constante correspondente ao elemento .guessField
const guessField = document.querySelector('.guessField');

// É criada uma variável que armazena uma contagem de adivinhações, começando em 1
let guessCount = 1;
// É criada uma variável que faz referência ao botão resetButton
let resetButton;

// É colocado o foco no campo guessField
guessField.focus();

// É criada uma função para checar as adivinhações
function checkGuess() {
    // É criada uma variável que tem como valor o número que foi inserido no campo .guessField
    let userGuess = Number(guessField.value);
    // Se a contagem de adivinhações estiver em 1, ou seja, se esta for a primeira adivinhação...
    if (guessCount === 1) {
        // ...então este será o conteúdo do parágrafo .guesses
        guesses.textContent = 'Números anteriores: ';
    }
    // Serão adicionados ao conteúdo de .guesses o último número que foi inserido e um espaço
    guesses.textContent += userGuess + ' ';
    
    // Se o número inserido for igual ao número aleatório, ou seja, se o usuário tiver acertado...
    if (userGuess === randomNumber) {
        // ...o conteúdo de .lastResult será a seguinte mensagem
        lastResult.textContent = 'Parabéns! Você acertou!';
        // Cor de fundo da mensagem
        lastResult.style.backgroundColor = 'green';
        // O elemento .lowOrHi não terá nenhum conteúdo
        lowOrHi.textContent = '';
        // Será executada a função setGameOver
        setGameOver();
    // Caso contrário, se a contagem de adivinhações for igual a 10, ou seja,se esta for a última chance...
    } else if (guessCount === 10) {
        // ...o elemento .textContent exibirá esta mensagem
        lastResult.textContent = 'GAME OVER';
        // E será executada a função setGameOver
        setGameOver();
    // Caso contrário, ou seja, se o usuário tiver errado mas ainda tiver mais chances...
    } else {
        // ...será exibida no elemento .lastResult a seguinte mensagem
        lastResult.textContent = 'Errou!';
        // Cor da mensagem
        lastResult.style.backgroundColor = 'red';
        // Se o número inserido for menor do que o número aleatório...
        if(userGuess < randomNumber) {
            // ...o conteúdo do elemento .lowOrHi dirá que o número é muito baixo
            lowOrHi.textContent = 'Muito baixo!';
        // Caso contrário, ou seja, se for maior do que o número aleatório...
        } else if(userGuess > randomNumber) {
            // ...o elemento .lowOrHi dirá que foi muito alto
            lowOrHi.textContent = 'Muito alto!';
        }
    }
    
    // Depois de cada tentativa será acrescido 1 à contagem de adivinhações
    guessCount++;
    // O campo .guessField será resetado para as próximas tentativas
    guessField.value = '';
    // O foco voltará para o .guessField
    guessField.focus();
}

// Ao ser clicado o elemento .guessSubmit, será executada a função checkGuess
guessSubmit.addEventListener('click', checkGuess);

// É criada a função setGameOver
function setGameOver() {
    // O .guessField e o .guessSubmit serão bloqueados, para que o usuário não possa fazer novas tentativas, após ganhar ou após o game over
    guessField.disabled = true;
    guessSubmit.disabled = true;
    // Será criado o botão resetButton
    resetButton = document.createElement('button');
    // O botão resetButton exibirá a seguinte mensagem
    resetButton.textContent = 'Tentar de novo';
    // É criada uma nova variável, correspondente à div .game
    var game = document.getElementById('game');
    // O botão resetButton será colocado dentro de .game
    game.appendChild(resetButton);
    // Quando o botão resetButton for clicado, a função resetGame será executada
    resetButton.addEventListener('click', resetGame);
}

// É criada a função resetGame
function resetGame() {
    // A contagem de adivinhações volta para 1
    guessCount = 1;
    // É criada uma nova constante, correspondente aos parágrafos dentro de .resultParas
    const resetParas = document.querySelectorAll('.resultParas p');
    // É criado um loop que se repete por todos os elementos correspondentes à variável resetParas
    for (let i = 0 ; i < resetParas.length ; i++) {
        // É zerado o conteúdo de cada elemento em resetParas
        resetParas[i].textContent = '';
    }
    
    // É removido o botão resetButton
    resetButton.parentNode.removeChild(resetButton);
    
    // São reativados os elementos .guessField e .guessSubmit
    guessField.disabled = false;
    guessSubmit.disabled = false;
    // É zerado o conteúdo de .guessField
    guessField.value = '';
    // O foco é colocado no elemento .guessField
    guessField.focus();
    
    // A cor de fundo de .lastResult será branca
    lastResult.style.backgroundColor = 'white';
    
    // É gerado outro número aleatório
    randomNumber = Math.floor(Math.random() * 100) + 1;
}