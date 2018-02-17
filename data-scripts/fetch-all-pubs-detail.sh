#!/bin/bash
RAW_PUBS="$(bash data-scripts/fetch-pubs.sh)"
PUBS="$(echo "$RAW_PUBS" | jq -Mrc '.regions[].subRegions[].items[] | select(.isHotel | not) | .id')"

mkdir -p tmp-data/detail

echo $RAW_PUBS > tmp-data/all-pubs.json

function fetch_pub() {
	ID=$0
	data-scripts/fetch-pub-detail.sh tmp-data/all-pubs.json "$ID" > "tmp-data/detail/$ID.json"
}

export -f fetch_pub

echo "$PUBS" | sort | uniq | wc -l

echo "$PUBS" | gxargs --max-procs=50 -n 1 bash -c 'fetch_pub "$@"'
