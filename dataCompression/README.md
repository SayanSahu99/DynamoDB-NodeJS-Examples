

### Handling Large Items

#### Compression and Binary and Storing in S3

Use [pako](https://www.npmjs.com/package/pako) for data compression, which wraps some zlib functionality and has better stats.

Notes:

-   using compression to save attributes in binary format has the drawback of not allowing you to search for keywords or use filtering.
-   if using own administrator role instead of the training role, you don't need to worry about the IAM permissions segment.
