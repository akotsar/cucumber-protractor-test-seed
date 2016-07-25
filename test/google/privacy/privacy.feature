Feature: The Privacy Page

    Background:
        Given I am on the Google home page
        When I navigate to the Privacy page

    Scenario: Navigating to Key terms
        When I click the "Key terms" link in the Privacy navigation menu
        Then the privacy page should display the following key terms:
            | Term                                      |
            | Affiliates                                |
            | Application data cache                    |
            | Browser web storage                       |
            | Cookies and similar technologies          |
            | Device                                    |
            | Google Account                            |
            | HTTP Referrer                             |
            | IP address                                |
            | Non-personally identifiable information   |
            | Personal information                      |
            | Pixel tag                                 |
            | Sensitive Categories                      |
            | Sensitive personal information            |
            | Server logs                               |
            | Unique device identifier                  |
