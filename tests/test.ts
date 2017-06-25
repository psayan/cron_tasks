import { assert } from 'chai';
import { cronTaskSchema, addToDB } from '../src/db';

let file: string = '../data/task_log.json';

describe('#addToDB()', function() {
    it('should add attribute to json', function() {
        let jobRun:cronTaskSchema = {
            id: '1',
            jobId: '1.343270937',
            startTime: new Date()
        };
        let bcount: number = Object.keys(JSON.parse(file)).length;
        addToDB(jobRun).then(() => {
                let acount: number = Object.keys(JSON.parse(file)).length;
                assert.equal(bcount, acount, 'Count increased by 1')
            }
        );

    })
})