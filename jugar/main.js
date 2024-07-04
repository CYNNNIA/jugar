import { Header } from '../src/components/Header/Header'
import { initMole } from '../src/pages/WackAMole/WackAMole'
import './style.css'

const divApp = document.querySelector('#app')
Header(divApp)

const divContent = document.createElement('div')

divContent.className = 'content'

divApp.append(divContent)

//lo siguiente es temporal y hay que borrarlo es para que salga todo el rato en pantalla el arcoiris al recargar la pagina para que sea mas facil trabajar
initMole()
