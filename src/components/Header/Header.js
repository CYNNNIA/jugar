import { initSnake } from '../../pages/Snake/Snake'
import { initTres } from '../../pages/TresEnRaya/TresEnRaya'
import { initMole } from '../../pages/WackAMole/WackAMole'

import './Header.css'

export const Header = (divApp) => {
  if (!divApp) {
    console.error('divApp no está definido.')
    return
  }

  const header = document.createElement('header')
  const buttonSnake = document.createElement('button')
  const buttonTres = document.createElement('button')
  const buttonWack = document.createElement('button')

  buttonSnake.textContent = 'Snake'
  buttonTres.textContent = 'Tres en Raya'
  buttonWack.textContent = 'Whack a Mole'

  buttonSnake.addEventListener('click', initSnake)
  buttonTres.addEventListener('click', initTres)
  buttonWack.addEventListener('click', initMole)

  header.append(buttonSnake)
  header.append(buttonTres)
  header.append(buttonWack)
  divApp.append(header)
}
