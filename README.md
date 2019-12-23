# DIY IoT lock - application

## Install
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
await app.train.addPersonFaceAsync(personId: string, photo: Readable, rectangle: RectangleModel): Promise<void>
```

### Predicting
```typescript
await app.predict.detectFacesAsync(photo: Readable): Promise<DetectFaceModel[]>
await app.predict.identifyFacesAsync(photo: Readable): Promise<IdentifyModel[]>
```