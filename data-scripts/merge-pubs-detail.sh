#!/bin/bash

jq -s '. | sort_by(.id)' tmp-data/detail/*.json > public/data/pubs-detail.json
