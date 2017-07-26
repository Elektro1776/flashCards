const mysql = require('mysql');
const readline = require('readline');
const DBConfig = require('./config');
const myCon = mysql.createConnection(DBConfig);
const createBasicFlash = require('./app/src/basicFlash')(myCon);
// const createCloze = require('./app/src/cloze-deleted')(myCon);
//
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Would you like to create a basic flash card? > y/n '
});
let basicFlashQuestion = "Would you like to create a basic flash card? y/n ";
// process.stdin.resume();
// let clozeDeleted = "Would you like to create a Cloze Deleted Flash card? y/n ";
//
// rl.prompt();
//
rl.question(basicFlashQuestion, (line) => {
    switch (line.trim()) {
    case 'y':
        console.log('CREATE THE BASIC CARD', line, createBasicFlash);
        rl.pause();
        return createBasicFlash.determineNumberOfCards()
        .then(numberOfCards => console.log(' WHAT THE HELL WILL THIS BE ?', numberOfCards))
        .catch((err) => console.warn("errrrrrrr", err));
        // .then(question => createBasicFlash.createCard(question))
        // .then((cardsToReview) => {
        //   console.log(' WHAT IS THE CARD OBJECT RETURNED', cardsToReview);
        // });

        // break;
    case 'n': {
        return rl.question(clozeDeleted, (answer) => {
            if (answer === 'y') {
                console.log("WHAT IS THE CLozeeee", createCloze);
            }

        // rl.clearLine(answer, 1)
      })
    }
    break;
    default:
      rl.close();
      break;
  }
  // rl.prompt();
})
// rl.question('Would you like to create a Flash Card? y/n', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(' WHAT IS THE ANWER', answer);
//   switch (answer.trim()) {
//     case 'y':{
//       console.log(' Should get  a y???', answer);
//       createBasicFlash.determineCardQuestion();
//     }
//       break;
//     case 'no' :
//     rl.write("Fine don't help yourself!\n");
//     break;
//     default:
//
//   }
//
//   //rl.close();
// });
// // con.connect((err) => {
// //   if (err) console.warn("Error",err);
// //   con.query("DROP TABLE IF EXISTS customers", (err, result, fields) => {
// //     if (err) throw err;
// // console.log("Number of records deleted: " ,result)
// //   });
// // });
        // rl.prompt();
        // rl.question("What is the question?", (answer) => {
        //   console.log(' ANSWER ???', answer);
        //   rl.setPrompt('>>');
        //   rl.prompt()
        //   // Simulate ctrl+u to delete the line written previously
        // // rl.write(null, {ctrl: true, name: 'u'})
        // })
        // rl.on('line', (input) => {
        //   console.log(' WHAT IS THE INPUT?', input);
        // })
