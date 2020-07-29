import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { createRootReducer } from './store/index';
import { rootSaga } from './store/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
		createRootReducer(),
		composeEnhancers(applyMiddleware(sagaMiddleware)),
	);
	sagaMiddleware.run(rootSaga);
	return store;
};
