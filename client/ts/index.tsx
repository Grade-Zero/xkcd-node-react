import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router } from './Components/Router/Router';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <Router />
    </BrowserRouter>
  </Provider>,
  document.getElementById('portal')
)
