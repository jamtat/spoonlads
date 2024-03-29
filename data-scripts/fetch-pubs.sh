#!/bin/bash

curl -s 'https://www.jdwetherspoon.com/api/advancedsearch' \
  -H 'Origin: https://www.jdwetherspoon.com' \
  -H 'Accept-Encoding: gzip, deflate, br' \
  -H 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36' \
  -H 'Content-Type: application/json;charset=UTF-8' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Referer: https://www.jdwetherspoon.com/pubs/all-pubs' \
  -H 'Cookie: sc_expview=0; AWSELB=49BD9FE502ACFE91B663581008F663146B5B8414B07682926754D8B3145F892C157811A98DD2B2D0142A6EA4BA0D0B127DA164AA35EB98F9288DDACF9011686DE159343925' \
  -H 'Connection: keep-alive' \
  -H 'DNT: 1' \
  --data-binary '{"region":null,"paging":{"UsePagination":false},"facilities":[],"searchType":0}' \
  --compressed \
  | jq '.'
