import ConfigService from "./config/ConfigService";
import GeneratorService from "./helper/GeneratorService";

import {BlobServiceClient, ContainerClient, StorageSharedKeyCredential} from "@azure/storage-blob";
import {Readable} from "stream";

function getClientContainer(): ContainerClient {
    const sharedKeyCredential = new StorageSharedKeyCredential(ConfigService.Blob.Name, ConfigService.Blob.Key);
    const client = new BlobServiceClient(
        `https://${ConfigService.Blob.Name}.blob.core.windows.net`,
        sharedKeyCredential,
    );

    return client.getContainerClient(ConfigService.Blob.Container);
}

export default class BlobService {
    public static async createContainerIfNotExistsAsync(): Promise<void> {
        const clientContainer = getClientContainer();

        const isContainerExists = await clientContainer.exists();
        if (!isContainerExists) {
            await clientContainer.create({
                access: "blob",
            });
        }

        const isPubliclyAccessible = (await clientContainer.getAccessPolicy()).blobPublicAccess;
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

        const clientContainer = getClientContainer();

        const clientBlob = clientContainer.getBlockBlobClient(uniqueId);
        await clientBlob.uploadStream(content);

        return clientBlob.url;
    }

    private static _clientContainer: ContainerClient;

    private static getClientContainer() {
        if (!!this._clientContainer) {
            const sharedKeyCredential = new StorageSharedKeyCredential(ConfigService.Blob.Name, ConfigService.Blob.Key);
            const client = new BlobServiceClient(
                `https://${ConfigService.Blob.Name}.blob.core.windows.net`,
                sharedKeyCredential,
            );

            this._clientContainer = client.getContainerClient(ConfigService.Blob.Container);
        }
        return this._clientContainer;
    };
}
