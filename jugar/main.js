import { Header } from '../src/components/Header/Header'
import './style.css'

const divApp = document.querySelector('#app')

export const loadScores = () => {
  return {
    snake: parseInt(localStorage.getItem('snakeScore')) || 0,
    tresEnRayaX: parseInt(localStorage.getItem('tresEnRayaXScore')) || 0,
    tresEnRayaO: parseInt(localStorage.getItem('tresEnRayaOScore')) || 0,
    wackAMole: parseInt(localStorage.getItem('wackAMoleScore')) || 0
  }
}

export const showMainMenu = () => {
  const divContent = document.createElement('div')
  divContent.className = 'content'

  const title = document.createElement('h1')
  title.textContent = 'Los juegos de Cynn'
  title.className = 'main-title'

  const scores = loadScores()
  const scoreDisplay = document.createElement('p')
  scoreDisplay.className = 'score-display'
  scoreDisplay.innerHTML = `
    Puntuación Snake: ${scores.snake} <br>
    Puntuación Tres en Raya X: ${scores.tresEnRayaX} <br>
    Puntuación Tres en Raya O: ${scores.tresEnRayaO} <br>
    Puntuación Whack a Mole: ${scores.wackAMole}
  `

  divContent.appendChild(title)
  divContent.appendChild(scoreDisplay)
  divApp.innerHTML = '' // Clear existing content
  divApp.appendChild(divContent)

  if (!document.querySelector('header')) {
    Header(divApp)
  }
}

document.addEventListener('DOMContentLoaded', showMainMenu)
