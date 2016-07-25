Feature: Serching in Google

    Scenario: Search for Cucumber and Protractor
        Given I am on the Google home page
        When I enter "protractor cucumber" in the search field
        And I click the search button
        Then more than "40000" search results are displayed

    Scenario Outline: Going through pages
        Given I am on the Google home page
        When I enter "protractor cucumber" in the search field
        And I click the search button
        And I go to search results page "<Page>"
        Then The "<Result>" search result is displayed

        Examples:
            | Page | Result                                             |
            | 2    | Protractor Cucumber Framework                      |
            | 5    | Testing AngularJS Apps End to End Using Protractor |

    Scenario: Display related searches
        Given I am on the Google home page
        When I enter "protractor cucumber" in the search field
        And I click the search button
        Then searches related to the entered search query are displayed