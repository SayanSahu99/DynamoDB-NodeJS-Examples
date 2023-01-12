const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

const getParams = {
  TableName: "td_notes_sdk",
  Key: {
      user_id: "A",
      timestamp: 1
  }
};

const queryParams = {
  TableName: "td_notes_sdk",
  KeyConditionExpression: "user_id = :uid",
  ExpressionAttributeValues: {
      ":uid": "A"
  }
};

const filteredQueryParams = {
  TableName: "td_notes_sdk",
  KeyConditionExpression: "user_id = :uid and #t = :t",
  ExpressionAttributeNames: {
      "#t": "timestamp"
  },
  ExpressionAttributeValues: {
      ":uid": "A",
      ":t": 7
  }
};

const filteredScanParams = {
  TableName: "td_notes_sdk",
  FilterExpression: "cat = :cat",
  ExpressionAttributeValues: {
      ":cat": "general"
  }
};

const batchGetParams = {
    RequestItems: {
        'td_notes_sdk': {
          Keys: [
            {
               user_id: 'A',
               timestamp: 1
            },
            {
               user_id: 'B',
               timestamp: 2
            }
          ]
        },
        'udemy_ddb_notes_sdk': {
          Keys: [
            { 
                user_id: 'ABC',
                timestamp: 1
            },
          ]
        }
      }
};

docClient.batchGet(batchGetParams, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
});

// docClient.scan(filteredScanParams, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// docClient.query(filteredQueryParams, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// docClient.query(queryParams, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// docClient.get(getParams, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
