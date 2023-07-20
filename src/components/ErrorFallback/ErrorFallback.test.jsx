import { describe, expect, test, vi } from "vitest";
import ErrorFallback from "./ErrorFallback";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

describe('ErrorFallback', () => {
    test('should render properly', () => { 
        render(<ErrorFallback error='' resetErrorBoundary={() => {}} />)

        expect(screen.getByRole('button', { name: new RegExp(/try again/i)})).toBeInTheDocument()
     })

     test('should invoke proper callback when `Try Again` button is clicked', async () => {
        const mockedCallback = vi.fn()

        render(<ErrorFallback error='' resetErrorBoundary={mockedCallback} />)

        const user = userEvent.setup();

        const tryAgainButton = screen.getByRole('button', { name: new RegExp(/try again/i)});

        await user.click(tryAgainButton);

        expect(mockedCallback).toHaveBeenCalledOnce()
     })
})