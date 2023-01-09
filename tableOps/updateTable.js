const AWS = require('aws-sdk');
const config = require('../config');

AWS.config.update(config);

const dbClient = new AWS.DynamoDB();

dbClient.updateTable({
    TableName: 'td_notes',
    ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 1
    }
}, (err, data) => {
    if(err) {
        console.log(JSON.stringify(err, null, 2));
    }

    else {
        console.log(JSON.stringify(data, null, 2));
    }
});
