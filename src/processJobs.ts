import { CronJob } from 'cron';
import * as Promise from 'promise';
import * as express from 'express';
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
    endTime: Date,
    error?: {
        message: string,
        codes: string[]
    }
}

function processTasks(tasks: cronTask[]): void {
    for(let task of tasks) {
        let taskDetail: cronTaskSchema;
        // question
        // check task schedule validity
        try {
            let job: CronJob = new CronJob(task.schedule,
                function (): void {
                    const startTime = new Date();
                    taskDetail.id = task.id + startTime.toString();
                    taskDetail.jobId = task.id;
                    taskDetail.startTime = startTime;

                    let promise: Promise<void> = task.task(startTime);
                    // Do error handling
                },
                function (): void {
                    taskDetail.endTime = new Date();
                },
                true,
                'Asia/India'
            );
        }
        catch (e) {
            const startTime = new Date();
            taskDetail.id = task.id + startTime.toString();
            taskDetail.jobId = task.id;
            taskDetail.startTime = startTime;
            taskDetail.endTime = new Date();
            taskDetail.error.message = e.message;
            taskDetail.error.codes.push(e.name);
        }
        addToDB(taskDetail); // Why not able to refer declared variable
    }
}

function addToDB(taskDetail: cronTaskSchema): void {
    // Add taskdetail to database
}