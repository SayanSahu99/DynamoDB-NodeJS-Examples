To access DynamoDB running locally with the AWS CLI, use the --endpoint-url parameter. For example, use the following command to list DynamoDB tables.

To configure region, secret key ...
```sh
aws configure
```

```sh
aws dynamodb list-tables --endpoint-url http://localhost:8000
```