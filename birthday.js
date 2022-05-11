let mysql = require("mysql");
let nodemailer = require('nodemailer');
let express = require('express');
let app = express();
let sender = 'ania.ulanecka@gmail.com';
let con = mysql.createConnection({
  host: "az-serwer1749470.online.pro",
  user: "00062688_ania",
  password: "f8IyaYM1",
  database: "00062688_ania",
  port: "3306",
  charset: "UTF8MB4_POLISH_CI"
});

con.connect((error) =>
{
  if(!!error)
  {
    console.log('błąd połączenia z bazą' + error);
    return;
  }
  else {
    console.log('Połączenie uzyskane');
  }
});

con.connect(function (error){
  con.query("SET NAMES utf8mb4");
  con.query("SELECT mail, family_id, family_id_2, CONCAT(name,'-', lastname) AS name, YEAR(CURDATE())-substring(date_of_birth, 7) AS age FROM 00062688_ania.birthday WHERE LEFT(date_of_birth, 5) = DATE_FORMAT(NOW(), '%d-%m')",
    function dane(error, rows, fields)
    {
      if(!!error)
      {
        console.log('Error pobrania danych' + error);
      }
      else if (rows.length <= 0)
      {
        console.log('brak danych');
      }
      else if (rows.length >= 1)
      {
        console.log('SUCCESS');
        for(let row in rows) {
          let name = rows[row].name;
          let mail = rows[row].mail;
          let family_id = rows[row].family_id;
          let family_id_2 = rows[row].family_id_2;
          let age = rows[row].age;
          let title = 'Alert urodzinowy !!!';
          let mail_message = 'Dziś są urodziny: ' + name + "\r\n" + 'Kończy dzisiaj -> ' + "\r\n" + age + ' lata' + "\r\n" + 'Nie zapomnij złożyć życzeń!!!';
          let mail_message_html = '<img src="cid:birth@day.jpg" alt="birthday"/><p style="font-size:120%;font-family:Arial Black">Dziś są urodziny: </p>' + '<p style="font-size:200%;color:#ad75ad;font-family:Arial Black"><b>' + name + '</b></p>' + '<p style="font-size:120%;font-family:Arial Black">Kończy dzisiaj: </p>' + '<p style="font-size:200%;color:#ad75ad;font-family:Arial Black"><b>' + age + ' lata</b></p>' + '<p style="font-size:140%;font-family:Arial Black"><b>Nie zapomnij złożyć życzeń!!!</b></p>';
          
          // wysłanie maila
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: '587',
            service: 'Gmail',
            auth: {
              user: sender,
              pass: 'Pingwin14@'
            }
          });

          if (family_id_2 !== null) {
            query = "SELECT mail FROM 00062688_ania.birthday WHERE mail IS NOT NULL AND (family_id IN (" + family_id + "," + family_id_2 + ") OR family_id_2 IN ( " + family_id + "," + family_id_2 + "))";
          }
          else {
            query = "SELECT mail FROM 00062688_ania.birthday WHERE mail IS NOT NULL AND (family_id = " + family_id + " OR family_id_2 = " + family_id + ")";
          }
          con.query(query,
          function dane(error, rows, fields)
            {
              let mails = [];
              if(error) console.log("error loading emails");
              else if(rows.length >= 1) {
                for (let row in rows) {
                  if(rows[row].mail !== mail) mails.push(rows[row].mail);
                }
              }
               let mailOption = {
                 from: sender,
                 to: mails,
                 subject: title,
                 text: mail_message,
                 html: mail_message_html,
                 attachments: [{
                   filename: 'birthday.jpg',
                   path: __dirname + '/birthday.jpg',
                   cid: 'birth@day.jpg'
                 }]
               };

              transporter.sendMail(mailOption, (error,info)=>
              {
                if(!!error){
                  console.log('ERROR z wysŁaniem maila:' + error);
                }
                else {
                  console.log('Mail został wysłany: ' + info);
                }
              });
            }
          );
        }
      }
    });
});