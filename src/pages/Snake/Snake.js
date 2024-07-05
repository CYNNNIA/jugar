// src/pages/Snake/Snake.js
import './Snake.css'

export const initSnake = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  const snake = [{ x: 200, y: 200 }]
  let direction = { x: 0, y: 0 }
  let food = { x: getRandomCoordinate(), y: getRandomCoordinate() }
  let speed = 100
  let gameInterval

  const createDiv = (className, x, y) => {
    const div = document.createElement('div')
    div.className = className
    div.style.left = `${x}px`
    div.style.top = `${y}px`
    return div
  }

  const drawSnake = () => {
    snake.forEach((segment) => {
      const snakeElement = createDiv('snake', segment.x, segment.y)
      divContent.appendChild(snakeElement)
    })
  }

  const drawFood = () => {
    const foodElement = createDiv('food', food.x, food.y)
    divContent.appendChild(foodElement)
  }

  const getRandomCoordinate = () => {
    return Math.floor(Math.random() * 20) * 20
  }

  const moveSnake = () => {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }
    snake.unshift(head)

    if (head.x === food.x && head.y === food.y) {
      food = { x: getRandomCoordinate(), y: getRandomCoordinate() }
    } else {
      snake.pop()
    }
  }

  const checkCollision = () => {
    const head = snake[0]

    if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
      clearInterval(gameInterval)
      alert('Game Over')
      return true
    }

    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        clearInterval(gameInterval)
        alert('Game Over')
        return true
      }
    }

    return false
  }

  const gameLoop = () => {
    moveSnake()

    if (checkCollision()) return

    divContent.innerHTML = ''
    drawSnake()
    drawFood()
  }

  const handleKeyPress = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        if (direction.y === 0) direction = { x: 0, y: -20 }
        break
      case 'ArrowDown':
        if (direction.y === 0) direction = { x: 0, y: 20 }
        break
      case 'ArrowLeft':
        if (direction.x === 0) direction = { x: -20, y: 0 }
        break
      case 'ArrowRight':
        if (direction.x === 0) direction = { x: 20, y: 0 }
        break
    }
  }

  document.addEventListener('keydown', handleKeyPress)
  gameInterval = setInterval(gameLoop, speed)
}
