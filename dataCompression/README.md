

### Handling Large Items

#### Compression and Binary and Storing in S3

Use [pako](https://www.npmjs.com/package/pako) for data compression, which wraps some zlib functionality and has better stats.

Notes:

-   using compression to save attributes in binary format has the drawback of not allowing you to search for keywords or use filtering.
-   if you are using your own administrator role instead of the training role demonstrated at the beginning of the course, you don't need to worry about the IAM permissions segment.
