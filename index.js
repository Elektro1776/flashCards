const mysql = require('mysql');
const readline = require('readline');
const DBConfig = require('./config');

const myCon = mysql.createConnection(DBConfig);
const createBasicFlash = require('./app/src/basicFlash')(myCon);
const createCloze = require('./app/src/cloze-deleted')(myCon);
//
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Would you like to create a basic flash card? > y/n ',
    terminal: false,
});
const basicFlashQuestion = 'Would you like to create a basic flash card? y/n ';
const clozeDeleted = 'Would you like to create a Cloze Deleted Flash card? y/n ';

rl.question(basicFlashQuestion, (line) => {
    switch (line.trim()) {
    case 'y':
        rl.close();
        return createBasicFlash.startBasicCardCreation()
        // TODO: set up the prompt to review the cards created.
        .then(cardsArray => console.log('BASIC CARDS ARRAY', cardsArray))
        .catch(err => console.warn('errrrrrrr', err));
    case 'n': {
        return rl.question(clozeDeleted, (answer) => {
            if (answer === 'y') {
                createCloze.startClozeCardCreation().then((cardsArray) => {
                    console.log('CLOZE CARD ARRAY', cardsArray);
                });
            }
        });
    }
    default:
        rl.close();
        break;
    }
});
