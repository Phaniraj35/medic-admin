function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

describe("add-medication.spec", () => {
  beforeEach(async () => {
    await browser.url("http://localhost:5173/add-medication")
  })

  it("should check for successful adding of medication", async () => {

    await expect(browser).toHaveUrl("http://localhost:5173/add-medication")

    await $("#formMedicationName").setValue(getRandomInt(10000000))

    await $("#formMedicationStrength").setValue("100mg")

    await $("#formMedicationDosageForm").selectByVisibleText("Capsule")

    await $("#formMedicationFrequency").selectByVisibleText("Once a day")

    await $("#formMedicationDuration").setValue("10 days")

    await $("#formMedicationRoute").selectByVisibleText("Oral")

    await $("#formActive").click();

    await $("aria/Submit").click();

    const successMsg = $('div=Successfully added medication.');

    await successMsg.waitForDisplayed();
  });

  it('should assert that submit button is disabled when form has not been interacted with', async function () {

    const submitBtn = await $('button[type="submit"]');

    const isSubmitEnabled = await submitBtn.isEnabled();

    expect(isSubmitEnabled).toBe(false);
  });

  it('should assert validation errors are displayed', async function () {

    await $("#formMedicationStrength").setValue("100mg")

    const submitBtn = $('button[type="submit"]');

    await submitBtn.click();

    const validationErrorsLengthTrial1 = await $$('.invalid-feedback').length;

    expect(validationErrorsLengthTrial1).toBe(5);

    await $("#formMedicationStrength").setValue("");

    await submitBtn.click()

    const validationErrorsLengthTrial2 = await $$('.invalid-feedback').length;

    expect(validationErrorsLengthTrial2).toBe(6);

  });
});
