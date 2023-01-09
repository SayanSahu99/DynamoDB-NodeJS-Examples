# Using DynamoDB with Node JS ([source](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.html))

### AWS's DynamoDB + NodeJS.

Steps:

1. Make sure you have `npm` installed
2. Make sure AWS DynamoDB is running locally. For guide how to run DynamoDB on local environment, check out [this page](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html).
3. Once you have DynamoDB currently running locally, run the code. For example, to create table, run `node tableOps/createTable.js`.

### Connecting DynamoDB table to AWS

To connect it to your own actual AWS account, modify the `config.js` or keep it unmodified:

```
const config = {
    endpoint: "http://localhost:8000", 
    accessKeyId: 'fakeMyKeyId', 
    secretAccessKey: 'fakeSecretAccessKey', 
    region: "ap-south-1"
};
```
