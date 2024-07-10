import './Snake.css'
import {
  showMainMenu,
  loadScores
} from '/Users/cynn/Desktop/jugar/jugar/main.js'

const GRID_SIZE = 20
let snake = [{ x: 10, y: 10 }]
let direction = { x: 0, y: 0 }
let apple = { x: 15, y: 15 }
let gameActive = false
let score = 0
let speed = 200 // Initial speed in milliseconds

const loadScore = () => {
  const scores = loadScores()
  return scores.snake
}

const saveScore = (newScore) => {
  const scores = loadScores()
  scores.snake += newScore
  localStorage.setItem('snakeScore', scores.snake)
}

export const initSnake = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  const container = document.createElement('div')
  container.classList.add('container')

  const title = document.createElement('h1')
  title.textContent = 'Snake'
  container.appendChild(title)

  const gameBoard = document.createElement('div')
  gameBoard.id = 'gameBoard'
  container.appendChild(gameBoard)

  const startButton = document.createElement('button')
  startButton.id = 'startButton'
  startButton.textContent = 'Empezar a jugar'
  container.appendChild(startButton)

  const homeButton = document.createElement('button')
  homeButton.textContent = 'Inicio'
  homeButton.className = 'home-button'
  homeButton.addEventListener('click', () => {
    document.querySelector('.content').innerHTML = ''
    showMainMenu()
  })
  container.appendChild(homeButton)

  const scoreDisplay = document.createElement('p')
  scoreDisplay.className = 'score-display'
  scoreDisplay.textContent = `Puntuación: ${loadScore()}`
  container.appendChild(scoreDisplay)

  const controlsContainer = document.createElement('div')
  controlsContainer.className = 'controls-container'

  const upButton = document.createElement('button')
  upButton.className = 'control-button'
  upButton.textContent = '↑'
  upButton.addEventListener('click', () => changeDirection({ key: 'ArrowUp' }))

  const downButton = document.createElement('button')
  downButton.className = 'control-button'
  downButton.textContent = '↓'
  downButton.addEventListener('click', () =>
    changeDirection({ key: 'ArrowDown' })
  )

  const leftButton = document.createElement('button')
  leftButton.className = 'control-button'
  leftButton.textContent = '←'
  leftButton.addEventListener('click', () =>
    changeDirection({ key: 'ArrowLeft' })
  )

  const rightButton = document.createElement('button')
  rightButton.className = 'control-button'
  rightButton.textContent = '→'
  rightButton.addEventListener('click', () =>
    changeDirection({ key: 'ArrowRight' })
  )

  const controlPad = document.createElement('div')
  controlPad.className = 'control-pad'
  controlPad.appendChild(upButton)
  controlPad.appendChild(leftButton)
  controlPad.appendChild(downButton)
  controlPad.appendChild(rightButton)

  controlsContainer.appendChild(controlPad)
  container.appendChild(controlsContainer)

  divContent.appendChild(container)

  // Modal setup
  const modal = document.createElement('div')
  modal.id = 'game-over-modal'
  modal.classList.add('modal')
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <p id="game-over-message"></p>
      <button id="modal-restart-button" class="modal-button">Reiniciar Juego</button>
    </div>
  `
  divContent.appendChild(modal)

  document.addEventListener('keydown', changeDirection)
  startButton.addEventListener('click', startGame)

  function startGame() {
    gameActive = true
    snake = [{ x: 10, y: 10 }]
    direction = { x: 0, y: 0 }
    apple = { x: 15, y: 15 }
    score = 0
    speed = 200 // Reset speed at the start of the game
    gameLoop()
  }

  function gameLoop() {
    if (!gameActive) return
    setTimeout(() => {
      clearBoard()
      moveSnake()
      drawSnake()
      drawApple()
      if (checkCollision()) {
        gameActive = false
        saveScore(score)
        mostrarMensaje(`Game Over! Puntuación: ${score}`)
      } else {
        gameLoop()
      }
    }, speed)
  }

  function clearBoard() {
    gameBoard.innerHTML = ''
  }

  function drawSnake() {
    snake.forEach((segment) => {
      const snakeElement = document.createElement('div')
      snakeElement.style.gridRowStart = segment.y
      snakeElement.style.gridColumnStart = segment.x
      snakeElement.classList.add('snake')
      gameBoard.appendChild(snakeElement)
    })
  }

  function drawApple() {
    const appleElement = document.createElement('div')
    appleElement.style.gridRowStart = apple.y
    appleElement.style.gridColumnStart = apple.x
    appleElement.classList.add('apple')
    gameBoard.appendChild(appleElement)
  }

  function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }
    snake.unshift(head)
    if (head.x === apple.x && head.y === apple.y) {
      score += 1
      speed = Math.max(50, speed - 20) // Increase speed as the snake grows, minimum speed 50ms
      generateApple()
    } else {
      snake.pop()
    }
  }

  function changeDirection(event) {
    const key = event.key
    if (key === 'ArrowUp' && direction.y !== 1) {
      direction = { x: 0, y: -1 }
    } else if (key === 'ArrowDown' && direction.y !== -1) {
      direction = { x: 0, y: 1 }
    } else if (key === 'ArrowLeft' && direction.x !== 1) {
      direction = { x: -1, y: 0 }
    } else if (key === 'ArrowRight' && direction.x !== -1) {
      direction = { x: 1, y: 0 }
    }
  }

  function generateApple() {
    apple = {
      x: Math.floor(Math.random() * GRID_SIZE) + 1,
      y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
  }

  function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x <= 0
    const hitRightWall = snake[0].x > GRID_SIZE
    const hitTopWall = snake[0].y <= 0
    const hitBottomWall = snake[0].y > GRID_SIZE
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
  }

  function mostrarMensaje(mensaje) {
    const modal = document.getElementById('game-over-modal')
    const message = document.getElementById('game-over-message')
    const restartButton = document.getElementById('modal-restart-button')
    const closeButton = document.querySelector('.close-button')

    message.textContent = mensaje
    modal.style.display = 'flex'

    closeButton.onclick = function () {
      modal.style.display = 'none'
      startGame()
    }

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
}

// Inicia el juego cuando se carga el módulo
document.addEventListener('DOMContentLoaded', initSnake)
