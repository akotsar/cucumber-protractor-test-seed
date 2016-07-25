export class HomePage {
    private privacyLink = element(by.linkText('Privacy'));

    public async clickPrivacy() {
        await this.privacyLink.click();
    }
}