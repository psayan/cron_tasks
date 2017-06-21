import { CronJob } from 'cron';
// import * as mongoose from 'mongoose';

interface cronTask {
    id: string,
    schedule: string,
    task: (time: Date) => Promise<void>
}

interface cronTaskSchema {
    id: string,
    jobId: string,
    startTime: Date,
    endTime?: Date,
    error?: {
        message: string,
        codes: string[]
    }
}

export function processTasks(tasks: Set<cronTask>): void {
    for (let task of tasks) {
        processTask(task)
    }
}

export function processTask(task: cronTask): void {
    // question
    // check task schedule validity
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
                        taskDetail.endTime = new Date()
                        return addToDB(taskDetail)
                    }, (err: Error) => {
                        taskDetail.endTime = new Date()
                        taskDetail.error = {
                            message: err.message,
                            codes: []
                        }
                        return addToDB(taskDetail)
                    })
                    .catch(err => {
                        //Db Error handling
                    })

                // Do error handling
            },
            () => { },
            true,
            'Asia/India'
        );
    } catch (e) {

    }
}



function addToDB(taskDetail: cronTaskSchema): Promise<void> {
    // Add taskdetail to database
    return new Promise<void>((res, rej) => { })
}