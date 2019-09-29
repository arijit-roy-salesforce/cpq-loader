const sfdcmeta = require('./sfdc-metadata')
const nforce = require('nforce')
const queryFields = []
var query

// Excuting describe call and getting product fields
const initializeProducts = () => {
    console.log('Initializing Products ...')
    //const queryFields
    sfdcmeta.getFields('Product2').then(function(response){
        if(response.length > 0){
            queryFields.push(sfdcmeta.getFieldsByName(response))
            query = sfdcmeta.buildQuery('Product2', queryFields)
            //queryProducts(query, response)
        }
        
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
    const productdata = []
    result.forEach(record => {
        var product = nforce.createSObject('Product2')
        fields.forEach(field => {
            if(field.name === 'Id') {
                product.set('cpq_External__c', record.get(field.name))
            }
            if(record.get(field.name) && !(field.name === 'id')) {
                product.set(field.name, record.get(field.name))
            }
            
        })
        productdata.push(product)
    });
    console.log(productdata)
}


//console.log(initializeProducts())

module.exports = {
    initializeProducts: initializeProducts
}