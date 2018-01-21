import { element, by, promise } from 'protractor';

export class PrivacyPage {
    private navMenu = element(by.id('maia-nav-y'));
    private keyTermsList = element.all(by.css('.maia-article ul li a'));

    public async clickNavigationItem(item: string) {
        await this.navMenu.element(by.linkText(item)).click();
    }

    public async getKeyTerms(): Promise<string[]> {
        let promises: promise.Promise<string[]> = this.keyTermsList.map(x => x.getText());
        return await promises;
    }
}