import { initSnake } from '../../pages/Snake/Snake'
import { initTres } from '../../pages/TresEnRaya/TresEnRaya'
import { initMole } from '../../pages/WackAMole/WackAMole'
import './Header.css'

export const Header = (divApp) => {
  if (!divApp) {
    console.error('divApp no está definido.')
    return
  }

  if (document.querySelector('header')) return

  const header = document.createElement('header')
  const buttonSnake = document.createElement('button')
  const buttonTres = document.createElement('button')
  const buttonWack = document.createElement('button')

  buttonSnake.textContent = 'Snake'
  buttonTres.textContent = 'Tres en Raya'
  buttonWack.textContent = 'Rainbow'

  buttonSnake.addEventListener('click', () => {
    document.querySelector('.content').innerHTML = ''
    initSnake()
  })
  buttonTres.addEventListener('click', () => {
    document.querySelector('.content').innerHTML = ''
    initTres()
  })
  buttonWack.addEventListener('click', () => {
    document.querySelector('.content').innerHTML = ''
    initMole()
  })

  header.append(buttonSnake)
  header.append(buttonTres)
  header.append(buttonWack)
  divApp.append(header)
}
