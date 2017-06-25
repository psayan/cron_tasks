import * as fs from 'fs';

let file: string = '../data/task_log.json';

export interface cronTaskSchema {
    id: string,
    jobId: string,
    startTime: Date,
    endTime?: Date,
    error?: {
        message: string,
        codes: string[]
    }
}

export function addToDB(taskDetail: cronTaskSchema): Promise<void> {
    // Add taskdetail to database
    return new Promise<void>((res, rej) => {
        fs.readFile(file, 'utf-8', (err, data) => {
                if (err) {
                    console.log('Error while reading file: ');
                    rej(err);
                }
                const db = JSON.parse(data);
                db[taskDetail.id] = taskDetail;
                fs.writeFile(file, JSON.stringify(db), (err) => {
                    console.log('Error while writing file: ');
                    rej(err);
                })
                res(); //not accecpting data
            }
        )
    })
}