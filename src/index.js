import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.scss';
import rootSaga from './store/sagas';
import rootReducer from './store/reducers';
import App from './App';
import {CookiesProvider} from "react-cookie";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
);

const store = createStore(
    rootReducer,
    enhancer
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <CookiesProvider>
                <App/>
            </CookiesProvider>
        </Provider>
    </Router>,
    document.getElementById('root')
);
