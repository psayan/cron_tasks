import { CronJob } from 'cron';
import { cronTaskSchema, addToDB } from './db';

interface cronTask {
    id: string,
    schedule: string,
    task: (time: Date) => Promise<void>
}

export function processTasks(tasks: Set<cronTask>): void {
    for (let task of tasks) {
        processTask(task);
    }
}

export function processTask(task: cronTask): void {
    // console.log(task.id);
    try {
        let job: CronJob = new CronJob(
            task.schedule,
            () => {
                let taskDetail: cronTaskSchema = {
                    id: task.id + Math.random(),
                    jobId: task.id,
                    startTime: new Date()
                }
                addToDB(taskDetail)
                    .then(() => task.task(taskDetail.startTime))
                    .then(() => {
                        taskDetail.endTime = new Date();
                        return addToDB(taskDetail);
                    }, (err: Error) => {
                        taskDetail.endTime = new Date();
                        taskDetail.error = {
                            message: err.message,
                            codes: []
                        }
                        return addToDB(taskDetail);
                    })
                    .catch(err => {
                        console.log('DB Error: ' + err);
                    }
                )
            },
            () => { },
            true,
            'America/Los_Angeles'
        );
    } catch (e) {
        console.log(task.id + e);
    }
}

let task: cronTask = {
    id: '1',
    schedule: '10 * * * * *',
    task: (startTime: Date): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }
}

processTask(task);