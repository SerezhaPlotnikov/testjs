import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { mainReducer } from './main/reducers';
import { all, fork } from 'redux-saga/effects';
import mainSaga from './main/sagas';

export const createRootReducer = () =>
	combineReducers({
		main: mainReducer,
		form: formReducer,
	});

export function* rootSaga() {
	yield all([fork(mainSaga)]);
}
