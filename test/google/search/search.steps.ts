import {binding, given, when, then} from "cucumber-tsflow";

import {SearchPage} from './search.page';
import {SearchContext} from './search.context';

@binding([SearchContext])
class SearchSteps {
    private search: SearchPage = new SearchPage();

    constructor(
        private context: SearchContext
    ) {
    }

    @when(/^I enter "([^"]*)" in the search field$/)
    private async whenIEnterInTheSearchField(query: string) {
        this.context.searchQuery = query;
        await this.search.enterSearchQuery(query);
    };

    @when(/^I click the search button$/)
    private async whenIClickTheSearchButton() {
        await this.search.clickSearch();
    };

    @when(/^I go to search results page "(.*)"$/)
    private async whenIGoToSearchResultsPage(page: number) {
        await this.search.goToResultsPage(page);
    };

    @then(/^more than "(.*)" search results are displayed$/)
    private async thenMoreThanSearchResultsAreDisplayed(minResults: number) {
        var actual = await this.search.getNumberOfResults();
        expect(actual).to.be.above(minResults);
    };

    @then(/^The "(.*)" search result is displayed$/)
    private async thenTheSearchResultIsDisplayed(result: string) {
        let results = (await this.search.getResults());
        results.should.include.something.that.satisfy(t => t.indexOf(result) == 0);
    };

    @then(/^searches related to the entered search query are displayed$/)
    private async thenSearchesRelatedToTheEnteredSearchTermAreDisplayed() {
        let actual = await this.search.getRelatedSearchesTerm();
        let expected = this.context.searchQuery;
        expect(actual).to.be.equal(expected);
    };
}

export = SearchSteps;
