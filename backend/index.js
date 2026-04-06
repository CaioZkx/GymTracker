require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// ✅ CORS configurado corretamente
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// ✅ Conexão com PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gym",
  password: "4436",
  port: 5432,
});

// ✅ Rota base
app.get("/", (req, res) => {
  res.send("Rodando");
});

// ✅ REGISTER
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Dados faltando" });
    }

    const userExist = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashPassword]
    );

    res.json({ message: "Usuário criado com sucesso" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// ✅ LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN BATENDO:", req.body); // debug

    if (!email || !password) {
      return res.status(400).json({ error: "Dados faltando" });
    }

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Usuário inexistente" });
    }

    const user = userResult.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login com sucesso",
      token
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro interno" });
  }
});

// ✅ START SERVER
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});