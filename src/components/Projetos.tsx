import "../styles/Projetos.sass";
import ToGoApp from "../assets/ToGoApp.png";
import Floricultura from "../assets/Floricultura.png";

function Projetos() {
  return (
    <div className="Projetos" id="Projetos">
      <h2>Meus Projetos</h2>
      <div className="Projeto">
        <img src={ToGoApp} alt="" />
        <div className="Detalhes">
          <h3>ToGoApp</h3>
          <p>
            Um site com uma To do list que utilizei para aprender o
            funcionamento de um CRUD{"(create, read, update)"} na linguagem GO,
            alem de aprender a implementar meu backend com fron-end.
          </p>
          <span>Status</span>
          <p className="danger">Em desenvolvimento</p>
        </div>
      </div>
      <div className="Projeto mt">
        <img src={Floricultura} alt="" />
        <div className="Detalhes">
          <h3>RoseMarry</h3>
          <p>
            Um site em que utilizei sua criacao para aprender o basico de como
            React e Sass funcionam, utilizando o react-router-dom para gerenciar
            as rotas.
          </p>
          <span>Status</span>
          <p className="success">Concluido</p>
        </div>
      </div>
    </div>
  );
}
export default Projetos;
