import NavBar  from "./components/NavBar";
import FullStack from "./components/FullStack";
import Sobre from "./components/Sobre";
import Projetos from "./components/Projetos";
import Footer from "./components/Footer";
import './styles/App.sass'

function App() {

  return (
    <div className="center">
    <NavBar/>
    <div className="main">
      <FullStack/>
      <Sobre/>
      <Projetos/>
    </div>
      <Footer/>
    </div>
  )
}

export default App
