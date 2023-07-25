import { call, put, takeEvery } from "redux-saga/effects";
import { drugActions } from "./drugSlice";
import {deleteDrug, fetchDrugs, postDrugs, putDrug} from "../../api";
import {errorToast, successToast} from "../../utils/toast.js";

export function* workDrugsFetch() {
    try {
        const medicines = yield call(fetchDrugs);
        yield put(drugActions.getDrugSuccess(medicines?.data))
    } catch(error) {
        yield put(drugActions.getDrugsFailure(error))
    }
}


export function* addNewDrugWorker(action) {
    try {
        const response = yield postDrugs(action.payload);
        yield put(drugActions.addNewDrugSuccess())
        response.status === 201 && successToast('Successfully added medication.')
    } catch (e) {
        errorToast('Error! Something went wrong.')
    }
}

export function* updateDrugWorker(action) {
    const { payload } = action;

    try {
        const response = yield putDrug(payload.id, payload);
        yield put(drugActions.updateDrugSuccess())
        response.status === 200 && successToast('Successfully updated.')
    } catch (e) {
        errorToast('Oops! Something went wrong.')
    }
}

export function* deleteDrugWorker(action) {
    try {
        const response = yield deleteDrug(action.payload);
        yield put(drugActions.deleteDrugSuccess())
        response.status === 200 && successToast('Successfully deleted')
    } catch (e) {
        errorToast('Oops! Something went wrong.')
    }
}

function* drugSaga() {
    yield takeEvery('drugs/getDrugsFetch', workDrugsFetch)
    yield takeEvery('drugs/addNewDrug', addNewDrugWorker)
    yield takeEvery('drugs/updateDrug', updateDrugWorker)
    yield takeEvery('drugs/deleteDrug', deleteDrugWorker)
}

export default drugSaga;