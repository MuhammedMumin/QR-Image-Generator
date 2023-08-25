import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

function generateQRCode(url, filename) {
  const qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream(filename));
}

inquirer
.prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    const qrFilename = `qr-${Date.now()}.png`;

    generateQRCode(url, qrFilename);

    fs.appendFile('URL.txt', url + '\n', (err) => {
      if (err) throw err;
      console.log('The URL has been added to URL.txt');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong");
    }
  });
