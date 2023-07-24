describe("list-medicine", () => {
  beforeEach(async () => {
    await browser.url("http://localhost:5173/")
  })

  it("Should display listing table properly", async () => {
    expect(await $('#medication-list-heading')).toExist()
    expect(await $('#medication-list-table')).toExist()
  });

  it('should navigate to edit form when edit action button is clicked', async function () {
    await $('.edit-btn').click();
    expect(browser.getUrl()).toHaveTextContaining('edit-medication');
    expect(await $('#form-heading')).toExist();
    expect(await $('#form-heading')).toHaveTextContaining(/update medication/i);
  });

  it('should display `confirm` popup when delete action button is clicked', async function () {
    await $('.delete-btn').click();
    expect(await browser.getAlertText()).toHaveTextContaining(/Do you really want to delete?/i)
  });

  it('should not delete list-item when `cancel` is clicked in confirm dialog while deleting ', async function () {
    const listItemCountBeforeDeleteBtnClick = await $$('.medication-row').length;
    await $('.delete-btn').click();
    await browser.dismissAlert();
    const listItemCountAfterDeleteBtnClick = await $$('.medication-row').length;
    console.log(listItemCountBeforeDeleteBtnClick, listItemCountAfterDeleteBtnClick, '====')
    expect(listItemCountAfterDeleteBtnClick).toEqual(listItemCountBeforeDeleteBtnClick)
  });

  it('should delete list-item when user proceeds to delete in confirm dialog while deleting', async function () {
    const listItemCountBeforeDeleteBtnClick = await $$('.medication-row').length;
    await $('.delete-btn').click();
    await browser.acceptAlert();
    await browser.refresh();
    const listItemCountAfterDeleteBtnClick = await $$('.medication-row').length;
    expect(listItemCountAfterDeleteBtnClick).not.toEqual(listItemCountBeforeDeleteBtnClick);
  });
});
