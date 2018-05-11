//react
import React from 'react';
//react-dom
import ReactDOM from 'react-dom';
//redux
import { createStore } from 'redux'
//reducer
import reducer from './reducers'
//react-redux
import { Provider } from 'react-redux'
//react-router-dom
import { BrowserRouter } from 'react-router-dom'
//application
import App from './App';
import './index.css';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </ BrowserRouter>
    </Provider>,
    document.getElementById('root')
)