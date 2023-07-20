import { call, put, takeEvery } from "redux-saga/effects";
import { drugActions } from "./drugSlice";
import { fetchDrugs } from "../../api";

export function* workDrugsFetch() {
    const medicenes = yield call(fetchDrugs);
        
    try {
        yield put(drugActions.getDrugSuccess(medicenes?.data))
    } catch(error) {
        console.log(error)
        yield put(drugActions.getDrugsFailure(error))
    }
}


function* drugSaga() {
    yield takeEvery('drugs/getDrugsFetch', workDrugsFetch)
}

export default drugSaga;