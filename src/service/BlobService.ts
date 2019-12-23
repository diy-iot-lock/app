import ConfigService from "./config/ConfigService";
import GeneratorService from "./helper/GeneratorService";

import {BlobServiceClient, ContainerClient, StorageSharedKeyCredential} from "@azure/storage-blob";
import {Readable} from "stream";

export default class BlobService {
    public static async createContainerIfNotExistsAsync(): Promise<void> {
        const clientContainer = this.getClientContainer();

        const isContainerExists = await clientContainer.exists();
        if (!isContainerExists) {
            await clientContainer.create({
                access: "blob",
            });
        }

        const isPubliclyAccessible = (await clientContainer.getProperties()).blobPublicAccess;
        if (!isPubliclyAccessible) {
            await clientContainer.setAccessPolicy("blob");
        }
    }

    public static async uploadBlobAsync(content: Readable): Promise<string> {
        // TODO: refactoring needed
        const size = 10;
        let uniqueId = GeneratorService.getUniqieNumber(size).toString();
        while (uniqueId.length < size) {
            uniqueId = "0" + uniqueId;
        }

        const clientContainer = this.getClientContainer();

        const clientBlob = clientContainer.getBlockBlobClient(uniqueId);
        await clientBlob.uploadStream(content);

        return clientBlob.url;
    }

    public static reset() {
        this._clientContainer = undefined;
    }

    private static _clientContainer?: ContainerClient;

    private static getClientContainer() {
        if (!this._clientContainer) {
            let client = null;
            let url = `https://${ConfigService.Blob.Name}.blob.core.windows.net/`;
            if (!!ConfigService.Blob.Key) {
                const credential = new StorageSharedKeyCredential(ConfigService.Blob.Name, ConfigService.Blob.Key);
                client = new BlobServiceClient(url, credential);
            } else if (!!ConfigService.Blob.SAS) {
                url += ConfigService.Blob.SAS;
                client = new BlobServiceClient(url);
            } else {
                throw new Error("Either Blob.Key or Blob.SAS should be set");
            }

            this._clientContainer = client.getContainerClient(ConfigService.Blob.Container);
        }
        return this._clientContainer;
    };
}
