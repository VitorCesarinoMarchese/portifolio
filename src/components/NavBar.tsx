import '../styles/NavBar.sass'

function NavBar(){
    return(
        <div className='nav'>
            <nav>
                <span>Vitor Cesarino Marchese</span>
                    <ul>
                        <li><a href="#Sobre">Sobre</a></li>
                        <li><a href="#Projetos">Meus Projetos</a></li>
                        <li><a href="#Contatos">Contatos</a></li>
                    </ul>
            </nav>
        </div>
    )
}

export default NavBar