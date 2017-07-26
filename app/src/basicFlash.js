const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
    // prompt: 'Would you like to create a basic flash card? > y/n ',
});

let cardsArray = [];
const createBasicCard = (dB, spec) => {
    const that = {};
    const mysql = dB;
    // let numberOfCards = 0;
    // const cardQuestion = "What is the card Question?";
    // let cardAnswer;
    function cardRecurs(numberOfCards) {
        console.log(' WHAT ARE THE NUMBER OF CARDS ', numberOfCards);
        const currentCardCount = numberOfCards;
        return new Promise((resolve, reject) => {
            if (currentCardCount === 0) {
              console.log(' WHAT IS THE CARDS ARRAY???', cardsArray, resolve);
                debugger;
                resolve(cardsArray);
            } else {
                determineCardQuestion().then((card) => {
                  console.log(' DO WE HAVE A CARD?', card);
                  cardsArray.push(card);
                  cardRecurs(numberOfCards - 1)
                }).catch((err) => console.warn("errrrrr ", err))
            }
        });
    }
    function determineNumberOfCards() {
      rl.pause();
        return new Promise((resolve, reject) => {
            rl.question('How many cards would you like to create?', (answer) => {
                // numberOfCards = 0
                resolve(Promise.all([cardRecurs(parseInt(answer, 10))]));
                // resolve()
                // rl.close();
            });
        }).catch(err => console.warn('Error determining card number', err));
    }
    function determineCardQuestion() {
        return new Promise((resolve, reject) => {
            rl.question('What is the question?', (question) => {
              // console.log(' DOES THIS FIRE SECOND TIME AROUND ?', question);
              rl.write(process.stdout.write('\n'));
              rl.question('And the answer is?', (answer) => {
                  const cardObj = {};
                  cardObj.front = question;
                  cardObj.back = answer;
                  rl.pause();
                  resolve(cardObj);
              });
            });
        }).catch(err => console.warn('Error determining card number', err));
    }
    function createCard(question) {
        return new Promise((resolve, reject) => {
            rl.question('And the answer is?', (answer) => {
                const cardObj = {};
                cardObj.front = question;
                cardObj.back = answer;
                resolve(cardObj);
                rl.close();
            });
        }).catch(err => console.warn('Error creating your card, Please try again.', err));
    }
    that.determineNumberOfCards = determineNumberOfCards;
    that.determineCardQuestion = determineCardQuestion;
    that.createCard = createCard;
    return that;
};

module.exports = createBasicCard;
