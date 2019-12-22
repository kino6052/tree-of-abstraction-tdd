import { createElement } from 'react'
import { render } from 'react-dom'

import { AsyncApp } from './app/UI/app'

// This is Required to Import the Dependency Graph
import './app/Interface/index'
import { APIGateway } from './app/APIGateway'

render(createElement(AsyncApp), document.querySelector('main'), () =>
  APIGateway.onInit.next()
)
