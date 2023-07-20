/*
    this component will have child component `MedicationForm.jsx`
    which will be tested separately. Hence this test will only verify
    the proper rendering of `MedicationForm`
*/

import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AddMedication from "./AddMedication";

describe('AddMedication', () => {

    test('should render properly', () => { 
        render(<AddMedication />)

        expect(screen.getByText(/add medication/i)).toBeInTheDocument()
     })

})