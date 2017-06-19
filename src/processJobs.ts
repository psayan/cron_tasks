import { CronJob } from 'cron';
import * as Promise from 'promise';
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
        codes: string
    }
}

function processTasks(tasks: cronTask[]): void {
    
}