import express from "express";
import dotenv from "dotenv";

import dados from "./src/data/data.js";
import res from "express/lib/response.js";
const { bruxos, casas, varinhas, animais, pocoes } = dados;
const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

// Query Parameters no Node.js - API de Hogwarts
app.get("/bruxos", (req, res) => {
  const { casa, ano, especialidade, nome, varinhas } = req.query;
  let resultado = bruxos;

  if (casa) {
    resultado = resultado.filter(
      (b) => b.casa.toLowerCase() === casa.toLowerCase()
    );
  }

  if (ano) {
    resultado = resultado.filter((b) => b.ano == ano);
  }

  if (especialidade) {
    resultado = resultado.filter((b) =>
      b.especialidade.toLowerCase().includes(especialidade.toLowerCase())
    );
  }

  if (nome) {
    resultado = resultado.filter((b) =>
      b.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }
  if (condition) {
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
});

// Rota principal GET para "/"
app.get("/varinhas", (req, res) => {
  const { material, nucleo } = req.query;
  let resultado = varinhas;

  if (material) {
    resultado = resultado.filter(
      (v) =>
        v.material && v.material.toLowerCase().includes(material.toLowerCase())
    );
  }

  if (nucleo) {
    resultado = resultado.filter(
      (v) => v.nucleo && v.nucleo.toLowerCase().includes(nucleo.toLowerCase())
    );
  }

  res.json(resultado);
});

app.get("/pocoes", (req, res) => {
  const { nome, efeito } = req.query;
  let resultado = pocoes;

  if (nome) {
    resultado = resultado.filter(
      (p) => p.nome && p.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  if (efeito) {
    resultado = resultado.filter(
      (p) => p.efeito && p.efeito.toLowerCase().includes(efeito.toLowerCase())
    );
  }

  res.json(resultado);
});
app.get("/animais", (req, res) => {
  const { tipo, nome } = req.query;
  let resultado = animais;

  if (tipo) {
    resultado = resultado.filter(
      (a) => a.tipo && a.tipo.toLowerCase().includes(tipo.toLowerCase())
    );
  }

  if (nome) {
    resultado = resultado.filter(
      (a) => a.nome && a.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  res.json(resultado);
});

app.post("/bruxos", (req, res) => {
  const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo } =
    req.body;

  if (!nome || !casa) {
    return res.status(400).json({
      sucess: false,
      message: "nome e casa são obrigatorios para um bruxo",
    });
  }
  const novoBruxo = {
    id: bruxos.length + 1,
    nome,
    casa,
    ano: parseInt(ano),
    patrono,
    especialidade: especialidade || "Ainda não atribuido",
    vivo: vivo,
  };
  bruxos.push(novoBruxo);

  res.status(201).json({
    sucess: true,
    message: "Novo bruxo adicionado a Hogwarts",
    data: novoBruxo,
  });
});
app.post("/varinhas", (req, res) => {
  const { material, nucleo, comprimento } = req.body;
  if (!material || !nucleo || !comprimento) {
    return res.status(400).json({
      success: false,
      message:
        "Material, núcleo e comprimento são obrigatórios para uma varinha",
    });
  }

  const novaVarinha = {
    id: varinhas.length + 1,
    material,
    nucleo,
    comprimento,
  };

  res.status(201).json({
    success: true,
    message: "Nova varinha adicionada com sucesso!",
    data: novaVarinha,
  });
});
app.listen(serverPort, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});
