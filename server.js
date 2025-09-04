import express from "express";
import dotenv from "dotenv";

import dados from "./src/data/data.js";

const { bruxos, casas, varinhas, animais, pocoes } = dados;
const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3000;

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

  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
});

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
      success: false,
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
    success: true,
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

  varinhas.push(novaVarinha);

  res.status(201).json({
    success: true,
    message: "Nova varinha adicionada com sucesso!",
    data: novaVarinha,
  });
});

app.get("/stats", (req, res) => {
  // Contagem de bruxos por casa
  const bruxosPorCasa = {};
  for (const bruxo of bruxos) {
    if (!bruxosPorCasa[bruxo.casa]) {
      bruxosPorCasa[bruxo.casa] = 0;
    }
    bruxosPorCasa[bruxo.casa]++;
  }

  // Contagem de materiais de varinhas
  const materialCount = {};
  for (const v of varinhas) {
    if (v.material) {
      if (!materialCount[v.material]) {
        materialCount[v.material] = 0;
      }
      materialCount[v.material]++;
    }
  }

  // Descobrir o material mais comum
  let materialMaisComum = null;
  let qtdMaisComum = 0;

  for (const material in materialCount) {
    if (materialCount[material] > qtdMaisComum) {
      materialMaisComum = material;
      qtdMaisComum = materialCount[material];
    }
  }

  res.json({
    bruxosPorCasa,
    materialDeVarinhaMaisComum: materialMaisComum,
    quantidade: qtdMaisComum,
  });
});

app.listen(serverPort, () => {
  console.log(
    `O mundo de Harry esta rodando http://localhost:${serverPort} 🚀`
  );
});
