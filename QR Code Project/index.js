/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
const askUrl=inquirer
  .prompt([
    {
        name:"url",
        message:"Enter the url whose qr-image is to generated",
        type:"input"
    }
   
  ])
  .then(function(answers){
    return answers.url;
  });
  const urlName= await askUrl;
  console.log(urlName);

  fs.writeFile("message.txt",urlName,(err)=>{
    if(err) throw err;
    console.log("File Created with provided URL");
  })

  let qr_png = qr.image(urlName, { type: 'png' , parse_url:true });
  qr_png.pipe(fs.createWriteStream('qr-image.png'));


 
