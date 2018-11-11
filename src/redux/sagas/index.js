import { takeLatest, put } from 'redux-saga/effects';
import { NEW_SENSOR_DATA, NEW_SERVER_DATA } from 'redux/reducers/sensors/actions';

export function* watcherSaga() {
  yield takeLatest(NEW_SERVER_DATA, workerSaga);
}

function* workerSaga(action) {
  const { payload } = action;
  for (let i = 0; i < payload.length; i++) {
    yield put({
      type: NEW_SENSOR_DATA,
      payload: payload[i],
    });
  }
}
