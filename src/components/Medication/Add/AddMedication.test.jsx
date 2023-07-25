/*
    this component will have child component `MedicationForm.jsx`
    which will be tested separately. Hence this test will only verify
    the proper rendering of `MedicationForm`
*/

import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AddMedication from "./AddMedication";
import {Provider} from "react-redux";
import store from "../../../app/store.js";

describe('AddMedication', () => {

    test('should render properly', () => { 
        render(<Provider store={store}>
            <AddMedication />
        </Provider>)

        expect(screen.getByText(/add medication/i)).toBeInTheDocument()
     })

})