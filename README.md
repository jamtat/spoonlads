# S P O O N L A D S

Find your nearest spoons


## Updating dataset

### Pubs/Facilities Indexes
 1. Run `bash data-scripts/update-basic-data.sh` to update the pubs and facilities json files.

### Opening times/Image Links
 Updating the pub details takes a little longer (there are around 900 http requests to be made).

 1. Run `bash data-scripts/fetch-pubs-detail.sh` to dump a bunch of json files into `tmp-data/detail` (gitignored).
 2. Check over the files to try and find problematic ones. Some are bound to be corrupted or missing data. Try grepping for 'null' or finding files that won't parse with `jq`. PRs to automate this would be very welcome. You can use `data-scripts/fetch-pub-detail.sh` to update individual pubs.
 3. Run `bash data-scripts/merge-pubs-detail.sh` to update the pub detail file.
