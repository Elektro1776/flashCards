const mysql = require('mysql');
const readline = require('readline');
const DBConfig = require('./config');
const myCon = mysql.createConnection(DBConfig);
const createBasicFlash = require('./app/src/basicFlash')(myCon);
const createCloze = require('./app/src/cloze-deleted')(myCon);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Would you like to create a basic flash card? > y/n '
});
let basicFlashQuestion = "Would you like to create a basic flash card? y/n ";
let clozeDeleted = "Would you like to create a Cloze Deleted Flash card? y/n ";

rl.prompt();

rl.on('line', (line) => {
    switch (line.trim()) {
    case 'y':
        console.log('CREATE THE BASIC CARD', createBasicFlash);

        break;
    case 'n': {
        return rl.question(clozeDeleted, (answer) => {
            if (answer === 'y') {
                console.log("WHAT IS THE CLozeeee", createCloze);
            }

        rl.clearLine(answer, 1)
        rl.close()
      })
    }
    break;
    default:
      rl.close();
      break;
  }
  // rl.prompt();
}).on('close', () => {
  rl.write("Fine have a dandy day! \n");
  process.exit(0);
});
// rl.question('Would you like to create a Flash Card? y/n', (answer) => {
//   // TODO: Log the answer in a database
//   switch (answer) {
//     case 'y':
//       rl.question(basicFlashQuestion + " y/n", (answer) => {
//         if('y') {
//           return console.log(' WE HAVE A YES!');
//         } else {
//           return console.log(' WE HAVE A NO');
//         }
//
//       })
//       break;
//     case 'no' :
//     rl.write("Fine don't help yourself!\n");
//     break;
//     default:
//
//   }
//
//   rl.close();
// });
// con.connect((err) => {
//   if (err) console.warn("Error",err);
//   con.query("DROP TABLE IF EXISTS customers", (err, result, fields) => {
//     if (err) throw err;
// console.log("Number of records deleted: " ,result)
//   });
// });
