require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// rotas
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// rota base
app.get("/", (req, res) => {
  res.send("Rodando");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});