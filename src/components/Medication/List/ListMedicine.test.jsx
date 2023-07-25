import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import ListMedicine from "./ListMedicine";
import { Provider } from "react-redux";
import store from "../../../app/store";
import { rest } from "msw";
import { setupServer } from "msw/node"
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'

const responseArray = new Array(15);

responseArray.fill({
    "id": 1,
    "name": "Dolo 650",
    "strength": "650mg",
    "dosage_form": "tablet",
    "frequency": "2",
    "duration": "3",
    "route": "oral"
})

export const handlers = [
    rest.get("http://localhost:3000/medicines", (req, res, ctx) => {
        return res(ctx.json([{
            "id": 1,
            "name": "Dolo 650",
            "strength": "650mg",
            "dosage_form": "tablet",
            "frequency": "2",
            "duration": "3",
            "route": "oral"
        }]))
    })
]

const server = setupServer(...handlers)


describe('List Medicene', () => {
    beforeAll(() => server.listen())

    afterEach(() => server.resetHandlers())

    afterAll(() => server.close());

    test('should hide loading & show results when API call is successful', async () => { 
        render(<Provider store={store}>
            <BrowserRouter>
                <ListMedicine />
            </BrowserRouter>
        </Provider>)

        // asserts hiding of the loading indicator
        await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

        // expect(await screen.findByText(/loading/i)).not.toBeInTheDocument();
        expect(await screen.findByText(/medication list/i)).toBeInTheDocument();
        expect(await screen.findByText(/dolo 650/i)).toBeInTheDocument(); //`dolo 650` is returned from mock response
        expect(screen.getAllByRole('row').length).toBe(2); // includes 1 header row & one data row
     })

     test('should render delete & edit action buttons in data-table', async () => { 
        render(<Provider store={store}>
            <BrowserRouter>
                <ListMedicine />
            </BrowserRouter>
        </Provider>)

        expect(await screen.findByTitle(/delete dolo 650/i)).toBeInTheDocument();

        expect(await screen.findByTitle(/edit dolo 650/i)).toBeInTheDocument();
      })

     test('should render confirm dialog when delete button is clicked', async () => { 
        render(<Provider store={store}>
            <BrowserRouter>
                <ListMedicine />
            </BrowserRouter>
        </Provider>)

        const user = userEvent.setup()

        const confirmMock = vi.spyOn(window, 'confirm').mockImplementation(() => {})
        
        const deleteButton = await screen.findByTitle(/delete dolo 650/i);
        expect(deleteButton).toBeInTheDocument()

        await user.click(deleteButton)
        expect(confirmMock).toHaveBeenCalledTimes(1)        
     })

     test('should navigate to edit form when edit button is clicked', async () => { 
        const mockedNavigator = vi.fn();

        render(<Provider store={store}>
            <ListMedicine navigator={mockedNavigator} />
        </Provider>)

        const user = userEvent.setup()

        const editButton = await screen.findByTitle(/edit dolo 650/i);
        expect(editButton).toBeInTheDocument()


        await user.click(editButton)

        expect(mockedNavigator).toHaveBeenCalledOnce();
     })

    test('should verify next & prev buttons to be disabled when rows are less than 10', async () => {
        render(<Provider store={store}>
            <BrowserRouter>
                <ListMedicine />
            </BrowserRouter>
        </Provider>)

        // asserts hiding of the loading indicator
        await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

        expect(await screen.findByText(/dolo 650/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /prev/i})).toBeDisabled()

        expect(screen.getByRole('button', { name: /next/i})).toBeDisabled()
    })

    test('when rows > 10 next & prev buttons are clickable', async () => {
        server.use(
            rest.get("http://localhost:3000/medicines", (req, res, ctx) => {
                return res.once(ctx.json(responseArray))
            })
        )

        render(<Provider store={store}>
            <BrowserRouter>
                <ListMedicine />
            </BrowserRouter>
        </Provider>)

        const user = userEvent.setup()

        await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

        const prevButton = screen.getByRole('button', { name: /prev/i});

        const nextButton = screen.getByRole('button', { name: /next/i});

        expect(prevButton).toBeDisabled()
        expect(nextButton).not.toBeDisabled()

        await user.click(nextButton);

        /*
            since our test api returns only two pages, clicking the `next` button above should
            disable the `next` button & enable the `prev` button
        */
        expect(prevButton).not.toBeDisabled()
        expect(nextButton).toBeDisabled();

        await user.click(prevButton);

        /*
            verifying the logic one more time. since our test api returns only two pages,
            clicking the `prev` button above should
            disable the `prev` button & enable the `next` button
        */
        expect(nextButton).not.toBeDisabled()
        expect(prevButton).toBeDisabled()
    })
})