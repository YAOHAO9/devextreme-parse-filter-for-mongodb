'use strict'
/**
 * Created by YAOHAO on 5/30/2016
 */

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
