# DIY IoT lock - application

## Install
```
npm i -s @diy-iot-lock/app
```

## Usage
```typescript
// import library
import {DIYIoTlockApp} from "@diy-iot-lock/app";

// create an instance of DIYIoTlockApp
const app = new DIYIoTlockApp();

// configure Azure Cognitive Services Face API
const faceUrl = "https://centralus.api.cognitive.microsoft.com/";
const faceKey = "<your face api key>";
app.setFaceConfig(faceUrl, faceKey);

// configure Azure Blob Storage
const blobName = "<your azure storage account name>";
const blobKey  = "<your azure storage account key>";
app.setBlobConfig(blobName, blobKey);

// initialize app
await app.initializeAsync();

// now you can start using the library
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