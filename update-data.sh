#!/bin/bash

mkdir -p public/data

bash fetch-pubs.sh > public/data/pubs.json
bash fetch-facilities.sh > public/data/facilities.json
