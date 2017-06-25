var fs = require('fs');

j = JSON.parse(fs.readFileSync('../data/task_log.json'));
j.a = 'd';
fs.writeFile('../data/task_log.json', JSON.stringify(j), (err) => {
    if(err) {
        console.log(err);
    }
});