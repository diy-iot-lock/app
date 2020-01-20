import SecretService from "../../../src/service/config/SecretService";
import ConfigService from "../../../src/service/config/ConfigService";
import BlobService from "../../../src/service/BlobService";

import * as fs from "fs";
import * as path from "path";

before(async () => {
    SecretService.Blob.Name = "";
    SecretService.Blob.Key = "";
    ConfigService.initializeBlob();
    await BlobService.createContainerIfNotExistsAsync();
});

describe("DIY IoT lock Application - blob service", () => {
    const filePath = path.join(__dirname, "test.jpg");

    it("upload file by content", async () => {
        const content = fs.readFileSync(filePath);
        const blob = new Uint8Array(content).buffer;
        await BlobService.uploadBlobAsync(blob);
        //TODO: check manually
    });

    it("upload file by stream", async () => {
        const stream = fs.createReadStream(filePath);
        await BlobService.uploadBlobAsync(stream);
        //TODO: check manually
    });
});