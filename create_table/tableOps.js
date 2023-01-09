const AWS = require('aws-sdk');
const config = {
    endpoint: "http://localhost:8000", 
    accessKeyId: 'fakeMyKeyId', 
    secretAccessKey: 'fakeSecretAccessKey', 
    region: "ap-south-1"
}

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
