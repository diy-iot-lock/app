import TrainApplication from "./application/TrainApplication";
import ConsoleLogService from "./service/ConsoleLogService";
import {PersonModel} from "./application/model/Person/PersonModel";
import PredictApplication from "./application/PredictApplication";
import * as fs from "fs";

async function main() {
    const log = new ConsoleLogService();
    const trainApplication = new TrainApplication(log);
    const predictApplication = new PredictApplication(log);

    await trainApplication.Initialize();

    let person = new PersonModel();
    person.name = "overlord";

    person = await trainApplication.addPersonAsync(person);

    const path = "";
    const stream1 = fs.createReadStream(path);

    const faces = await predictApplication.detectFacesAsync(stream1);
    const myFace = faces[0];

    const stream2 = fs.createReadStream(path);
    await trainApplication.addPersonFaceAsync(person.personId, stream2, myFace.faceRectangle);

    const path3 = "";
    const stream3 = fs.createReadStream(path3);

    const results = await predictApplication.identifyFacesAsync(stream3);

    console.log(results);
}

main()
    .then(() => { console.log("TTFN!") },
        (e) => { console.log(e) });
