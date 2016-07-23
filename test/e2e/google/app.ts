export class App {

    constructor() {
    }

    public openApp(): Promise<void> {
        return browser.get('');
    }

    public goToPrivacy(): Promise<void> {
        return browser.element(by.linkText('Privacy')).click();
    }

    public goToSearch(): Promise<void> {
        return browser.get('');
    }

    public getCurrentUrl(): Promise<string> {
        return browser.getCurrentUrl();
    }
}
