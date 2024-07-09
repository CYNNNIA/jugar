import { initSnake } from '../../pages/Snake/Snake'
import { initTres } from '../../pages/TresEnRaya/TresEnRaya'
import { initMole } from '../../pages/WackAMole/WackAMole'
import { showMainMenu } from '/Users/cynn/Desktop/jugar/jugar/main.js'

import './Header.css'

export const Header = (divApp) => {
  if (!divApp) {
    console.error('divApp no está definido.')
    return
  }

  if (document.querySelector('header')) {
    return
  }

  const header = document.createElement('header')
  const buttonHome = document.createElement('button')
  const buttonSnake = document.createElement('button')
  const buttonTres = document.createElement('button')
  const buttonWack = document.createElement('button')

  buttonHome.textContent = 'Inicio'
  buttonSnake.textContent = 'Snake'
  buttonTres.textContent = 'Tres en Raya'
  buttonWack.textContent = 'Whack a Mole'

  buttonHome.addEventListener('click', () => {
    document.querySelector('.content').innerHTML = ''
    showMainMenu()
  })
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

  header.append(buttonHome)
  header.append(buttonSnake)
  header.append(buttonTres)
  header.append(buttonWack)
  divApp.append(header)
}
