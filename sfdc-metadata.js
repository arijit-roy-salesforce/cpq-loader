const tokens = require('./tokens.js')
const SOQL = require('salesforce-queries').SOQL
const sourceorg = require('./sfdc-login').sourceorg
const targetorg = require('./sfdc-login').targetorg


const getFields = (object) => {
    var oauthtoken = tokens.loadAccessToken('source')
    //const queryFields = []

    return new Promise(function(resolve, reject){
        sourceorg.getDescribe({oauth: oauthtoken, type: object}, function(error, response){
            if(!error) {
                resolve(parseFields(response, object))
            } else {
                reject(error)
            }
        })
    })
}

const parseFields = (response, object) => {
    const queryFields = []
    const ignoreFields = tokens.loadIgnoreFields(object)
    response.fields.forEach(field => {
        if(field.createable) {
            const ignoreField = ignoreFields.insert.find((ignoreField) => ignoreField === field.name)
            if(ignoreField === undefined) {
                queryFields.push(field.name)
            }
        }
    })
    
    return queryFields;
}

const buildQuery = (object, fields) => {
    var query = new SOQL(object)
    .select(fields)
    .build()
    return query
}

const getData = (query) => {
    var oauthtoken = tokens.loadAccessToken('source')
    //console.log(oauthtoken)
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
    createPayload: createPayload
}
