const grid = document.querySelector('.grid');
const spanPlayer= document.querySelector('.player')
const timer= document.querySelector('.timer')
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

const checkandGame = () => {
    const disabledCards = document.querySelector('.disabled-card')

    if (disabledCards.length == 20) {
        clearInterval(this.loop);
        alert(`Parabéns ${spanPlayer.innerHTML}! Seu tempo foi de ${timer.innerHTML} segundos. `)

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

    } else {
        setTimeout(() => {
            firistCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firistCard = '';
            secondCard = '';
        }, 500);



    }
};

const revealCard = ({ target }) => {

    /*  if(target.parentNode.className.inclubes('reveal-card')){
          return'';
              }*/

    //SERIA PARA O BUG DE VIRAR A CARTA DEPOIS QUE JA TENHA VIRADO, MAS ESSE BUG NÃO TA CONTECENDO, NEM O CÓDIGO FUNCIONOU... 

    if (firistCard === '') {

        target.parentNode.classList.add('reveal-card')
        firistCard = target.parentNode;

    } else if (secondCard === '') {

        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode;


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

const startTimer = () =>{
this.loop=  setInterval(() => {
const currentTimer= +timer.innerHTML;
timer.innerHTML= currentTimer + 1
}, 1000);
}

window.onload = () =>{
const playerName = localStorage.getItem('player')
spanPlayer.innerHTML=playerName
startTimer();
    loadGame();
};



