import * as React from 'react'
import { render } from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.scss'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_NAME: string
      REACT_APP_STATIC_PATH: string
    }
  }
}

render(
  <App />,
  document.getElementById('root') as HTMLElement,
)

registerServiceWorker()
