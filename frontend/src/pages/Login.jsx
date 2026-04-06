import { useState } from "react";
import ky from "ky";
import { useNavigate } from "react-router-dom";
import "./login.css";

const api = ky.create({
  prefixUrl: "http://localhost:3000"
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await api.post("login", {
        json: { email, password }
      }).json();

      alert("Login feito!");
    } catch {
      alert("Erro no login");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Gym Tracker</h1>

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

        <button onClick={handleLogin}>Entrar</button>

        <p className="link">
          Não tem conta?{" "}
          <span onClick={() => navigate("/register")}>
            Criar conta
          </span>
        </p>
      </div>
    </div>
  );
}