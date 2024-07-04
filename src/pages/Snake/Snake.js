import './Snake.css'

export const initSnake = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  divContent.innerHTML = `<h1>Snake</h1>`
}
