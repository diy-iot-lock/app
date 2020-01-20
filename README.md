# DIY IoT lock - application
This package represents application layer for "smart lock" application. It contains all application logic that will be reused in packages that are responsible for UI.

## Installing
```
npm i -s @diy-iot-lock/app
```

## Usage
```typescript
// 1. import library
import {DIYIoTlockApp} from "@diy-iot-lock/app";

// 2. create an instance of DIYIoTlockApp
const app = new DIYIoTlockApp();

// 3. configure Azure Cognitive Services Face API
const faceUrl = "https://centralus.api.cognitive.microsoft.com/";
const faceKey = "<your face api key>";
app.setFaceConfig(faceUrl, faceKey);

// 4.a. configure Azure Blob Storage with Key
const blobName = "<your azure storage account name>";
const blobKey  = "<your azure storage account key>";
app.setBlobConfig(blobName, blobKey);

// 4.b. configure Azure Blob Storage with SAS
const blobName = "<your azure storage account name>";
const blobSAS  = "<your azure storage account SAS>";
app.setBlobConfigSAS(blobName, blobSAS);

// 5. initialize app
await app.initializeAsync();

// 6. now you can start using the library
```

### Training
```typescript
await app.train.addPersonAsync(person: PersonModel): Promise<PersonModel>
await app.train.addPersonFaceAsync(personId: string, photo: Blob, rectangle: RectangleModel): Promise<void>
```

### Predicting
```typescript
await app.predict.detectFacesAsync(photo: Blob): Promise<DetectFaceModel[]>
await app.predict.identifyFacesAsync(photo: Blob): Promise<IdentifyModel[]>
```

## Known issues

#### Using `setBlobConfigSAS` and `initializeAsync` fails with `AuthorizationFailure` error
**Description:** In case you are configuring your storage account via SAS url you may experience an issue with initializing your app.  
**Reason:** `initializeAsync` checks that container `faces` is present and public access level is set to either `container` or `blob`. For now there is no way to generate SAS url that will allow you to modify public access level of the container. So, if a container is present, but public access level is set to `none`, the `initializeAsync` method will fail.  
**How to fix:** There are 2 options:
1. Create a container called `faces` with public access level set to either `container` or `blob`.
2. Delete a container called `faces`, it will be recreated with required access level during next call of `initializeAsync`.

#### Facing `ContainerBeingDeleted` error upon calling `initializeAsync`
**Description:** `initializeAsync` failed with error message `ContainerBeingDeleted`.  
**Reason:** You had recently deleted a `faces` container. Azure Storage API may work with a small delay and container deletion may not be instantaneous. If you delete and try to recreate a container using the same name without delay, you may face this error.  
**How to fix:** Just wait a bit (usually from 1 to 5 minutes max is enough) and everything will be fixed.