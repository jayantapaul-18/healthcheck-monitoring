#!/bin/sh
echo "update Browserslist"
#  Why you should do it regularly: https://github.com/browserslist/browserslist#browsers-data-updating
npx browserslist@latest --update-db
