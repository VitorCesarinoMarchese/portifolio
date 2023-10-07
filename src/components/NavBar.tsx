import { useState } from "react";
import { Hamburger } from "@phosphor-icons/react";

import "../styles/NavBar.sass";

function NavBar() {
  const [active, SetActive] = useState(false);
  return (
    <div className="nav">
      <nav>
        <span>Vitor Cesarino Marchese</span>
        <button
          className={active ? "none" : "NavBtn"}
          onClick={() => SetActive(true)}
        >
          <Hamburger size={32} color="#53a8b2" />{" "}
        </button>
        <button
          className={active ? "NavBtn" : "none"}
          onClick={() => SetActive(false)}
        >
          <Hamburger size={32} color="#53a8b2" weight="fill" />{" "}
        </button>
        <ul className={active ? "active" : "none"}>
          <li>
            <a href="#Sobre" onClick={() => SetActive(false)}>
              Sobre
            </a>
          </li>
          <li>
            <a href="#Projetos" onClick={() => SetActive(false)}>
              Meus Projetos
            </a>
          </li>
          <li>
            <a href="#Contatos" onClick={() => SetActive(false)}>
              Contatos
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
