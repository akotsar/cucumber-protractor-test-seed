import {binding, given, when, then} from "cucumber-tsflow";
import {HookScenario} from 'cucumber';

import {App} from './app';

/**
 * Contains application-wide steps.
 */
@binding()
class AppSteps {
    private app: App = new App();

    @given(/^I am on the Google home page$/)
    private async givenIAmOnTheMainPage() {
        await this.app.goToHomepage();
    };
}

export = AppSteps;