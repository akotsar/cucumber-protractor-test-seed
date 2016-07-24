export class SearchPage {
    private query = element(by.name('q'));
    private searchButton = $('button[value="Search"]');
    private resultStatsLocator = by.id('resultStats');
    private pager = element(by.css('table[id="nav"]'));
    private resultsLocator = by.css('div.srg div.g h3');

    public async enterSearchQuery(query: string) {
        await this.query.sendKeys(query);
    }

    public async clickSearch() {
        await this.searchButton.click();
        await browser.sleep(1000);
        await browser.wait(ExpectedConditions.visibilityOf(element(this.resultStatsLocator)));
    }

    public async getNumberOfResults() {
        let text = await element(this.resultStatsLocator).getText();
        let stringNumber = /^About ([\d,]+) results/.exec(text)[1];
        return parseInt(stringNumber.replace(',', ''));
    }

    public async goToResultsPage(page: number) {
        let link = await this.pager.all(by.css('tbody td')).get(page).element(by.css('a'));
        await browser.wait(ExpectedConditions.elementToBeClickable(link));
        await link.click();
        await browser.sleep(1000);
        await browser.wait(ExpectedConditions.textToBePresentInElement(element(by.id('resultStats')), 'Page ' + page + ' '));
    }

    public async getResults(): Promise<string[]> {
        let elements = await element.all(this.resultsLocator);

        let results: string[] = [];
        for (let el of elements) {
            let text = await el.getText();
            results.push(text);
        }

        return results;
    }
}