import "../styles/Projetos.sass";
import ColdeLabs from "../assets/ColdeLabs.png";
import Floricultura from "../assets/Floricultura.png";

function Projetos() {
  return (
    <div className="Projetos" id="Projetos">
      <h2>Meus Projetos</h2>
      <a href="https://coldelabs.com/" target="_blank">
        <div className="Projeto">
          <img src={ColdeLabs} alt="ColdeLabs" />
          <div className="Detalhes">
            <h3>ColdeLabs</h3>
            <p>
              A Codelabs é uma plataforma educacional que torna o aprendizado de
              programação envolvente e acessível para crianças e professores,
              com metodologia comparativa e funcionalidades gamificadas.
            </p>
            <span>Status</span>
            <p className="success">Concluido</p>
          </div>
        </div>
      </a>
      <a href="https://rosemarry-8b3cd.web.app/" target="_blank">
        <div className="Projeto mt">
          <img src={Floricultura} alt="Floricultura"/>
          <div className="Detalhes">
            <h3>RoseMarry</h3>
            <p>
              Um site em que utilizei sua criacao para aprender o basico de como
              React e Sass funcionam, utilizando o react-router-dom para
              gerenciar as rotas.
            </p>
            <span>Status</span>
            <p className="success">Concluido</p>
          </div>
        </div>
      </a>
    </div>
  );
}
export default Projetos;
