#!/bin/bash

curl -s "https://www.jdwetherspoon.com/pubs/all-pubs" | \
	pup ':parent-of(.js-facilities) json{}' | \
 	jq '. | map(.children | add | {(.value): .text}) | add'
