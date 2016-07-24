let chai: Chai.ChaiStatic = require('chai')
    .use(require('chai-things'))
    .use(require('chai-as-promised'))
    .use(require('chai-string'));

chai.should();
let expect = chai.expect;

import {binding, given, when, then} from "cucumber-tsflow";
import Callback = cucumber.CallbackStepDefinition;

import {App} from '../app';
import {SearchPage} from './search.page';

@binding()
class SearchSteps {
    private app: App = new App();
    private search: SearchPage = new SearchPage();

    @given(/^I am on the Google search page$/)
    private async givenIAmOnTheSearchPage() {
        await this.app.goToSearch();
    };

    @when(/^I enter "([^"]*)" in the search field$/)
    private async whenIEnterInTheSearchField(query: string) {
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
}

export = SearchSteps;
