import { runSaga } from 'redux-saga';
import { put } from "redux-saga/effects"
import {addNewDrugWorker, deleteDrugWorker, updateDrugWorker, workDrugsFetch} from './drugSaga';
import * as api from '../../api'
import * as toasts from '../../utils/toast.js'
import { vi, afterEach, describe, test, expect } from 'vitest'; // compatible with jest.

vi.mock('../../api');
vi.mock('../../utils/toast.js')

describe("Drugs Saga", () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks()
    })

    test('should fetch drugs successfully', async () => {

        // we can assert dispatched actions to verify the working of saga
        const dispatchedActions = []

        api.fetchDrugs = vi.fn(() => Promise.resolve({data: [{name: 'Dolo',strength: '650mg'}]}))

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

    test('should add new medicine successfully', async () => {
        const dispatchedActions = []

        api.postDrugs = vi.fn(() => Promise.resolve({status: 201}))

        toasts.successToast = vi.fn();

        await runSaga({
            dispatch: action => dispatchedActions.push(action),
            getState: () => {}
        },addNewDrugWorker, {payload: {}}).toPromise();

        expect(dispatchedActions).toContainEqual({
            type: 'drugs/addNewDrugSuccess',
            payload: undefined
        })

        expect(toasts.successToast).toHaveBeenCalledOnce();
    })

    test('should verify add new medicine for error', async () => {
        const dispatchedActions = []

        api.postDrugs = vi.fn(() => Promise.reject())

        toasts.errorToast = vi.fn();

        await runSaga({
            dispatch: action => dispatchedActions.push(action),
            getState: () => {}
        },addNewDrugWorker, {payload: {}}).toPromise();

        expect(dispatchedActions).toEqual([])

        expect(toasts.errorToast).toHaveBeenCalledOnce();
    })

    test('should update medicine successfully', async () => {
        const dispatchedActions = []

        api.putDrug = vi.fn(() => Promise.resolve({status: 200}))

        toasts.successToast = vi.fn()

        await runSaga({
            dispatch: action => dispatchedActions.push(action),
            getState: () => {}
        },updateDrugWorker, {payload: {}}).toPromise();

        expect(dispatchedActions).toContainEqual({
            type: 'drugs/updateDrugSuccess',
            payload: undefined
        })

        expect(toasts.successToast).toHaveBeenCalledOnce();
    })

    test('should verify update medicine for error', async () => {
        const dispatchedActions = []

        api.putDrug = vi.fn(() => Promise.reject())

        toasts.errorToast = vi.fn();

        await runSaga({
            dispatch: action => dispatchedActions.push(action),
            getState: () => {}
        },updateDrugWorker, {payload: {}}).toPromise();

        expect(dispatchedActions).toEqual([])

        expect(toasts.errorToast).toHaveBeenCalledOnce();
    })

    test('should delete medicine successfully', async () => {
        const dispatchedActions = []

        api.deleteDrug = vi.fn(() => Promise.resolve({status: 200}))

        toasts.successToast = vi.fn();

        await runSaga({
            dispatch: action => dispatchedActions.push(action),
            getState: () => {}
        },deleteDrugWorker, {payload: {}}).toPromise();

        expect(dispatchedActions).toContainEqual({
            type: 'drugs/deleteDrugSuccess',
            payload: undefined
        })

        expect(toasts.successToast).toHaveBeenCalledOnce();
    })

    test('should verify delete medicine for error', async () => {
        const dispatchedActions = []

        api.deleteDrug = vi.fn(() => Promise.reject())

        toasts.errorToast = vi.fn();

        await runSaga({
            dispatch: action => dispatchedActions.push(action),
            getState: () => {}
        },deleteDrugWorker, {payload: {}}).toPromise();

        expect(dispatchedActions).toEqual([])

        expect(toasts.errorToast).toHaveBeenCalledOnce();
    })
})