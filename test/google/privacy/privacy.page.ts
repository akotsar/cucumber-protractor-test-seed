export class PrivacyPage {
    private navMenu = element(by.id('maia-nav-y'));
    private keyTermsList = element.all(by.css('.maia-article ul li a'));

    public async clickNavigationItem(item: string) {
        await this.navMenu.element(by.linkText(item)).click();
    }

    public async getKeyTerms() {
        let result: string[] = [];
        for (let text of await this.keyTermsList.map(x => x.getText())) {
            result.push(await text);
        }

        return result;
    }
}