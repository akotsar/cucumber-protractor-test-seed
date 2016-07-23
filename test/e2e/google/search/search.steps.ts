let chai: Chai.ChaiStatic = require('chai').use(require('chai-as-promised'));
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
        this.app.goToSearch();
        done();
    };

    @when(/^I enter "(.*)" in the search field$/)
    private whenIEnterInTheSearchField(query: string, done: Callback): void {
        this.search.enterSearchQuery(query).then(done);
    };

    @when(/^I click the search button$/)
    private whenIClickTheSearchButton(done: Callback): void {
        this.search.clickSearch().then(done);
    };

    @then(/^more than "(.*)" search results are displayed$/)
    private thenMoreThanSearchResultsAreDisplayed(minResults: number, done: Callback): void {
        browser.sleep(3000).then(() => 
            expect(this.search.getNumberOfResults).to.greaterThan(minResults).and.notify(done)
        );
    };
}

export = SearchSteps;
