import {render, screen, waitFor} from "@testing-library/react";
import {afterAll, afterEach, beforeAll, describe, expect, test, vi} from "vitest";
import MedicationForm from "./MedicationForm";
import userEvent from '@testing-library/user-event';
import {rest} from "msw";
import {setupServer} from "msw/node";
import {ToastContainer} from "react-toastify";
import {Provider} from "react-redux";
import store from "../../../app/store.js";

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

export const handlers = [
    rest.post("http://localhost:3000/medicines", (req, res, ctx) => {
        return res(ctx.status(201), ctx.json({}))
    }),

    rest.put("http://localhost:3000/medicines/ee979acc-5e97-46a8-a486-99d6655e6cd0", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}))
    })
]

const server = setupServer(...handlers)

describe('Medication Form', () => {
    beforeAll(() => server.listen({onUnhandledRequest: 'warn'}))

    afterEach(() => {
        server.resetHandlers();
        vi.clearAllMocks();
        vi.resetAllMocks()
    })

    afterAll(() => server.close());

    test('should render properly with all the form fields', () => {
        
        render(<Provider store={store}>
            <MedicationForm />
        </Provider>)

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
        
        render(<Provider store={store}><MedicationForm defaultValues={defaultFormValues}/></Provider>)

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
        render(<Provider store={store}>
            <MedicationForm />
        </Provider>)

        expect(screen.getByRole('button', {name: /submit/i})).toBeDisabled();
    })

    test('should throw required validation and submit is blocked', async () => {
        render(<Provider store={store}>
            <MedicationForm />
        </Provider>)

        const user = userEvent.setup()

        const medicationNameTextbox = screen.getByRole('textbox', {name: /name/i})

        await user.type(medicationNameTextbox, 'dolo');

        const submitBtn = screen.getByRole('button', {name: /submit/i});

        await user.click(submitBtn);

        expect(screen.getByText(/frequency is required/i)).toBeInTheDocument()
        expect(screen.getByText(/dosage form is required/i)).toBeInTheDocument()
        expect(screen.getByText(/route is required/i)).toBeInTheDocument()
        expect(screen.getByText(/duration is required/i)).toBeInTheDocument()
        expect(screen.getByText(/strength is required/i)).toBeInTheDocument()

        const strengthTextBox = screen.getByRole('textbox', {name: /strength/i})
        await user.type(strengthTextBox, '10mg')
        await user.clear(medicationNameTextbox)

        expect(screen.getByText(/medication name is required/i)).toBeInTheDocument()
        expect(screen.queryByText(/strength is required/i)).not.toBeInTheDocument()

    })


    test('should be able to submit form for success', async () => {
        render(
            <Provider store={store}>
                <ToastContainer />
                <MedicationForm defaultValues={defaultFormValues} />
            </Provider>
        )

        const user = userEvent.setup()

        const medicationNameTextbox = screen.getByRole('textbox', {name: /name/i})

        await user.type(medicationNameTextbox, 'dolo');

        const submitBtn = screen.getByRole('button', {name: /submit/i});

        await user.click(submitBtn);

        expect(await screen.findByText(/successfully added medication/i)).toBeInTheDocument();
    })

    test('should be able to submit edit form for success', async () => {
        render(
            <Provider store={store}>
                <ToastContainer />
                <MedicationForm defaultValues={defaultFormValues} submitMethod="put" />
            </Provider>
        )

        const user = userEvent.setup()

        const medicationNameTextBox = screen.getByRole('textbox', {name: /name/i})

        await user.type(medicationNameTextBox, 'dolo');

        const submitBtn = screen.getByRole('button', {name: /submit/i});

        await user.click(submitBtn);

        expect(await screen.findByText(/successfully updated/i)).toBeInTheDocument();
    })

    test('should catch api failure on add-medication form', async () => {
        server.use(rest.post("http://localhost:3000/medicines", (req, res, ctx) => {
            return res.once(ctx.status(500), ctx.json({error: 'error'}))
        }))

        render(
            <Provider store={store}>
                <ToastContainer />
                <MedicationForm defaultValues={defaultFormValues}/>
            </Provider>
        )

        const user = userEvent.setup()

        const medicationNameTextBox = screen.getByRole('textbox', {name: /name/i})

        await user.type(medicationNameTextBox, '-dolo');

        const submitBtn = screen.getByRole('button', {name: /submit/i});

        await user.click(submitBtn);

        expect(await screen.findByText(/Error! Something went wrong./i)).toBeInTheDocument();
    })

    test('should catch api failure in edit-medication form', async () => {
        server.use(rest.put("http://localhost:3000/medicines/ee979acc-5e97-46a8-a486-99d6655e6cd0", (req, res, ctx) => {
            return res.once(ctx.status(400), ctx.json({error: 'error'}))
        }))

        render(
            <Provider store={store}>
                <ToastContainer />
                <MedicationForm defaultValues={defaultFormValues} submitMethod="put"/>
            </Provider>
        )

        const user = userEvent.setup()

        const medicationNameTextBox = screen.getByRole('textbox', {name: /strength/i})

        await user.type(medicationNameTextBox, '250mg');

        const submitBtn = screen.getByRole('button', {name: /submit/i});

        await user.click(submitBtn);

        expect(await screen.findByText(/Oops! Something went wrong./i)).toBeInTheDocument();
    })
})