import {binding, given, when, then} from "cucumber-tsflow";

import {HomePage} from '../home.page'
import {PrivacyPage} from './privacy.page';

@binding()
class PrivacySteps {
    private homepage = new HomePage();
    private privacy = new PrivacyPage();

    @when(/^I navigate to the Privacy page$/)
    public async WhenINavigateToThePrivacyPage() {
        await this.homepage.clickPrivacy();
    }

    @when(/^I click the "([^"]*)" link in the Privacy navigation menu$/)
    public async WhenIClickTheLinkInThePrivacyNavigationMenu(link: string) {
        await this.privacy.clickNavigationItem(link);
    }

    @then(/^the privacy page should display the following key terms:$/)
    public async ThePrivacyPageShouldDisplayTheFollowingKeyTerms(table: any) {
        let actualTerms = await this.privacy.getKeyTerms();
        for (let row of table.hashes()) {
            actualTerms.should.include(row.Term);
        }
    }
}

export = PrivacySteps;
