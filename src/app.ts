import * as express from 'express';
import * as bodyParser from 'body-parser';
import {processTasks} from './processJobs';


const app = express();
const port = process.env.port || 8000;

app.use(bodyParser.json());

app.post('/api/process-jobs', startJobs);

// request should have and attribute 'tasks' which will have jobs array

function startJobs(request: express.Request, response: express.Response) {
    processTasks(request.body.tasks);
    response.status(200);
    response.send("Jobs sent for processing");
}