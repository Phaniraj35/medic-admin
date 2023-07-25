import { call, put, takeEvery } from "redux-saga/effects";
import { drugActions } from "./drugSlice";
import { fetchDrugs } from "../../api";

export function* workDrugsFetch() {
    try {
        const medicines = yield call(fetchDrugs);
        yield put(drugActions.getDrugSuccess(medicines?.data))
    } catch(error) {
        yield put(drugActions.getDrugsFailure(error))
    }
}


function* drugSaga() {
    yield takeEvery('drugs/getDrugsFetch', workDrugsFetch)
}

export default drugSaga;