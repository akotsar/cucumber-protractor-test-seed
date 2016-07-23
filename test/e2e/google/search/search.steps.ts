let chai = require('chai').use(require('chai-things')).use(require('chai-as-promised'));
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
    private givenIAmOnTheSearchPage(done: Callback): void {
        this.app.goToSearch().then(done);
    };

    @when(/^I enter "([^"]*)" in the search field$/)
    private whenIEnterInTheSearchField(query: string, done: Callback): void {
        this.search.enterSearchQuery(query).then(done);
    };

    @when(/^I click the search button$/)
    private whenIClickTheSearchButton(done: Callback): void {
        this.search.clickSearch().then(() => done());
    };

    @when(/^I go to search results page "(.*)"$/)
    private whenIGoToSearchResultsPage(page: number, done: Callback): void {
        this.search.goToResultsPage(page).then(() => done());
    };

    @then(/^more than "(.*)" search results are displayed$/)
    private thenMoreThanSearchResultsAreDisplayed(minResults: number, done: Callback): void {
        expect(this.search.getNumberOfResults()).to.eventually.be.greaterThan(minResults).and.notify(done);
    };

    @then(/^The "(.*)" search result is displayed$/)
    private thenTheSearchResultIsDisplayed(result: string, done: Callback): void {
        expect(this.search.getResults()).to.eventually.include.something.that.satisfy(t => t.indexOf(result) == 0).and.notify(done);
    };
}

export = SearchSteps;
