export class SearchPage {
    private query = element(by.name('q'));
    private searchButton = $('button[value="Search"]');
    private resultStats = element(by.id('resultStats'));
    private pager = element(by.css('table[id="nav"]'));
    private resultTitles = element.all(by.css('div.srg div.g h3'));
    private relatedSearchesTerm = element(by.css('div#brs h3'));

    public async enterSearchQuery(query: string) {
        await this.query.sendKeys(query);
    }

    public async clickSearch() {
        await this.searchButton.click();
        await browser.sleep(1000);
        await browser.wait(ExpectedConditions.visibilityOf(this.resultStats));
    }

    public async getNumberOfResults() {
        let text = await this.resultStats.getText();
        let stringNumber = /^About ([\d,]+) results/.exec(text)[1];
        return parseInt(stringNumber.replace(',', ''));
    }

    public async goToResultsPage(page: number) {
        let link = await this.pager.all(by.css('tbody td')).get(page).element(by.css('a'));
        await browser.wait(ExpectedConditions.elementToBeClickable(link));
        await link.click();
        await browser.sleep(1000);
        await browser.wait(ExpectedConditions.textToBePresentInElement(this.resultStats, 'Page ' + page + ' '));
    }

    public async getResults() {
        let results: string[] = [];
        for (let el of await this.resultTitles) {
            let text = await el.getText();
            results.push(text);
        }

        return results;
    }

    public async getRelatedSearchesTerm() {
        let relatedSearchesText = await this.relatedSearchesTerm.getText();
        return relatedSearchesText.replace('Searches related to ', '');
    }
}