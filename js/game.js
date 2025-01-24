const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const characters = [
    'brook',
    'chopper',
    'esopp',
    'frank',
    'jinbe',
    'luffy',
    'nami',
    'robi',
    'sanji',
    'zoro',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firistCard = '';
let secondCard = '';
let canClick = true; // Variável para controlar os cliques

const checkandGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 20) {
        clearInterval(this.loop);

        document.getElementById('player-name').innerText = spanPlayer.innerHTML;
        document.getElementById('final-time').innerText = timer.innerHTML;

        const modal = document.getElementById('endgame-modal');
        modal.style.display = 'block';

        const closeButton = document.querySelector('.close-button');
        closeButton.onclick = () => {
            modal.style.display = 'none';
        }
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }
}

const checkCards = () => {
    const firistCharacter = firistCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    if (firistCharacter == secondCharacter) {

        firistCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firistCard = '';
        secondCard = '';

        checkandGame();
        canClick = true; // Permitir novos cliques

    } else {
        setTimeout(() => {
            firistCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firistCard = '';
            secondCard = '';
            canClick = true;
        }, 500);
    }
};

const revealCard = ({ target }) => {

    if (!canClick) return; // Impedir cliques se não puder clicar
    if (target.parentNode.classList.contains('reveal-card')) return; // Impedir cliques na mesma carta

    if (firistCard === '') {

        target.parentNode.classList.add('reveal-card')
        firistCard = target.parentNode;

    } else if (secondCard === '') {

        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode;
        canClick = false; // Bloquear novos cliques

        checkCards();
    }

};

const createCard = (character) => {

    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../imagens/${character}.png')`

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character);
    return card;
}
const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {

        const card = createCard(character);
        grid.appendChild(card);
    });
}
const startTimer = () => {
    timer.innerHTML = '0';  // Inicializa o timer com 0
    this.loop = setInterval(() => {
        const currentTimer = Number(timer.innerHTML);  // Converte o valor do timer para número usando Number()
        timer.innerHTML = (currentTimer + 1).toString();  // Atualiza o timer e converte para string
    }, 1000);
}

window.onload = () => {
    const playerName = localStorage.getItem('player')
    spanPlayer.innerHTML = playerName
    startTimer();
    loadGame();
};