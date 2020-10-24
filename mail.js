var nodemailer = require('nodemailer');
var express = require('express');
const result = require('./server.js');

var app = express();

console.log(result.pobranie());

//var nazwa = pobranieDanych.nazwa;
//var data = pobranieDanych.data;
//ustawienie biezacej daty
var d = Date.now();
var data_teraz = new Date(d);
var dzien = ("0" + (data_teraz.getDate())).slice(-2);
var miesiac = ("0" + (data_teraz.getMonth()+1)).slice(-2);

if(miesiac.length == 1)
{
    miesiac = "0" + miesiac;
}

var data_teraz = dzien + '-' + miesiac;

var tytul = null;

if(data_teraz == )
{
  tytul = 'data dzisiejsza';
}
else {
  tytul = 'nie dzisiejsza data';
}

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

var mailOption = {
  from: 'ania.ulanecka@gmail.com',
  to: 'ania.ulanecka@gmail.com',
  subject: tytul,
  text: 'Dzisiaj jest dzień wyznawania miłości: '+ date
};

transporter.sendMail(mailOption, (error,info)=>
{
  if(!!error){
    console.log('error z wyslaniem maila:' + error);
  }
  else {
    console.log('mail zostal wyslany: ' + info);
  }
});
