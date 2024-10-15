import "../styles/Projetos.sass";

function Projeto({img, title, desc} :{img: string, title:string, desc: string}) {
  return (
    <>
      <div className="Projeto">
        <img src={img} alt="ColdeLabs" />
        <div className="Detalhes">
          <h3>{title}</h3>
          <p>
            {desc}
          </p>
          <span>Status</span>
          <p className="success">Concluido</p>
        </div>
      </div>
    </>
  );
}

export default Projeto;
