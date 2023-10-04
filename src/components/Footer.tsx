import { GithubLogo, LinkedinLogo, CaretUp } from "phosphor-react";
import "../styles/Footer.sass";

function Footer() {
  return (
    <footer>
      <div className="FooterContent">
        <span>Vitor Cesarino Marchese</span>
        <ul className="navegacao-container">
          <li>
            <p className="title">Navegacao</p>
          </li>
          <li>
            <a href="#Sobre">Sobre</a>
          </li>
          <li>
            <a href="#Projetos">Meus Projetos</a>
          </li>
          <li>
            <a href="#">
              <CaretUp size={32} color="#53a8b2" />
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <p className="title" id="Contatos">
              Contatos
            </p>
          </li>
          <li className="row">
            <p className="opacity">Telefone:</p> <p>{"(11)"} 98755-1050</p>
          </li>
          <li className="row">
            <p className="opacity">Email:</p>
            <p>vitorcesarino1@gmail.com</p>
          </li>
        </ul>
        <ul className="social-container">
          <li>
            <p className="title">Social</p>
          </li>
          <li>
            <a
              href="https://github.com/VitorCesarinoMarchese"
              target="_blank"
              className="github"
            >
              <GithubLogo size={32} color="#53A8B2" />
            </a>
            <a
              href="https://www.linkedin.com/in/vitor-cesarino/"
              target="_blank"
            >
              <LinkedinLogo size={32} color="#53A8B2" weight="fill"/>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
