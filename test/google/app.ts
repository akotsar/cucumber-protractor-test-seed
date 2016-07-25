export class App {
    public async goToHomepage() {
        await browser.navigate().to(browser.baseUrl);
    }
}
