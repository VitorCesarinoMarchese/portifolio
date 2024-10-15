import "../styles/Projetos.sass";
import ColdeLabs from "../assets/ColdeLabs.png";
import Floricultura from "../assets/Floricultura.png";
import Projeto from "./Projeto";

function Projetos() {
  return (
    <div className="Projetos" id="Projetos">
      <h2>Meus Projetos</h2>

      <a href="https://coldelabs.web.app/" target="_blank">
      <Projeto
        img={ColdeLabs}
        title="coldelabs"
        desc="A Codelabs é uma plataforma educacional que torna o aprendizado de
        programação envolvente e acessível para crianças e professores,
        com metodologia comparativa e funcionalidades gamificadas."
      />
      </a>
      <a href="https://rosemarry-8b3cd.web.app/" className="mt" target="_blank">
        <Projeto 
        img={Floricultura}
        title="RoseMarry"
        desc="Um site em que utilizei sua criação para aprender o basico de como
        React e Sass funcionam, utilizando o react-router-dom para
        gerenciar as rotas."
        />
      </a>
    </div>
  );
}
export default Projetos;
