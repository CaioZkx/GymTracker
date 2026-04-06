import { useState } from "react";
import ky from "ky";
import { useNavigate } from "react-router-dom";
import "./login.css";

const api = ky.create({
  prefixUrl: "http://localhost:3000"
});

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("register", {
        json: { email, password }
      });

      alert("Conta criada!");
      navigate("/");
    } catch {
      alert("Erro ao criar conta");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Criar Conta</h1>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Registrar</button>

        <p className="link">
          Já tem conta?{" "}
          <span onClick={() => navigate("/")}>
            Fazer login
          </span>
        </p>
      </div>
    </div>
  );
}