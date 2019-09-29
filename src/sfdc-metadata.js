const tokens = require('./tokens.js')
const SOQL = require('salesforce-queries').SOQL
const sourceorg = require('./src/sfdc-login').sourceorg
const targetorg = require('./src/sfdc-login').targetorg


const getFields = (object) => {
    var oauthtoken = tokens.loadAccessToken('source')
    //const queryFields = []

    return new Promise(function(resolve, reject){
        sourceorg.getDescribe({oauth: oauthtoken, type: object}, function(error, response){
            if(!error) {
                resolve(filterFields(response, object))
            } else {
                reject(error)
            }
        })
    })
}

const filterFields = (response, object) => {
    const filterFields = []
    const ignoreFields = tokens.loadIgnoreFields(object)
    
    response.fields.forEach(field => {

        if(field.name === 'Id') {
            filterFields.push(field)
        }
        if(field.createable) {
            const ignoreField = ignoreFields.insert.find((ignoreField) => ignoreField === field.name)
            if(ignoreField === undefined) {
                filterFields.push(field)
            }
        }
    })
    return  filterFields
}

const getFieldsByName = (result) => {
    const fieldsArray = []
    result.forEach(field => {
        fieldsArray.push(field.name)
    })
    return fieldsArray
}


const buildQuery = (object, fields) => {
    var query = new SOQL(object)
    .select(fields)
    .limit(1)
    .build()
    
    return query
}

const getData = (query) => {
    var oauthtoken = tokens.loadAccessToken('source')
    return new Promise(function(resolve, reject) {
        sourceorg.query({ query : query, oauth: oauthtoken }, function(error, response){
            if(!error) {
                resolve(response.records)
            } else {
                reject(error)
            }
        })
    })
}

const createPayload = (fields, result) => {
    
}


module.exports = {
    getFields: getFields,
    buildQuery: buildQuery,
    createPayload: createPayload,
    getFieldsByName: getFieldsByName,
    getData: getData
}
