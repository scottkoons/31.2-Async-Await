// Asynchronous Code in JavaScript

// Part 1: Number Facts
const number = 93;
const url = "http://numbersapi.com";

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.
async function getNumberFacts() {
    const res = await axios.get(`${url}/${number}?json`);
    console.log(res);
    $("#q1").append(`<li>${res.data.text}</li>`);
}
getNumberFacts();

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
async function getMultipleNumbers() {
    const res = await axios.get(`${url}/8..10?json`);
    console.log(res);
    $("#q2-1").append(`<li>${res.data[8]}</li><li>${res.data[9]}</li><li>${res.data[10]}</li>`);
}
getMultipleNumbers();

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page.It’s okay if some of the facts are repeats.
async function fourFacts(num) {
    let res1 = await axios.get(`${url}/${num}?json`);
    $("#q3-1").append(`<li>${res1.data.text}</li>`);
    let res2 = await axios.get(`${url}/${num}?json`);
    $("#q3-2").append(`<li>${res2.data.text}</li>`);
    let res3 = await axios.get(`${url}/${num}?json`);
    $("#q3-3").append(`<li>${res3.data.text}</li>`);
    let res4 = await axios.get(`${url}/${num}?json`);
    $("#q3-4").append(`<li>${res4.data.text}</li>`);
}
fourFacts(30);

// Part 2: Deck of Cards
// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit(e.g.“5 of spades”, “queen of diamonds”).
const card_url = "https://deckofcardsapi.com/api/deck/new/draw/?count=1";
async function singleCard() {
    let res = await axios.get(card_url);
    $("#card-info").append(`<li>${res.data.cards[0].value} of ${res.data.cards[0].suit}</li>`);
    console.log(res.data.cards[0].value);
    console.log(res.data.cards[0].suit);
}
singleCard();

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
async function twoCards() {
    let res1 = await axios.get(card_url);
    $("#card-1").append(`<li>${res1.data.cards[0].value} of ${res1.data.cards[0].suit}</li>`);
    console.log(res1.data.cards[0].value);
    console.log(res1.data.cards[0].suit);

    let res2 = await axios.get(card_url);
    $("#card-2").append(`<li>${res2.data.cards[0].value} of ${res2.data.cards[0].suit}</li>`);
    console.log(res2.data.cards[0].value);
    console.log(res2.data.cards[0].suit);
}
twoCards();

// 3. Build an HTML page that lets you draw cards from a deck.When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card.Every time you click the button, display a new card, until there are no cards left in the deck

// const deck = {
//     async init() {
//         let res = await axios.get('https://deckofcardsapi.com/api/deck/new/');
//         this.deckID = res.data.deck_id;
//         console.log(this.deckID);
//     },
//     async shuffle() {
//         let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckID}/shuffle/`);
//         console.log(res);
//     },
//     async drawCard() {
//         let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=1`);
//         console.log(res.data);
//     }
// };

$(function () {
    const url = 'https://deckofcardsapi.com/api/deck';

    (async function getSingleCard() {
        const resp = await axios.get(`${url}/new/draw/`);
        let { suit, value } = resp.data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    })();

    (async function getCardsFromSameDeck() {
        const resp1 = await axios.get(`${url}/new/draw/`);
        const firstCard = resp1.data.cards[0];
        const id = resp1.data.deck_id;
        const resp2 = await axios.get(`${url}/${id}/draw/`);
        const secondCard = resp2.data.cards[0];
        [firstCard, secondCard].forEach(card => console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`));
    })();

    (async function putCardsOnPage() {
        const resp = await axios.get(`${url}/new/shuffle/`);
        const id = resp.data.deck_id;
        $('button').show();
        $('button').on('click', async function () {
            const resp = await axios.get(`${url}/${id}/draw/`);
            let cardSrc = resp.data.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;

            $('#card-area').append($(`<img src=${cardSrc} alt="Playing card" height="150" width="100" style="transform: translate(${randomX}px, ${randomY}px) rotate(${angle}deg)"</>`));
            if (resp.data.remaining === 0) $('button').remove();
        });
    })();
});