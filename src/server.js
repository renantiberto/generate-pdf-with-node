const express = require('express');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');
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

app.get('/', (request, response) => {
  const filePath = path.join(__dirname, "print.ejs");
  
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) {
      return response.send("Erro no caminho do arquivo.");
    }

    // Configurações da página
    const options = {
      height: "11.25in",
      width: "8.5in",
      header: {
        height: "20mm"
      },
      footer: {
        height: "20mm",
      }
    }

    // Gerar o PDF
    pdf.create(html, options).toFile("report.pdf", (err, data) => {
      if (err) {
        return response.send("Erro ao gerar o PDF.");
      }
      // Enviar para o navegador
      //return response.send("Arquivo gerado com sucesso!");
      return response.send(html);
    });
  })
});

app.listen(3000);
