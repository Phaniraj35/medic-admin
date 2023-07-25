import { createSlice } from "@reduxjs/toolkit";

export const drug = createSlice({
    name: 'drugs',
    initialState: {
        drugList: [],
        isLoading: false,
        error: '',
        addNewDrugLoading: false,
        updateDrugLoading: false,
        deleteDrugLoading: false,
    },
    reducers: {
        getDrugsFetch: state => { state.isLoading = true },
        getDrugsFailure: (state, action) => { state.error = action.error},
        getDrugSuccess: (state, action) => { state.drugList = action.payload; state.isLoading = false; },

        addNewDrug: (state, action) => { state.addNewDrugLoading = true},
        addNewDrugSuccess: state => { state.addNewDrugLoading = false },

        updateDrug: (state, action) => { state.updateDrugLoading = true},
        updateDrugSuccess: state => { state.updateDrugLoading = false },

        deleteDrug: (state, action) => { state.deleteDrugLoading = true},
        deleteDrugSuccess: state => { state.deleteDrugLoading = false },
    }
})

export default drug.reducer;
export const drugActions = drug.actions;