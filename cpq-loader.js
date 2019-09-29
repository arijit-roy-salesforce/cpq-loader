const sfdcmeta = require('./sfdc-metadata')
const queryFields = []
var query

// Excuting describe call and getting product fields
const initializeProducts = () => {
    console.log('Initializing Products ...')
    //const queryFields
    sfdcmeta.getFields('Product2').then(function(result){
        queryFields.push(result)
        query = sfdcmeta.buildQuery('Product2', queryFields)
        queryProducts(query, queryFields)
    }).catch(function(error){
        console.log(error)
    })
}

// Executing query and getting products data fron source org.
const queryProducts = (query, fields) => {
    console.log('Querying Products from source org ...')
    sfdcmeta.getData(query).then(function(result){
        console.log(result.length)
        loadProducts(fields, result)
    }).catch(function(error){
        console.log(error)
    })
}

const loadProducts = (fields, result) => {
    
}
//console.log(initializeProducts())

module.exports = {
    initializeProducts: initializeProducts
}