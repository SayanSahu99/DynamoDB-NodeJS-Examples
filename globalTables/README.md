## Cross-Region Replication Using Global Tables and Auto-Scaling

### Create the Global Table

1. Create a new table
2. Add two LSIs and one GSI

-   GSI: note_id-index
-   LSI: user_id-cat-index
-   LSI: user_id-title-index

3. Create table.
4. Enable Streams. Overview > Manage Stream > New and Old Images
5. Go to the Global Tables tab and add a replica to the Frankfurt region. You should get a success message after a few seconds.

### Table Operations

Check [globalTables/globalTables.js](../Section11-12/globalTables.js) for an alternative to setting and resetting the AWS.config region property.

### Auto-Scaling

Trigger auto-scaling by writing code to initiate full-table scans on intervals, needs lots of data in the database to mimic throttling. Add pagination logic.

-   Pagination callback logic: [this github repo](https://gist.github.com/andrhamm/dd5bcb41cb32ed1818259b88c7a48d7e).
-   Modified pagination logic [globalTables/bulkReads.js](../Section11-12/bulkReads.js)
-   Can be tested in both regions by commenting/uncommenting the desired instantiation.