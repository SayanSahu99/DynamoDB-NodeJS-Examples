## AWS CLI

- See table details:  `aws dynamodb describe-table --table-name udemy_ddb_notes`
- Create a new table:  `aws dynamodb create-table --table-name udemy_ddb_notes_cliTest --attribute-definitions AttributeName=user_id,AttributeType=S AttributeName=timestamp,AttributeType=N --key-schema AttributeName=user_id,KeyType=HASH AttributeName=timestamp,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1`
- Verify new table details:  `aws dynamodb describe-table --table-name udemy_ddb_notes_cliTest`
- See list of tables (equivalent to `node list-tables`):  `aws dynamodb list-tables`
- Delete new table (added back afterwards):  `aws dynamodb delete-table --table-name udemy_ddb_notes_cliTest`
- Add a new item:  `aws dynamodb put-item --table-name udemy_ddb_notes_cliTest --item file://item.json`
- Update an existing item:  `aws dynamodb update-item --table-name udemy_ddb_notes_cliTest --key file://key.json --update-expression "SET #t = :t" --expression-attribute-names file://attrNames.json --expression-attribute-values file://attrValues.json`
- Delete an existing item:  `aws dynamodb delete-item --table-name udemy_ddb_notes_cliTest --key file://key.json`
- Perform multiple operations at once:  `aws dynamodb batch-write-item --request-items file://items.json`
- Get an item from the table: `aws dynamodb get-item --table-name udemy_ddb_notes_cliTest --key file://read-key.json`
- Get an item using a filter: <sup style="color: red">1</sup>  `aws dynamodb query --table-name udemy_ddb_notes_cliTest --key-condition-expression "user_id = :uid AND #t > :t" --expression-attribute-value file://expression-attribute-values.json --expression-attribute-name file://expression-attribute-names.json`
- Get an item using more than one filter: `aws dynamodb query --table-name udemy_ddb_notes_cliTest --key-condition-expression "user_id = :uid AND #t > :t" --expression-attribute-value file://expression-attribute-values.json --expression-attribute-name file://expression-attribute-names.json --filter-expression "cat = :cat"`
- Add the --return-consumed-capacity flag: <sup style="color: red">2</sup> `aws dynamodb query --table-name udemy_ddb_notes_cliTest --key-condition-expression "user_id = :uid AND #t > :t" --expression-attribute-value file://expression-attribute-values.json --expression-attribute-name file://expression-attribute-names.json --filter-expression "cat = :cat" --return-consumed-capacity INDEXES --consistent-read --no-scan-index-forward`
- Get multiple items (must specify the primary key): `aws dynamodb batch-get-item --request-items file://getBatchItems.json`
- Scan the table rather than query it, and format the response as a table just because: <sup style="color: red">3</sup> `aws dynamodb scan --table-name udemy_ddb_notes_cliTest --output table`
- Scan the table and add a filter expression: <sup style="color: red">4</sup> `aws dynamodb scan --table-name udemy_ddb_notes_cliTest --filter-expression "username = :uname" --expression-attribute-values file://uname.json --output table`

<span style="color: yellow;">NOTES:</span> 

<span style="color: yellow;">-></span> For batch-write-item, the table name must be specified in the items.json file, as the key set equal to the array of operation to be performed. 

<span style="color: yellow;">-></span>  Can be elegantly done with the AWS SDK in the next section. 

<span style="color: yellow;">-></span>  A full list of DynamoDB AWS-CLI commands can be found [here](https://docs.aws.amazon.com/cli/latest/reference/dynamodb/index.html). 

<span style="color: red;">-></span> If you see an error such as 'Attribute name is a reserved keyword; reserved keyword: timestamp,' you need to employ the kind of syntax used here, #t and :t with the corresponding file(s).