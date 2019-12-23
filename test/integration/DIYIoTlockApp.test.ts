import {expect} from "chai";

import {DIYIoTlockApp} from "../../src/DIYIoTlockApp";
import ConfigService from "../../src/service/config/ConfigService";
import SecretService from "../../src/service/config/SecretService";

afterEach(() => {
    SecretService.Blob.Name = "";
    SecretService.Blob.Key = "";
    SecretService.Blob.SAS = "";
    ConfigService.initializeBlob();

    SecretService.Face.Url = "";
    SecretService.Face.Key = "";
    ConfigService.initializeFace();
});

describe("DIY IoT lock Application - integration", () => {
    const blobName = "";
    const blobKey = "";
    const blobSAS = "";
    const faceUrl = "";
    const faceKey = "";

    it("initializeAsync (key)", async () => {
        const app = new DIYIoTlockApp();

        app.setBlobConfig(blobName, blobKey);
        app.setFaceConfig(faceUrl, faceKey);

        try {
            await app.initializeAsync();
        } catch (e) {
            expect.fail(null, null, e);
        }
    });

    it("initializeAsync (sas)", async () => {
        const app = new DIYIoTlockApp();

        app.setBlobConfigSAS(blobName, blobSAS);
        app.setFaceConfig(faceUrl, faceKey);

        try {
            await app.initializeAsync();
        } catch (e) {
            expect.fail(null, null, e);
        }
    });
});