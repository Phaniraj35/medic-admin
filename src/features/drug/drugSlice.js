import { createSlice } from "@reduxjs/toolkit";

export const drug = createSlice({
    name: 'drugs',
    initialState: {
        drugList: [],
        isLoading: false,
        error: ''
    },
    reducers: {
        getDrugsFetch: state => { state.isLoading = true },
        getDrugsFailure: (state, action) => { state.error = action.error},
        getDrugSuccess: (state, action) => { state.drugList = action.payload; state.isLoading = false; }
    }
})

export default drug.reducer;
export const drugActions = drug.actions;