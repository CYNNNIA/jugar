import { Header } from '../src/components/Header/Header'
import './style.css'

const divApp = document.querySelector('#app')
Header(divApp)

const divContent = document.createElement('div')

divContent.className = 'content'

divApp.append(divContent)
