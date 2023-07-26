describe('Invalid Routes', function () {
    it('should redirect to 404 page when navigated to invalid route', async function () {
        await browser.url("http://localhost:5173/abcdefgh");

        const notFoundMsg = await $('#not-found-msg');

        expect(notFoundMsg).toExist()

        expect(notFoundMsg).toHaveTextContaining(/page not found/i)
    });
});