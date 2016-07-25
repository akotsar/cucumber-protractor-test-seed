export class App {
    public async goToSearch() {
        await browser.navigate().to(browser.baseUrl);
    }

    public async getCurrentUrl() {
        return await browser.getCurrentUrl();
    }
}
