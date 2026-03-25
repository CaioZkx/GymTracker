require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");

const app = express();
app.use(express.json());

const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "gym",
    password: "4436",
    port: 5432,
});

app.get("/", (req, res) => {
    res.send("Rodando");
})

app.post("/register", async (req, res) => {
    const {email, password} = req.body;

    try {
        if(!email || !password){
            return res.status(400).json({error: "Dados faltando"});
        }

        const userExist = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userExist.rows.length > 0){
            return res.status(400).json({error: "usuario ja existe"});
        }

        const crypPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, crypPassword]
        );

        res.send("Usuario criado com sucesso");
    } catch(err){
        console.log(err);
        res.status(500).send("Erro ao criar usuario");
    }
});

app.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || ! password){
            return res.status(400).json({error: "dados faltando"})
        }

        const userResult = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if(userResult.rows.length === 0){
            return res.status(400).json({error: "Usuario inexistente"});
        }

        const user = userResult.rows[0];

        if(!user.password){
            return res.status(500).json({error: "Senha nao encontrada no banco"});
        }
        
        const validPassword = await bcrypt.compare(password, user.password);

        

        if(!validPassword){
            return res.status(400).json({error: "Senha incorreta"})
        }

        const token = jwt.sign(
              { userId: user.id},
              process.env.JWT_SECRET,
              { expiresIn: "7d" }
        );

        res.json({
            message: "login com sucesso",
            token
        });

    } catch(err){
        console.log(err);
        res.status(500).send("Erro interno");
    }

});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})
