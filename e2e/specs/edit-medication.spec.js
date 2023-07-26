describe('edit-medication', function () {
    it('should assert that submit button is disabled when no changes are made in edit form', async function () {
        await browser.url("http://localhost:5173/");

        const editBtn = await $('.edit-btn');

        await editBtn.click();

        const submitBtn = await $('button[type="submit"]');

        const isSubmitEnabled = await submitBtn.isEnabled();

        expect(isSubmitEnabled).toBe(false);
    });

    it('should assert successful edit form submission', async function () {
        await browser.url("http://localhost:5173/");

        const editBtn = await $('.edit-btn');

        await editBtn.click();

        await $('#formMedicationName').setValue('polo')

        const submitBtn = await $('button[type="submit"]');

        const isSubmitEnabled = await submitBtn.isEnabled();

        expect(isSubmitEnabled).toBe(true);

        await submitBtn.click();

        const successMsg = $('div=Successfully updated.');

        await successMsg.waitForDisplayed();
    });
});