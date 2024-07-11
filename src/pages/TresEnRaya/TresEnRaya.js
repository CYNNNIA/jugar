import './TresEnRaya.css'
import {
  showMainMenu,
  loadScores
} from '/Users/cynn/Desktop/jugar/jugar/main.js'

export const initTres = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  const container = document.createElement('div')
  container.classList.add('container')

  const title = document.createElement('h1')
  title.textContent = 'Tres en Raya'
  container.appendChild(title)

  const board = document.createElement('div')
  board.id = 'board'
  container.appendChild(board)

  const restartButton = document.createElement('button')
  restartButton.id = 'restartButton'
  restartButton.textContent = 'Reiniciar Juego'
  container.appendChild(restartButton)

  const homeButton = document.createElement('button')
  homeButton.textContent = 'Inicio'
  homeButton.className = 'home-button'
  homeButton.addEventListener('click', () => {
    document.querySelector('.content').innerHTML = ''
    showMainMenu()
  })
  container.appendChild(homeButton)

  const scores = loadScores()
  const scoreDisplayX = document.createElement('p')
  scoreDisplayX.className = 'score-display'
  scoreDisplayX.textContent = `Puntuación X: ${scores.tresEnRayaX}`

  const scoreDisplayO = document.createElement('p')
  scoreDisplayO.className = 'score-display'
  scoreDisplayO.textContent = `Puntuación O: ${scores.tresEnRayaO}`

  container.appendChild(scoreDisplayX)
  container.appendChild(scoreDisplayO)

  divContent.appendChild(container)

  const modal = document.createElement('div')
  modal.id = 'game-over-modal'
  modal.classList.add('modal')
  modal.innerHTML = `
    <div class="modal-content">
      <p id="game-over-message"></p>
      <button id="modal-restart-button" class="modal-button">Volver a jugar</button>
    </div>
  `
  divContent.appendChild(modal)

  const X_CLASS = 'x'
  const O_CLASS = 'o'
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  let oTurn
  let cellElements = []

  function startGame() {
    oTurn = false
    board.innerHTML = ''
    cellElements = []
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.addEventListener('click', handleClick, { once: true })
      board.appendChild(cell)
      cellElements.push(cell)
    }
  }

  function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
      setTimeout(() => endGame(false), 50)
    } else if (isDraw()) {
      setTimeout(() => endGame(true), 50)
    } else {
      swapTurns()
    }
  }

  function endGame(draw) {
    if (draw) {
      showModal('¡Empate!')
    } else {
      showModal(`¡${oTurn ? 'O' : 'X'} gana!`)
      updateScore(oTurn ? 'o' : 'x')
    }
  }

  function isDraw() {
    return cellElements.every((cell) => {
      return (
        cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
      )
    })
  }

  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
  }

  function swapTurns() {
    oTurn = !oTurn
  }

  function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return cellElements[index].classList.contains(currentClass)
      })
    })
  }

  function updateScore(winner) {
    const scores = loadScores()
    if (winner === 'x') {
      scores.tresEnRayaX += 1
      localStorage.setItem('tresEnRayaXScore', scores.tresEnRayaX)
      scoreDisplayX.textContent = `Puntuación X: ${scores.tresEnRayaX}`
    } else {
      scores.tresEnRayaO += 1
      localStorage.setItem('tresEnRayaOScore', scores.tresEnRayaO)
      scoreDisplayO.textContent = `Puntuación O: ${scores.tresEnRayaO}`
    }
  }

  function showModal(message) {
    const modal = document.getElementById('game-over-modal')
    const messageElement = document.getElementById('game-over-message')
    const restartButton = document.getElementById('modal-restart-button')

    messageElement.textContent = message
    modal.style.display = 'flex'

    restartButton.onclick = function () {
      modal.style.display = 'none'
      startGame()
    }

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none'
        startGame()
      }
    }
  }

  restartButton.addEventListener('click', startGame)

  startGame()
}

// Inicia el juego cuando se carga el módulo
document.addEventListener('DOMContentLoaded', initTres)
