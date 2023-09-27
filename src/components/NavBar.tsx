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
        <button
          style={{ display: active ? "none" : "flex" }}
          className="NavBtn"
          onClick={() => SetActive(true)}
        >
          <img src={hamburguer} alt="menu" />
        </button>
        <button
          style={{ display: active ? "flex" : "none" }}
          onClick={() => SetActive(false)}
        >
          <img src={fillhamburguer} />
        </button>
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
      </nav>
      <ul className="menu" style={{ left: active ? "0px" : "100000px" }}>
        <li></li>
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
