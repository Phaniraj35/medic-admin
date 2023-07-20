const state = {
    drugs: {
        medicineList: [],
        isLoading: false,
        error: ''
    }
}

export const testUseAppSelector = f => {
    console.log('hittt')
    return f(state)
};