## AWS CLI

### Set up environment

> Preparing the local environment
1. Sign up for a free tier AWS Account.
2. Install [AWS-CLI (V2)](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html). 
3. Create IAM role
    - Set up a limited IAM role.
    - If no admin IAM role and use main account, follow [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html)
4. Add access key, secret access key, and default region
    - If can't connect to the DB, run `aws sts get-caller-identity`
    - If you don't have the credentials in place, try `aws configure`, as described [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration)

### Table Level Operations
- See table details:  `aws dynamodb describe-table --table-name td_notes`
- Create a new table:  `aws dynamodb create-table --table-name td_notes_test --attribute-definitions AttributeName=user_id,AttributeType=S AttributeName=timestamp,AttributeType=N --key-schema AttributeName=user_id,KeyType=HASH AttributeName=timestamp,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1`
- Verify new table details:  `aws dynamodb describe-table --table-name td_notes_test`
- See list of tables (equivalent to `node list-tables`):  `aws dynamodb list-tables`
- Delete new table (added back afterwards):  `aws dynamodb delete-table --table-name td_notes_test`

### Write Operations - Item Level Operations
- Add a new item:  `aws dynamodb put-item --table-name td_notes_test --item file://item.json`
- Update an existing item:  `aws dynamodb update-item --table-name td_notes_test --key file://key.json --update-expression "SET #t = :t" --expression-attribute-names file://attribiute-names.json --expression-attribute-values file://attribute-values.json`
- Delete an existing item:  `aws dynamodb delete-item --table-name td_notes_test --key file://key.json`
- Perform multiple operations at once:  `aws dynamodb batch-write-item --request-items file://items.json`

### Read Operations - Item Level Operations
- Get an item from the table: `aws dynamodb get-item --table-name td_notes_test --key file://read-key.json`
- Get an item using a filter: <sup style="color: red">1</sup>  `aws dynamodb query --table-name td_notes_test --key-condition-expression "user_id = :uid AND #t > :t" --expression-attribute-value file://expression-attribute-values.json --expression-attribute-name file://expression-attribute-names.json`
- Get an item using more than one filter: `aws dynamodb query --table-name td_notes_test --key-condition-expression "user_id = :uid AND #t > :t" --expression-attribute-value file://expression-attribute-values.json --expression-attribute-name file://expression-attribute-names.json --filter-expression "cat = :cat"`
- Add the --return-consumed-capacity flag: <sup style="color: red">2</sup> `aws dynamodb query --table-name td_notes_test --key-condition-expression "user_id = :uid AND #t > :t" --expression-attribute-value file://expression-attribute-values.json --expression-attribute-name file://expression-attribute-names.json --filter-expression "cat = :cat" --return-consumed-capacity INDEXES --consistent-read --no-scan-index-forward`
- Get multiple items (must specify the primary key): `aws dynamodb batch-get-item --request-items file://getBatchItems.json`
- Scan the table rather than query it, and format the response as a table just because: <sup style="color: red">3</sup> `aws dynamodb scan --table-name td_notes_test --output table`
- Scan the table and add a filter expression: <sup style="color: red">4</sup> `aws dynamodb scan --table-name td_notes_test --filter-expression "username = :uname" --expression-attribute-values file://uname.json --output table`

NOTES:- 

- For batch-write-item, the table name must be specified in the items.json file, as the key set equal to the array of operation to be performed. 

-  These operations can be done with the AWS SDK much more easily. 

-  A full list of DynamoDB AWS-CLI commands can be found [here](https://docs.aws.amazon.com/cli/latest/reference/dynamodb/index.html). 

- For 'Attribute name is a reserved keyword; reserved keyword: timestamp,' error use syntax: #t and :t with the corresponding file(s).

`--return-consumed-capacity` 
- returns the RCUs or WCUs used, and can take one of three values:
    - INDEXES: overall consumed capacity for the table as well as indexes if any
    - TOTAL: only the consumed capacity for the table
    - NONE
</br>
This will return an object like this one at the end of the query:

```bash
"ConsumedCapacity": {
    "TableName": "td_notes_test",
    "CapacityUnits": 0.5,
    "Table": {
        "CapacityUnits": 0.5
    }
}
```

- The `--consistent-read` flag tells the cli to run the command with strong consistency, which doubles the consumed capacity
- You can specify what order the results are returned in by using one of two flags:
  - `--scan-index-forward` returns results in ascending order by sort key (default)
  - `--no-scan-index-forward` returns results in descending order by sort key

- Scanning instead of querying will look at every index in the table, and not use any resources.  The `--output` flag accepts any of four choices:
  - json (default)
  - text
  - table
  - yaml

- Scanning with a filter expression will still look at every index in the table, and not use any resources, but will return the results which pass the filter.