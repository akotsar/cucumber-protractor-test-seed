export class SearchPage {
    private query: protractor.ElementFinder;
    private searchButton: protractor.ElementFinder;
    private resultStatsLocator: webdriver.Locator;
    private pager: protractor.ElementFinder;
    private resultsLocator: webdriver.Locator;

    constructor() {
        this.query = $('input[name="q"]');
        this.searchButton = $('button[value="Search"]');
        this.resultStatsLocator = by.id('resultStats');
        this.pager = element(by.css('table[id="nav"]'));
        this.resultsLocator = by.css('div.srg div.g h3');
    }

    public enterSearchQuery(query: string): Promise<void> {
        return this.query.sendKeys(query);
    }

    public clickSearch(): Promise<any> {
        this.searchButton.click();
        browser.sleep(1000);
        return browser.wait(protractor.ExpectedConditions.visibilityOf(element(this.resultStatsLocator)));
    }

    public getNumberOfResults(): Promise<any> {
        return element(this.resultStatsLocator).getText().then(text => {
            let stringNumber = /^About ([\d,]+) results/.exec(text)[1];
            return parseInt(stringNumber.replace(',', ''));
        });
    }

    public goToResultsPage(page: number): Promise<any> {
        let link = this.pager.all(by.css('tbody td')).get(page).element(by.css('a'));
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(link));
        link.click();
        return browser.wait(protractor.ExpectedConditions.textToBePresentInElement(element(by.id('resultStats')), 'Page ' + page + ' '));
    }

    public getResults(): Promise<Promise<string>[]> {
        return element.all(this.resultsLocator)
            .map(element => element.getText());
    }
}