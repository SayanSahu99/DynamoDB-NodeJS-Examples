To configure region, secret key ...
```sh
aws configure
```

```sh
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

#### AWS.DynamoDB.DocumentClient
> It simplifies working with items by abstracting details
- No need to specify types (string, number, etc.)

#### Notes
- Using AWS.DynamoDB, data types had to be specified (string, number, etc.).  But numbers had to be passed as strings.  When using AWS.DynamoDB.DocumentClient, you do not have to declare types, but numbers should be numbers, and so on.
- Conditional writes:
  - are idempotent, making same conditional request multiple times, only the first successful request will have effect.
  - return ConditionalCheckFailedException if condition fails.
  - It doesn't return the consumed capacity.
  - but they do consume WCUs.
- The Atomic Counters uses the UpdateItem API
  - It increments/decrements atomically, which simply means it is altering the value of one attribute without affecting others
  - Not idempotent: multiple requests will change the attribute value multiple times.
  - All requests are applied in order
  - This kind of operation would not be acceptable in applications where accuracy was important
- The maximum amount of data a single scan or query read operation can return is 1 MB.  It can be set lower, but not higher.  For operations which need to return more than 1 MB, AWS offers paginated reads.
  - In this case, the response would contain an additional parameter:  `LastEvaluatedKey`
  - This is the set of index attributes of the next item up to which the response was returned
  - This can be used in a subsequent query or scan to retrieve the next page of data, using `ExclusiveStartKey`
  - If there is no `LastEvaluatedKey` parameter in the response, then you have reached the last page.

#### Refs

- [DynamoDB](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html)
- [DynamoDB.DocumentClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)

- [npm async](https://www.npmjs.com/package/async)
- [npm underscore](https://www.npmjs.com/package/underscore)