# devextreme-parse-filter-for-mongodb
Parse DevExtreme dx-data-grid filter for mongodb

## install
npm install devextreme-parse-filter-for-mongodb --save

## use
1. let parseFilter = require('devextreme-parse-filter-for-mongodb')

2. let aggregate = parseFilter(filter)

3. db.yourmodel.aggregate(aggregate).exec().then(models=>{...})

## test
npm test