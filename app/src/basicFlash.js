const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
    // prompt: 'Would you like to create a basic flash card? > y/n ',
});

const cardsArray = [];
const createBasicCard = (dB, spec) => {
    const that = {};
    const mysql = dB;
    const prompt = require('./prompt');
    function startBasicCardCreation() {
        rl.pause();
        return new Promise((resolve, reject) => {
            rl.question('How many cards would you like to create?', (answer) => {
                Promise.resolve()
                .then(() => (parseInt(answer, 10)))
                .then(function recursiveFunction(n) {
                    rl.pause();
                    if (n === 0) {
                        return (0);
                    }
                         // Internally to this promise link, we're going to start a NEW
                         // PROMISE CHAIN whose fulfillment will become the continuation of
                         // the parent promise chain.
                    const promise = createCard().then(
                              (card) => {
                                  cardsArray.push(card);
                                  return (recursiveFunction(n - 1)); // RECURSE!
                              },
                         );
                    return (promise);
                },
           )
          .then((values) => {
              rl.resume();
              rl.close();
              resolve(cardsArray);
          },
           );
            });
        }).catch(err => console.warn('Error determining card number', err));
    }

    function createCard() {
        return new Promise((resolve, reject) => {
            prompt('What is the question for you card?').then((question) => {
                prompt('What is the answer?').then((answer) => {
                    const card = { front: question, back: answer };
                    resolve(card);
                });
            });
        }).catch(err => console.warn('Error determining card number', err));
    }
    that.startBasicCardCreation = startBasicCardCreation;
    that.createCard = createCard;
    return that;
};

module.exports = createBasicCard;
