const AWS = require('aws-sdk');
const config = require('../config');

AWS.config.update(config);

const dbClient = new AWS.DynamoDB();

const params = {
    TableName: 'td_notes',
    AttributeDefinitions: [
        {
          AttributeName: 'user_id',
          AttributeType: 'N'
        },
        {
          AttributeName: 'timestamp',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'user_id',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'timestamp',
          KeyType: 'RANGE'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      },
      StreamSpecification: {
        StreamEnabled: false
      }
};

dbClient.createTable(params, (err, data) => {
    if(err) {
        console.log(JSON.stringify(err, null, 2));
    }

    else {
        console.log(JSON.stringify(data, null, 2));
    }
});
