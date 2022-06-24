// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
// in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.

// In seguito l'utente clicca su una cella:
// -se il numero è presente nella lista dei numeri generati:
    //  abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// -Altrimenti:
    // la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo
//  possibile di numeri consentiti

// prompt che chiede il livello di difficoltà
let level = parseInt(prompt ('scegli il livello difficoltà da 1 a 3'));

// array vuoto che verrà popolato dalle bombe
let arrayBomb = [];
let createNumbers = 0;

// check numeri doppi: creo array vuoto
// let duplicate = [];

const rangeMaxLevel1 = 100;
const rangeMaxLevel2 = 81;
const rangeMaxLevel3 = 49
let rangeChoise;

switch(level){
    case 1:
        // genera 16 numeri tra 1 e 100 e pusch in arrayRandom
        rangeChoise = rangeMaxLevel1;
        getArrayBomb(1, rangeChoise);
    break;
    case 2:
        // genera 16 numeri tra 1 e 81 e pusch in arrayRandom
        rangeChoise = rangeMaxLevel2;
        getArrayBomb(1, rangeChoise);
    break;
    case 3:
        // genera 16 numeri tra 1 e 49 e pusch in arrayRandom
        rangeChoise = rangeMaxLevel3;
        getArrayBomb(1, rangeChoise);
    break;
};
 
// contatore che tiene traccia della quantità di numeri inseriti
let counterAttempt = 0;
let maxAttempt = rangeChoise - 16;
// game in play settato vero
let gameOn = true;

alert('Per iniziare la partita clicca su un numero! Sono sicura andrai un BOMBAAAA!!')

// selezioniamo il contenitore griglia
let grid = document.getElementById('grid');
// per i che va da 1 a range choise
for(let i = 1; i <= rangeChoise; i++){

    // creare <div class="square"><span>1</span></div>
    const newSquare = document.createElement('div');

    // popolarli con il numero
    newSquare.innerHTML = `<span>${i}</span>`;

    // aggiungiamo la classe
    newSquare.classList.add('square');

    // aggiungo evento al click
    newSquare.addEventListener('click', squareCheck);
    newSquare.addEventListener('click', squareColor);
    
    // appendo
    grid.append(newSquare);
};

console.log(arrayBomb);



// ------------
// FUNZIONI
// ------------

// funzione che genera random tra min e max inclusi che indico io
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

// funzione che riempie array con 16 numeri random presi nell'intervallo scelto dall'utente
function getArrayBomb (){

    while (createNumbers<16){
        let thisNumber = getRndInteger(1, rangeChoise );

        // evita duplicati
        if(arrayBomb.includes(thisNumber)){

            // check numeri doppi: pusho numeri doppi in arrai duplicate
            // duplicate.push (thisNumber);
            let thisNumber = getRndInteger(1, rangeChoise);
        }
        else{
            arrayBomb.push (thisNumber);
            createNumbers++;
        }
    }
};

// funzione che controlla i numeri cliccati
function squareCheck(){
    const clikedNumber = parseInt(this.querySelector('span').innerHTML);
    console.log(clikedNumber);

        // se  è minore di maxAttempt e appartiene ad arrayBomb -->fine gioco, messaggio sei morto e punteggio
    if(counterAttempt < maxAttempt && arrayBomb.includes(clikedNumber)){
        gameOn = false;
        alert(`Gameover! :( Hai totalizzato ${counterAttempt} punti`);
   
        // se  è minore di maxAttemp e NON appartiene ad arrayBomb --> aumenta counter, richiesta altro numero
    }else if(counterAttempt < maxAttempt && !arrayBomb.includes(clikedNumber)){
        counterAttempt++;
    
        // raggiunti i tentativi massimi --> fine gioco, messaggio vittoria e punteggio
    }else if (counterAttempt == maxAttempt ){
        alert(`hai vinto!! Complimenti, hai totalizzato ${counterAttempt} punti!`);
        gameOn = false;
    }
}

// funzione che colora le caselle
function squareColor(){ 

    if(gameOn == false){
        // aggingi classe red
        this.classList.add('red');

    } else{
        // aggiunge classe verde
        this.classList.add('green')
    }
    
    // faccio in modo che non sia più cliccabile
    this.style.pointerEvents = 'none';
    // console.log('sto cliccando');

};

