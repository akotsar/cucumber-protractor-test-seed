import {binding, before, after} from "cucumber-tsflow";
import { HookScenarioResult, Status } from 'cucumber';
import { browser } from 'protractor'
const { When, Then } = require("cucumber");

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
    private async beforeEach(scenario: HookScenarioResult) {
        console.log(`Starting scenario '${scenario.pickle.name}'...`);
    }

    /**
     * An example 'after' hook that will be run after every scenario.
     */
    @after()
    private async afterEach(scenario: HookScenarioResult) {
        let success = scenario.result.status === Status.PASSED ? 'successfully' : 'unsuccessfully';
        console.log(`The scenario '${scenario.pickle.name}' has completed ${success}`);

        // Taking a screenshot of the browser if the scenario has failed.
        if (scenario.result.status === Status.FAILED) {
            let screenshot = await browser.takeScreenshot();
            let browserName = (await browser.getCapabilities()).get('browserName');
            let filename = browserName + ' FAIL - ' + scenario.pickle.name + '.png';

            Utils.writeScreenshot(screenshot, filename) 
        }
    }
}

export = Hooks;