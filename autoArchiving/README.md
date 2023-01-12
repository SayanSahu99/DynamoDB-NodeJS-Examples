
### Create Archive Table and Add Trigger

Enabling streams and creating a trigger on the global notes table. When an item expires based on TTL, the lambda should fire and migrate the item to a new archive table, with all of its attributes or move the data to S3.

1. Create a new table.
2. Add a trigger, using a role.
3. Set the trigger on the global table created set the batch size to 5.
4. Use either 'Latest' or 'Trim Horizon' as the starting position, but 'Trim Horizon' starts at the last untrimmed stream record
5. Do not enable the trigger yet, create the function without it.
6. Remove the async from the function to make it work as expected.