import NavBar from "./components/NavBar/NavBar";
import FullStack from "./components/FullStack/FullStack";
import Sobre from "./components/Sobre/Sobre";
import Projetos from "./components/Projetos/Projetos";
import Footer from "./components/Footer/Footer";
import './styles/App.sass'

function App() {

  return (
    <div className="center">
      <NavBar />
      <div className="main">
        <FullStack />
        <Sobre />
        <Projetos />
      </div>
      <Footer />
    </div>
  )
}

export default App
