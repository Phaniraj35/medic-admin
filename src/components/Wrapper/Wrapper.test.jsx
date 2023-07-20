import { render, screen } from "@testing-library/react"
import Wrapper from "./Wrapper"
import { BrowserRouter } from "react-router-dom";

describe("Wrapper", () => {
    test('should render properly', () => { 
        render(
            <BrowserRouter>
                <Wrapper />
            </BrowserRouter>
        );
        const navigation = screen.getByRole('navigation');
        expect(navigation).toBeInTheDocument()
     })
})