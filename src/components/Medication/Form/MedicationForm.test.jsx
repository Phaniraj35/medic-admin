import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import MedicationForm from "./MedicationForm";
import userEvent from '@testing-library/user-event';

const defaultFormValues = {
    "name": "Digene",
    "strength": "100mg",
    "dosage_form": "Capsule",
    "frequency": "Once a day",
    "duration": "3 days",
    "route": "Oral",
    "active": true,
    "id": "ee979acc-5e97-46a8-a486-99d6655e6cd0"
}

describe('Medication Form', () => {
    test('should render properly with all the form fields', () => {
        
        render(<MedicationForm />)

        // text fields
        expect(screen.getByRole('textbox', {name: /name/i})).toBeInTheDocument()
        expect(screen.getByRole('textbox', {name: /strength/i})).toBeInTheDocument()
        expect(screen.getByRole('textbox', {name: /duration/i})).toBeInTheDocument()

        // select fields
        expect(screen.getByRole('combobox', {name: /dosage_form/i})).toBeInTheDocument()
        expect(screen.getByRole('combobox', {name: /frequency/i})).toBeInTheDocument()
        expect(screen.getByRole('combobox', {name: /route/i})).toBeInTheDocument()

        // checkbox
        expect(screen.getByRole('checkbox', {name: /active/i})).toBeInTheDocument()

        //button
        expect(screen.getByRole('button', {name: /submit/i})).toBeInTheDocument()

    })

    test('should populate form with passed default values', () => { 
        
        render(<MedicationForm defaultValues={defaultFormValues}/>)

        // text fields
        expect(screen.getByDisplayValue(defaultFormValues.name)).toBeInTheDocument()
        expect(screen.getByDisplayValue(defaultFormValues.strength)).toBeInTheDocument()
        expect(screen.getByDisplayValue(defaultFormValues.duration)).toBeInTheDocument()

        // select fields
        expect(screen.getByDisplayValue(defaultFormValues.dosage_form)).toBeInTheDocument()
        expect(screen.getByDisplayValue(defaultFormValues.frequency)).toBeInTheDocument()
        expect(screen.getByDisplayValue(defaultFormValues.route)).toBeInTheDocument()

        // since default value is true, we assert for checkbox checked
        expect(screen.getByRole('checkbox', {name: /active/i, checked: true})).toBeInTheDocument()
     })

    test('should not allow form submission if form is never interacted with', async () => {

        const mockedSubmitHandler = vi.fn();

        render(<MedicationForm submitCallback={mockedSubmitHandler} />)

        const user = userEvent.setup()

        const submitBtn = screen.getByRole('button', {name: /submit/i});

        await user.click(submitBtn);

        expect(mockedSubmitHandler).not.toHaveBeenCalledOnce()

    })

    test('should throw required validation and submit is blocked', async () => { 
        const mockedSubmitHandler = vi.fn();

        render(<MedicationForm />)

        const user = userEvent.setup()

        const medicationNameTextbox = screen.getByRole('textbox', {name: /name/i})

        await user.type(medicationNameTextbox, 'dolo');

        const submitBtn = screen.getByRole('button', {name: /submit/i});

        await user.click(submitBtn);

        expect(mockedSubmitHandler).not.toHaveBeenCalledOnce()

        expect(screen.getByText(/frequency is required/i)).toBeInTheDocument()
        expect(screen.getByText(/dosage form is required/i)).toBeInTheDocument()
        expect(screen.getByText(/route is required/i)).toBeInTheDocument()
        expect(screen.getByText(/duration is required/i)).toBeInTheDocument()
        expect(screen.getByText(/strength is required/i)).toBeInTheDocument()

    })

    test('should restrict edit form submit if form is not interacted with', async () => { 
        const mockedSubmitHandler = vi.fn();

        render(<MedicationForm defaultValues={defaultFormValues} submitCallback={mockedSubmitHandler}/>)

        const user = userEvent.setup()

        const submitBtn = screen.getByRole('button', {name: /submit/i});

        await user.click(submitBtn);

        expect(mockedSubmitHandler).not.toHaveBeenCalledOnce()
     })

    test('should be able to submit form for success', async () => { 
        const mockedSubmitHandler = vi.fn();

        render(<MedicationForm defaultValues={defaultFormValues} submitCallback={mockedSubmitHandler}/>)

        const user = userEvent.setup()

        const medicationNameTextbox = screen.getByRole('textbox', {name: /name/i})

        await user.type(medicationNameTextbox, 'dolo');

        const submitBtn = screen.getByRole('button', {name: /submit/i});

        await user.click(submitBtn);

        expect(mockedSubmitHandler).toHaveBeenCalledOnce()
    })
})