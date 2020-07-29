import { call, put, take, all, fork } from 'redux-saga/effects';
import APIfetchData from '../../api/api';
import { fetchError, fetchSuccess } from './actions';
import { FETCH_REQUEST } from './consts';

function* handleFetch(url) {
	try {
		const res = yield call(() => APIfetchData(url));
		if (res.length === 0) {
			yield put(fetchError('err'));
		} else {
			yield put(fetchSuccess(res));
		}
	} catch (err) {
		yield put(fetchError('err'));
	}
}
// function* watchFetchRequest() {
// 	yield takeEvery(FETCH_REQUEST, handleFetch);
// }

function* watchRequestActions() {
	while (true) {
		const { url } = yield take(FETCH_REQUEST);
		yield fork(handleFetch, url);
	}
}

function* mainSaga() {
	yield all([fork(watchRequestActions)]);
}

export default mainSaga;
