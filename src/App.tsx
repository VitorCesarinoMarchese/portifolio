import NavBar  from "./components/NavBar";
import FullStack from "./components/FullStack";
import Sobre from "./components/Sobre";
import './styles/App.sass'

function App() {

  return (
    <div className="center">
    <NavBar/>
    <div className="main">
      <FullStack/>
      <Sobre/>
    </div>
    </div>
  )
}

export default App
