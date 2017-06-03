# devextreme-parse-filter-for-mongodb
Parse DevExtreme dx-data-grid filter for mongodb

## install
npm install devextreme-parse-filter-for-mongodb --save

## use
1. let parseFilter = require('devextreme-parse-filter-for-mongodb')

2. let aggregate = parseFilter(filter) or let aggregate = parseFilter(filter, ...dateKeys)

// because date is a string in filter so we need translate it into date type.

3. db.yourmodel.aggregate(aggregate).exec().then(models=>{...})

## test
npm test
### test case
```javascript
let parseFilter = require('./index')

let demos = [
    '[["dateUpdated",">=","2017-05-16T16:00:00.000Z"],"and",["dateUpdated","<","2017-05-17T16:00:00.000Z"]]',//2017-05-16
    '[[["supplier.scalaId","=","100103"],"or",["supplier.scalaId","=","300005"],"or",["supplier.scalaId","=","900641"]],"and",["supplier.name","=","Roquette GmbH"]]',
    '[[["supplier.name","=","Sallandse Golfclub de Hoek"],"or",["supplier.name","=","Witsel, A.R."]],"and",[[["dateUpdated",">=","2017-04-24T16:00:00.000Z"],"and",["dateUpdated","<","2017-04-25T16:00:00.000Z"]],"or",[["dateUpdated",">=","2017-04-30T16:00:00.000Z"],"and",["dateUpdated","<","2017-05-31T16:00:00.000Z"]]]]'
]

let datakeys = ['dateUpdated', 'header.invoiceDate', 'header.dueDateCalculate', 'dateCreated', 'dateExported']

demos.forEach((demo, index) => {
    console.log("Case " + (index + 1) + ':')
    console.log(JSON.stringify(parseFilter(demo, ...datakeys), null, '    '))
})
```

### test result
Case 1:
```javascript
[
    {
        "$match": {
            "dateUpdated": {
                "$gte": "2017-05-16T16:00:00.000Z",
                "$lt": "2017-05-17T16:00:00.000Z"
            }
        }
    }
]
Case 2:

[
    {
        "$match": {
            "$or": [
                {
                    "supplier.scalaId": {
                        "$eq": "100103"
                    }
                },
                {
                    "supplier.scalaId": {
                        "$eq": "300005"
                    }
                },
                {
                    "supplier.scalaId": {
                        "$eq": "900641"
                    }
                }
            ],
            "supplier.name": {
                "$eq": "Roquette GmbH"
            }
        }
    }
]

Case 3:

[
    {
        "$match": {
            "$or": [
                {
                    "supplier.name": {
                        "$eq": "Sallandse Golfclub de Hoek"
                    }
                },
                {
                    "supplier.name": {
                        "$eq": "Witsel, A.R."
                    }
                }
            ]
        }
    },
    {
        "$match": {
            "$or": [
                {
                    "dateUpdated": {
                        "$gte": "2017-04-24T16:00:00.000Z",
                        "$lt": "2017-04-25T16:00:00.000Z"
                    }
                },
                {
                    "dateUpdated": {
                        "$gte": "2017-04-30T16:00:00.000Z",
                        "$lt": "2017-05-31T16:00:00.000Z"
                    }
                }
            ]
        }
    }
]
```