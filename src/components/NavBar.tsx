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
          className={active ? "none": "NavBtn"}
          onClick={() => SetActive(true)}
        >
          <img src={hamburguer} alt="menu" />
        </button>
        <button
          className={active ? "NavBtn": "none"}
          onClick={() => SetActive(false)}
        >
          <img src={fillhamburguer} />
        </button>
        <ul className={active ? "active": "none"}>
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
    </div>
  );
}

export default NavBar;
