#!/bin/bash

mkdir -p tmp-data/html

PUB_JSON="$1"
ID="$2"

if [[ -z "$ID" ]]; then
	(>&2 echo "No ID supplied")
	exit 1
fi

URL="https://www.jdwetherspoon.com$(jq -rM ".regions[].subRegions[].items[] | select(.id == \"$ID\").url" $PUB_JSON)"

(>&2 echo Fetching pub $ID from $URL)

PAGE="$(curl -s "$URL")"

if [[ -z "$PAGE" ]]; then
	(>&2 echo "Error fetching page at $URL")
	exit 1
fi

echo "$PAGE" > "tmp-data/html/$ID.html"

OPENINGTIMES=$(echo $PAGE | \
	pup '.opentime-block tr json{}' | \
	jq -Mr "{ openingTimes: (map(.children) | map({(.[0].text): .[1].text}) | add), id: \"$ID\", url: \"$URL\" }")

IMAGES=$(echo $PAGE | \
	pup '.gallery-carousel__slide > a json{}' | \
	jq -Mr '{images: map((.href / "?")[0])}')

jq -s '. | add' <(echo $OPENINGTIMES) <(echo $IMAGES)
