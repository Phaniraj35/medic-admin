/*
    this component will have child component `MedicationForm.jsx`
    which will be tested separately. Hence this test will only verify
    the proper rendering of `MedicationForm`
*/

import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import EditMedication from "./EditMedication";
import { BrowserRouter } from "react-router-dom";

describe('EditMedication', () => {

    test('should render properly', () => { 
        render(
            <BrowserRouter>
                <EditMedication />
            </BrowserRouter>
        )

        expect(screen.getByText(/update medication/i)).toBeInTheDocument()
     })

})