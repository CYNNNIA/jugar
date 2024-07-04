import './TresEnRaya.css'

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

  divContent.appendChild(container)

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
      alert('Empate!')
    } else {
      alert(`${oTurn ? "O's" : "X's"} gana!`)
    }
    startGame()
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

  restartButton.addEventListener('click', startGame)

  startGame()
}

// Inicia el juego cuando se carga el módulo
document.addEventListener('DOMContentLoaded', initTres)
