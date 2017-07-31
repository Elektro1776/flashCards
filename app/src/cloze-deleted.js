const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

const cardsArray = [];
const createClozeCard = (dB, spec) => {
    const that = {};
    // const mysql = dB;
    const prompt = require('./prompt');
    function startClozeCardCreation() {
        rl.pause();
        return new Promise((resolve, reject) => {
            rl.question('How many cards would you like to create?', (answer) => {
                Promise.resolve()
                .then(() => (parseInt(answer, 10)))
                   // In this link of the promise chain, the resolution function is explicitly
                   // named. This way, the function reference can be invoked from within its
                   // own function body.
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
           .then(
               (values) => {
                   rl.resume();
                   rl.close();
                   resolve(cardsArray);
               },
           )
       ;
            });
        }).catch(err => console.warn('Error determining card number', err));
    }
    function createCard() {
        return new Promise((resolve, reject) => {
            prompt('What is the full question?').then((fullText) => {
                prompt('What should be removed?').then((partial) => {
                    const cloze = fullText.replace(partial, '...');
                    const card = {
                        fullText,
                        partial,
                        cloze,
                    };
                    resolve(card);
                });
            });
        }).catch(err => console.warn('Error determining card number', err));
    }
    that.startClozeCardCreation = startClozeCardCreation;
    return that;
};

module.exports = createClozeCard;
