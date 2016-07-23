export class App {

    constructor() {
    }

    public openApp(): Promise<void> {
        return browser.navigate().to(browser.baseUrl);
    }

    public goToPrivacy(): Promise<void> {
        return browser.element(by.linkText('Privacy')).click();
    }

    public goToSearch(): Promise<void> {
        return browser.navigate().to(browser.baseUrl);
    }

    public getCurrentUrl(): Promise<string> {
        return browser.getCurrentUrl();
    }
}
