#!/bin/bash

mkdir -p public/data

bash data-scripts/fetch-pubs.sh > public/data/pubs.json
bash data-scripts/fetch-facilities.sh > public/data/facilities.json
