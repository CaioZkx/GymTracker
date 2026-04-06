import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">

      {/* TOPO */}
      <div className="topbar">
        <h2>Bem vindo, Usuário</h2>
        <div className="profile"></div>
      </div>

      {/* CONTEÚDO */}
      <div className="content">

        {/* MENU LATERAL */}
        <div className="sidebar">
          <div className="menu-item">Meus treinos</div>
          <div className="menu-item">Meu desempenho</div>
          <div className="menu-item">Adicionar treino</div>
        </div>

        {/* ÁREA PRINCIPAL */}
        <div className="main">

          <div className="treino-header">
            treino 1
          </div>

          <div className="dias">
            <div className="dia">segunda</div>
            <div className="dia">terça</div>
            <div className="dia">quarta</div>
            <div className="dia">quinta</div>
            <div className="dia">sexta</div>
            <div className="dia">sábado</div>
          </div>

        </div>
      </div>

    </div>
  );
}