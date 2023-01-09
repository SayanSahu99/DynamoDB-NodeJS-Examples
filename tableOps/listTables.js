const AWS = require('aws-sdk');
const config = require('../config');

AWS.config.update(config);

const dbClient = new AWS.DynamoDB();

dbClient.listTables({}, (err, data) => {
    if(err) {
        console.log(err);
    }

    else {
        console.log(data);
    }
});
