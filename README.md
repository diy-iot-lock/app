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

// now you can start using the library
```

### Training
```typescript
app.train.addPersonAsync(person: PersonModel): Promise<PersonModel>
app.train.addPersonFaceAsync(personId: string, photo: Readable, rectangle: RectangleModel): Promise<void>
```

### Predicting
```typescript
app.predict.detectFacesAsync(photo: Readable): Promise<DetectFaceModel[]>
app.predict.identifyFacesAsync(photo: Readable): Promise<IdentifyModel[]>
```