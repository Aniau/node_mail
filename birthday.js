var mysql = require("mysql");
var nodemailer = require('nodemailer');
var express = require('express');
const utf8 = require('utf8');
var app = express();
const {StringDecoder} = require("string_decoder");
const decoder = new StringDecoder('utf8');
const uffer = require("buffer");
//var mail = require('./mail.js');
var port = 3306;
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

con.connect(function (error){
  con.query("SET NAMES utf8mb4");
  con.query("SELECT family_id, family_id_2, CONCAT(name,'-', lastname) AS name, YEAR(CURDATE())-substring(date_of_birth, 7) as age, CONCAT(day,'-',month) AS data FROM 00062688_ania.birthday WHERE (CONCAT(day,'-',month)) = DATE_FORMAT(NOW(), '%d-%m')",
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
        var name = rows[0].name;
        var data = rows[0].data;
        var family_id = rows[0].family_id;
        var family_id_2 = rows[0].family_id_2;
        var age = rows[0].age;
        var title = 'Alert urodzinowy !!!';
        var mail_message = 'Dziś są urodziny: ' + name + "\r\n" + 'Kończy dzisiaj -> ' + "\r\n" + age + ' lata' + "\r\n" + 'Nie zapomnij złożyć życzeń!!!';
        var mail_message_html = '<img src="cid:birth@day.jpg" alt="birthday"/><p style="font-size:120%;font-family:Arial Black">Dziś są urodziny: </p>' + '<p style="font-size:200%;color:#ad75ad;font-family:Arial Black"><b>' + name + '</b></p>' + '<p style="font-size:120%;font-family:Arial Black">Kończy dzisiaj: </p>' + '<p style="font-size:200%;color:#ad75ad;font-family:Arial Black"><b>' + age + ' lata</b></p>' + '<p style="font-size:140%;font-family:Arial Black"><b>Nie zapomnij złożyć życzeń!!!</b></p>';
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
      if(family_id == 1 || family_id_2 == 1)
        {
          var mailOption = {
            from: 'ania.ulanecka@gmail.com',
            to: 'ania.ulanecka@gmail.com',
            //['ania.ulanecka@gmail.com', 'mulanecka@gmail.com', 'ola.ulanecka@gmail.com', 'noflyno@gmail.com', 'michal.p.kaczynski@gmail.com'],
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
        /*if(family_id == 2 || family_id_2 == 2)
        {
          var mailOption = {
            from: 'ania.ulanecka@gmail.com',
            to: ['ania.ulanecka@gmail.com', 'noflyno@gmail.com'],
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
      if(family_id == 3 || family_id_2 == 3)
        {
          var mailOption = {
            from: 'ania.ulanecka@gmail.com',
            to: ['mulanecka@gmail.com', 'michal.p.kaczynski@gmail.com'],
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
        }*/
      }
    });
});


//f8IyaYM1
