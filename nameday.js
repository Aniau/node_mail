var mysql = require("mysql");
var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var con = mysql.createConnection({
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

con.connect(pobranie = function (error){
  con.query("SET NAMES utf8mb4");
  con.query("SELECT mail, family_id, family_id_2, CONCAT(name,' ',lastname) AS name, date FROM 00062688_ania.nameday WHERE date = DATE_FORMAT(NOW(), '%d-%m')",
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
        for (let row in rows) {
          var name = rows[row].name;
          let mail = rows[row].mail;
          var family_id = rows[row].family_id;
          var family_id_2 = rows[row].family_id_2;
          var title = 'Alert imieninowy !!!';
          var mail_message = 'Dziś są imieniny: '+name+ "\r\n"+ 'Nie zapomnij złożyć życzeń!!!';
          var mail_message_html = '<img src="cid:name@day.jpg" style="height:20%;width:20%" alt="nameday"/><p style="font-size:120%;font-family:Arial Black">Dziś są imieniny: </p>' + '<p style="font-size:200%;color:#ad75ad;font-family:Arial Black"><b>' + name + '</b></p>' + '<p style="font-size:140%;font-family:Arial Black"><b>Nie zapomnij złożyć życzeń!!!</b></p>';
  
          // wysłanie maila
          var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: '587',
            service: 'Gmail',
            auth: {
              user: 'ania.ulanecka@gmail.com',
              pass: 'Pingwin14@'
            }
          });

          if (family_id_2 !== null) {
            query = "SELECT mail FROM 00062688_ania.nameday WHERE mail IS NOT NULL AND (family_id IN (" + family_id + "," + family_id_2 + ") OR family_id_2 IN ( " + family_id + "," + family_id_2 + "))";
          }
          else {
            query = "SELECT mail FROM 00062688_ania.nameday WHERE mail IS NOT NULL AND (family_id = " + family_id + " OR family_id_2 = " + family_id + ")";
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
                  from: 'ania.ulanecka@gmail.com',
                  to: ['ania.ulanecka@gmail.com', 'mulanecka@gmail.com', 'ola.ulanecka@gmail.com', 'noflyno@gmail.com', 'michal.p.kaczynski@gmail.com', 'sebastianno.cc@gmail.com'],
                  subject: title,
                  text: mail_message,
                  html: mail_message_html,
                  attachments: [{
                    filename: 'nameday.jpg',
                    path: __dirname + '/nameday.jpg',
                    cid: 'name@day.jpg'
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
              });
        }
      }
    });
});