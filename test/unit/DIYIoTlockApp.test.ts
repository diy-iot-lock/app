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

describe("DIY IoT lock Application - unit", () => {
    it("instantiate", () => {
        const app = new DIYIoTlockApp();
    });

    it("setBlobConfig", () => {
        const app = new DIYIoTlockApp();

        expect(ConfigService.Blob.Name).to.be.empty;
        expect(ConfigService.Blob.Key).to.be.empty;
        expect(ConfigService.Blob.SAS).to.be.empty;

        const name = "name";
        const key = "key";

        app.setBlobConfig(name, key);

        expect(ConfigService.Blob.Name).to.be.equal(name);
        expect(ConfigService.Blob.Key).to.be.equal(key);
        expect(ConfigService.Blob.SAS).to.be.empty;
    });

    it("setBlobConfigSAS", () => {
        const app = new DIYIoTlockApp();

        expect(ConfigService.Blob.Name).to.be.empty;
        expect(ConfigService.Blob.Key).to.be.empty;
        expect(ConfigService.Blob.SAS).to.be.empty;

        const name = "name";
        const sas = "sas";

        app.setBlobConfigSAS(name, sas);

        expect(ConfigService.Blob.Name).to.be.equal(name);
        expect(ConfigService.Blob.Key).to.be.empty;
        expect(ConfigService.Blob.SAS).to.be.equal(sas);
    });

    it("setFaceConfig", () => {
        const app = new DIYIoTlockApp();

        expect(ConfigService.Face.Url).to.be.empty;
        expect(ConfigService.Face.Key).to.be.empty;

        const url = "url";
        const key = "key";

        app.setFaceConfig(url, key);

        expect(ConfigService.Face.Url).to.be.equal(`${url}/face/v1.0`);
        expect(ConfigService.Face.Key).to.be.equal(key);
    });
});