import './WackAMole.css'

let COUNT = 0
let totalUnicorns = 0
let speed = 3000
let gameActive = false

const unicornImages = [
  './assets/WackAMole/unicornio1.png',
  './assets/WackAMole/unicornio2.png',
  './assets/WackAMole/unicornio3.png',
  './assets/WackAMole/unicornio4.png',
  './assets/WackAMole/unicornio5.png'
  // Añade más rutas de imágenes de unicornios si tienes más
]

export const initMole = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  const arcoiris = document.createElement('img')
  const textoContador = document.createElement('h2')
  const startButton = document.createElement('button')

  textoContador.textContent = COUNT
  arcoiris.className = 'arcoiris'
  textoContador.className = 'contador'
  arcoiris.src = './assets/WackAMole/arcoiris.png'

  startButton.textContent = 'Empezar a jugar'
  startButton.className = 'start-button'
  startButton.addEventListener('click', startGame)

  divContent.appendChild(textoContador)
  divContent.appendChild(arcoiris)
  divContent.appendChild(startButton)
}

const startGame = () => {
  gameActive = true
  COUNT = 0
  totalUnicorns = 0
  speed = 3000

  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  const arcoiris = document.createElement('img')
  const textoContador = document.createElement('h2')

  textoContador.textContent = COUNT
  arcoiris.className = 'arcoiris'
  textoContador.className = 'contador'
  arcoiris.src = './assets/WackAMole/arcoiris.png'

  divContent.appendChild(textoContador)
  divContent.appendChild(arcoiris)
  createUnicornio()
}

const createUnicornio = () => {
  if (!gameActive) return

  if (COUNT >= 10) {
    mostrarMensaje('¡Felicidades has llenado tu arcoiris!')
    return
  }

  if (totalUnicorns >= 50) {
    if (COUNT < 25) {
      mostrarMensaje('¡Por tu culpa han muerto miles de unicornios!')
    }
    return
  }

  totalUnicorns++
  const divContent = document.querySelector('.content')

  let randomLeft = Math.random() * (window.innerWidth - 100)
  let randomTop = Math.random() * (window.innerHeight - 200)

  const imgUnicornio = document.createElement('img')
  imgUnicornio.className = 'unicornio'
  imgUnicornio.style.position = 'absolute' // Asegurar posición absoluta
  imgUnicornio.style.left = `${randomLeft}px`
  imgUnicornio.style.top = `${randomTop}px`
  imgUnicornio.style.transform = `rotate(${Math.random() * 360}deg)`
  imgUnicornio.style.zIndex = 1 // Asegurarse de que los unicornios estén detrás del arco iris

  const randomImage =
    unicornImages[Math.floor(Math.random() * unicornImages.length)]
  imgUnicornio.src = randomImage

  imgUnicornio.addEventListener('click', (e) => recogerUnicornio(e))

  divContent.append(imgUnicornio)

  setTimeout(() => {
    if (imgUnicornio.parentElement) {
      imgUnicornio.remove()
      createUnicornio()
    }
  }, speed)
}

const recogerUnicornio = (e) => {
  const arcoiris = document.querySelector('.arcoiris')
  const arcoirisRect = arcoiris.getBoundingClientRect()

  COUNT++
  repintarTexto(COUNT)

  // Mover el unicornio detrás del arco iris
  e.target.style.zIndex = 0 // Poner el unicornio detrás del arco iris
  e.target.style.left = `${
    arcoirisRect.left + arcoirisRect.width / 2 - e.target.width / 2
  }px`
  e.target.style.top = `${
    arcoirisRect.top + arcoirisRect.height / 2 - e.target.height / 2
  }px`
  e.target.style.transform = 'scale(0)' // Hacer el unicornio invisible al reducir su tamaño

  // Aumentar el tamaño del arco iris
  arcoiris.style.width = `${arcoirisRect.width + 20}px`

  // Reducir la velocidad aumentando la frecuencia de aparición de unicornios
  speed = Math.max(1000, speed - 100)

  createUnicornio()
}

const repintarTexto = (cont) => {
  const texto = document.querySelector('.contador')
  texto.textContent = cont
}

const mostrarMensaje = (mensaje) => {
  gameActive = false
  const divContent = document.querySelector('.content')
  const mensajeElement = document.createElement('div')
  mensajeElement.className = 'mensaje'
  mensajeElement.textContent = mensaje

  const startButton = document.createElement('button')
  startButton.textContent = 'Volver a jugar'
  startButton.className = 'start-button'
  startButton.addEventListener('click', startGame)

  mensajeElement.appendChild(startButton)
  divContent.appendChild(mensajeElement)
}

document.addEventListener('DOMContentLoaded', initMole) // Iniciar el juego cuando el contenido del documento esté cargado
