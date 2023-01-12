const AWS = require('aws-sdk');
const config = require('../config');

AWS.config.update(config);

const dbClient = new AWS.DynamoDB();

dbClient.describeTable({
    TableName: 'td_notes'
}, (err, data) => {
    if(err) {
        console.log(JSON.stringify(err, null, 2));
    }

    else {
        console.log(JSON.stringify(data, null, 2));
    }
});
