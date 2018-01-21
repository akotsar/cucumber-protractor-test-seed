import { browser } from 'protractor';

export class App {
    public async goToHomepage() {
        await browser.navigate().to(browser.baseUrl);
    }
}
