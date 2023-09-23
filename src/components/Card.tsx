import backend from '../assets/backend.svg'
import go from '../assets/go.svg'
import sqlite from '../assets/sqlite.svg'
import git from '../assets/git.svg'
import gorm from '../assets/gorm.svg'
import fiber from '../assets/fiber.svg'

import frontend from '../assets/frontend.svg'
import html from '../assets/hmtl.svg'
import css from '../assets/css.svg'
import ts from '../assets/ts.svg'
import react from '../assets/react.svg'
import sass from '../assets/sass.svg'
import tailwind from '../assets/tailwind.svg'
import vite from '../assets/vite.svg'




import '../styles/Card.sass'

function Card(){
    return(
        <div className='row'>
            <div className='card'>
                <img src={backend} alt="" className='icon'/>
                <h2>Backend</h2>
                <p>Gosto de resolver problemas que envolvem logica</p>

                <h2>Linguanges Familiares</h2>
                <img src={go} alt="" className='go'/>

                <h2>Dev Tools</h2>
                <ul>
                    <li><img src={sqlite} alt="" /></li>
                    <li><img src={git} alt="" /></li>
                    <li><img src={gorm} alt="" /></li>
                    <li><img src={fiber} alt="" /></li>
                </ul>
            </div>
            <div className='card'>
                <img src={frontend} alt="" className='icon'/>
                <h2>Frontend</h2>
                <p>Gosto de transformar ideias em realidade usando codigo</p>

                <h2>Linguanges Familiares</h2>
                <div className='linguagens'>
                    <img src={html} alt="" />
                    <img src={css} alt="" />
                    <img src={ts} alt="" />
                </div>

                <h2>Dev Tools</h2>
                <ul>
                    <li><img src={react} alt="" /></li>
                    <li><img src={sass} alt="" /></li>
                    <li><img src={tailwind} alt="" /></li>
                    <li><img src={vite} alt="" /></li>
                </ul>
            </div>
        </div>
    )
}
export default Card