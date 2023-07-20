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

        // vi.mock('../../api', () => ({
        //     fetchDrugs: vi.fn(() => Promise.resolve({data: [{name: 'Dolo',strength: '650mg'}]}))
        // }))
        api.fetchDrugs = vi.fn(
            () => Promise.resolve({data: [{name: 'Dolo',strength: '650mg'}]})
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

        const error = { error: 'something is broken' };

        const gen = workDrugsFetch();

        gen.next() // saga call 
        gen.next() //saga put

        expect(gen.throw(error).value).toEqual(put({ type: 'drugs/getDrugsFailure', payload: error }));

        // assert.deepEqual(
        //     gen.throw(error).value,
        //     put({ type: 'drugs/getDrugsFailure', payload: error }),
        //     'throws error on api failure'
        // )
     })
})