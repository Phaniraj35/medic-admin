import { runSaga } from 'redux-saga';
import { put } from "redux-saga/effects"
import { workDrugsFetch } from './drugSaga';
import * as api from '../../api'
import { vi, afterEach, describe, test, expect } from 'vitest'; // compatible with jest.

vi.mock('../../api'); 

describe("Drugs Saga", () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks()
    })

    test('should fetch drugs successfully', async () => {

        // we can assert dispatched actions to verify the working of saga
        const dispatchedActions = []

        api.fetchDrugs = vi.fn(() => Promise.resolve({data: [{name: 'Dolo',strength: '650mg'}]})
        )

        await runSaga({
            dispatch: action => dispatchedActions.push(action),
            getState: () => ({state: 'test'})
        },workDrugsFetch).toPromise();

        expect(dispatchedActions).toContainEqual({
            type: 'drugs/getDrugSuccess',
            payload: [{name: 'Dolo',strength: '650mg'}]
        })
    })

    test('should store error on API fail', async () => {

        // we can assert dispatched actions to verify the working of saga
        const dispatchedActions = []

        const apiError = new Error('error')
        api.fetchDrugs = vi.fn(() => Promise.reject(apiError))

        await runSaga({
            dispatch: action => dispatchedActions.push(action),
            getState: () => {}
        },workDrugsFetch).toPromise();

        expect(dispatchedActions).toContainEqual({
            type: 'drugs/getDrugsFailure',
            payload: apiError
        })
    })
})