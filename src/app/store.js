import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import drugReducer from '../features/drug/drugSlice'
import drugSaga from "../features/drug/drugSaga";

const saga = createSagaMiddleware();

const store = configureStore({
    reducer: {
        drugs: drugReducer
    },
    middleware: [saga]
})

saga.run(drugSaga);

export default store;