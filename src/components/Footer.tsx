import github from "../assets/github.svg"
import linkedin from "../assets/linkedin.svg"
import darkgithub from "../assets/darkergithub.svg"
import darklinkedin from "../assets/darkerlinkedin.svg"

import "../styles/Footer.sass";
import { useState } from "react";

function Footer() {
  const [git, SetGit] = useState(github)
  const [link, SetLink] = useState(linkedin)

  return (
    <footer>
      <div className="FooterContent">
        <span>Vitor Cesarino Marchese</span>
        <ul>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#53a8b2"
                viewBox="0 0 256 256"
              >
                <path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"></path>
              </svg>
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
        <ul>
          <li>
            <p className="title">Social</p>
          </li>
          <li>
            <a 
            href="https://github.com/VitorCesarinoMarchese" 
            target="_blank" 
            className="github" 
            onMouseEnter={()=>SetGit(darkgithub)} 
            onMouseLeave={()=>SetGit(github)}>
              <img src={git} alt="" />
            </a>
            <a
              href="https://www.linkedin.com/in/vitor-cesarino/"
              target="_blank"
              onMouseEnter={()=> SetLink(darklinkedin)}
              onMouseOut={()=> SetLink(linkedin)}
            >
              <img src={link} alt="" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
