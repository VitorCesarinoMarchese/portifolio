import { useState } from "react";
import hamburguer from "../assets/hamburguer.svg";
import fillhamburguer from "../assets/fillhamburguer.svg";
import "../styles/NavBar.sass";

function NavBar() {
  const [active, SetActive] = useState(false);
  return (
    <div className="nav">
      <nav>
        <span>Vitor Cesarino Marchese</span>
        <ul>
          <li>
            <a href="#Sobre">Sobre</a>
          </li>
          <li>
            <a href="#Projetos">Meus Projetos</a>
          </li>
          <li>
            <a href="#Contatos">Contatos</a>
          </li>
        </ul>
        <button
          className={active ? "none": "NavBtn"}
          onClick={() => SetActive(true)}
        >
          <img src={hamburguer} alt="menu" />
        </button>
        <button
          className={active ? "active": "none"}
          onClick={() => SetActive(false)}
        >
          <img src={fillhamburguer} />
        </button>
      </nav>
      <ul className={active ? "menu": "none"} >
        <li>
          <a href="#Sobre">Sobre</a>
        </li>
        <li>
          <a href="#Projetos">Meus Projetos</a>
        </li>
        <li>
          <a href="#Contatos">Contatos</a>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
