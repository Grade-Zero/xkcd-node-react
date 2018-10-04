import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import { App } from './Components/App/App'
import { Router } from './Components/Router/Router';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux'

ReactDOM.render(
//   <h3>No wine for you</h3>,
  <Provider store={store}>
    <BrowserRouter>
        <Router />
    </BrowserRouter>
  </Provider>,
  document.getElementById('portal')
)
