import '../styles/NavBar.sass'

function NavBar(){
    return(
        <div className='nav'>
            <nav>
                <h1>Vitor Cesarino Marchese</h1>
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