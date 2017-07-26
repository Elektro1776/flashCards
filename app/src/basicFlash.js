const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Would you like to create a basic flash card? > y/n ',
});

const createBasicCard = (dB, spec) => {
    const that = {};
    const mysql = dB;

    function determineCardQuestion() {

    }
    that.determineCardQuestion = determineCardQuestion;

    return that;
}

module.exports = createBasicCard;
