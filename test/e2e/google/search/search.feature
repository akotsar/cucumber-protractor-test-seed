Feature: Serching in Google

    Scenario: Search for Cucumber and Protractor
        Given I am on the Google search page
        When I enter "protractor cucumber" in the search field
        And I click the search button
        Then more than "40000" search results are displayed