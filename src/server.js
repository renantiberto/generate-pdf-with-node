const express = require('express');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');
const app = express();

const passengers = [
  {
    name: "Alana",
    flightNumber: 7890,
    time: "18h00",
  },
  {
    name: "Joyce",
    flightNumber: 7891,
    time: "19h15",
  },
  {
    name: "Diego",
    flightNumber: 7892,
    time: "18h00",
  },
  {
    name: "Mayk",
    flightNumber: 7893,
    time: "18h30",
  },
]

app.get('/pdf', async(request, response) => {
  const browser = await puppeteer.launch({
    headless: "new",
    ignoreDefaultArgs: [
      '--disable-extensions'
    ],
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox'
    ]
  });
  
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/', {
    waitUntil: 'networkidle0'
  });

  // Configurar/Gerar o PDF
  const pdf = await page.pdf({
    printBackground: true,
    format: 'LETTER',
    margin: {
      top: '20px',
      right: '40px',
      bottom: '20px',
      left: '20px'
    }
  });

  // Fechar o browser
  await browser.close();

  response.contentType('application/pdf');

  return response.send(pdf);
});

app.get('/', (request, response) => {
  const filePath = path.join(__dirname, "print.ejs");
  
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) {
      return response.send("Erro no caminho do arquivo.");
    }

    // Enviar para o navegador
    return response.send(html);
  })
});

app.listen(3000);
