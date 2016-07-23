export class SearchPage {
    private query: protractor.ElementFinder;
    private searchButton: protractor.ElementFinder;
    private resultStats: protractor.ElementFinder;

    constructor() {
        this.query = element(by.css('input[name="q"]'));
        this.searchButton = element(by.css('button[valye="Search"]'));
        this.resultStats = element(by.id('resultStats'));
    }

    public enterSearchQuery(query: string): Promise<void> {
        return this.query.sendKeys(query);
    }

    public clickSearch(): Promise<void> {
        return this.searchButton.click();
    }

    public getNumberOfResults(): Promise<number> {
        return this.resultStats.getText()
            .then(text => {
                let stringNumber = /^About ([\d,]+) results/.exec(text)[1];
                return parseInt(stringNumber.replace(',', ''));
            });
    }
}