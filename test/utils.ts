let fs = require('fs');
let config = require('../config/config');

export class Utils {
    public static writeScreenshot(data, filename) {
        if (!config.screenshotsPath) {
            return;
        }

        let stream = fs.createWriteStream(config.screenshotsPath + filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }
}