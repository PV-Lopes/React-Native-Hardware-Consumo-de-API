const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Criar usuário
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// Listar usuários
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
});

module.exports = router;
