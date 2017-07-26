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
    function prompt(question, callback) {
        return new Promise((resolve, reject) => {
            const stdin = process.stdin;
            const stdout = process.stdout;

            stdin.resume();
            stdout.write(question);

            stdin.once('data', (data) => {
              // callback(data.toString().trim());
                resolve(data.toString().trim());
            });
        });
    }
    function startBasicCardCreation() {
        rl.pause();
        return new Promise((resolve, reject) => {
            rl.question('How many cards would you like to create?', (answer) => {
                Promise.resolve()
                .then(
                    () => {
                        // console.group( "Recursion - inline function." );
                        return (parseInt(answer, 10));
                    },
           )
           // In this link of the promise chain, the resolution function is explicitly
           // named. This way, the function reference can be invoked from within its
           // own function body.
           .then(
               function recursiveFunction(n) {
                 rl.pause();
                  //  console.log( "Entering recursive function for [", n, "]." );
                   // Once we hit zero, bail out of the recursion. The key to recursion
                   // is that it stops at some point, and the callstack can be "rolled"
                   // back up.
                   if (n === 0) {
                       return (0);
                   }
                   // Internally to this promise link, we're going to start a NEW
                   // PROMISE CHAIN whose fulfillment will become the continuation of
                   // the parent promise chain. This fundamentally different from the
                   // reduce() example.
                   const promise = createCard().then(
                        (card) => {
                            cardsArray.push(card);
                            return (recursiveFunction(n - 1)); // RECURSE!
                        },
                   );
                   return (promise);
                   // NOTE: To be ultra-concise, I could have written the following;
                   // but, I think that would have made the example harder to follow.
                   // --
                   // return( Promise.resolve( recursiveFunction( n - 1 ) ) );
               },
           )
           .then(
               (values) => {
                  //  console.groupEnd();
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

            prompt("What is the question for you card?").then((question) => {
                prompt('What is the answer?').then((answer) => {
                    resolve({ front: question, back: answer })
                })
            })
            // rl.resume();
            // rl.write(process.stdout.write('\n'));
            // rl.question('What is the question?', (question) => {
            //     // rl.pause();
            //     rl.write(process.stdout.write('\n'));
            //
            //     rl.question('And the answer is?', (answer) => {
            //         const cardObj = {};
            //         cardObj.front = question;
            //         cardObj.back = answer;
            //         // rl.write(process.stdout.write('\n'));
            //
            //         rl.pause();
            //         resolve(cardObj);
            //     });
            // });
        }).catch(err => console.warn('Error determining card number', err));
    }
    that.startBasicCardCreation = startBasicCardCreation;
    that.createCard = createCard;
    return that;
};

module.exports = createBasicCard;
