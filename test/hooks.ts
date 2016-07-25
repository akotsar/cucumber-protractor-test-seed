import {binding, before, after} from "cucumber-tsflow";
import {HookScenario} from 'cucumber';

import {Utils} from './utils';

/**
 * Contains application-wide steps.
 */
@binding()
class Hooks {
    /**
     * An example 'before' hook that will be run before every scenario.
     */
    @before()
    private async beforeEach(scenario: HookScenario) {
        console.log(`Starting scenario '${scenario.getName()}'...`);
    }

    /**
     * An example 'after' hook that will be run after every scenario.
     */
    @after()
    private async afterEach(scenario: HookScenario) {
        let success = scenario.isSuccessful() ? 'successfully' : 'unsuccessfully';
        console.log(`The scenario '${scenario.getName()}' has completed ${success}`);

        // Taking a screenshot of the browser if the scenario has failed.
        if (scenario.isFailed()) {
            let screenshot = await browser.takeScreenshot();
            let browserName = (await browser.getCapabilities()).get('browserName');
            let filename = browserName + ' FAIL - ' + scenario.getName() + '.png';

            Utils.writeScreenshot(screenshot, filename) 
        }
    }
}

export = Hooks;