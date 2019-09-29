const nforce = require('nforce')
const chalk = require('chalk')
//const SOQL = require('salesforce-queries').SOQL
const token = require('./tokens.js')

const sourceConnection = token.loadConnectionParam('source')
const targetConnection = token.loadConnectionParam('target')

var sourceorg = nforce.createConnection({
    clientId: sourceConnection.ClientId,
    clientSecret: sourceConnection.ClientSecret,
    redirectUri: sourceConnection.redirectUri,
    apiVersion: sourceConnection.apiVersion,
    environment: sourceConnection.environment,
    mode: sourceConnection.mode

})

var targetorg = nforce.createConnection({
    clientId: targetConnection.ClientId,
    clientSecret: targetConnection.ClientSecret,
    redirectUri: targetConnection.redirectUri,
    apiVersion: targetConnection.apiVersion,
    environment: targetConnection.environment,
    mode: targetConnection.mode
})

const loginSource = (uname, password) => {
    console.log(chalk.grey.inverse('Logging into source as ' +uname))
    var oauth;
    var accessToken
    sourceorg.authenticate({username: uname, password: password}, function(error, response){
        if(!error) {
            console.log(chalk.green.inverse('authorization successfull'))
            if(response) {
                console.log('inside save response block')
                accessToken = response
                token.saveAccessToken(accessToken)
            }
        } else {
            console.log(chalk.red.inverse('unable to login '+error))
        }
    })

}

const loginTarget = (uname, password) => {
    console.log(chalk.grey.inverse('Logging into target as ' +uname))
    var oauth;
    var accessToken
    targetorg.authenticate({username: uname, password: password}, function(error, response){
        if(!error) {
            console.log(chalk.green.inverse('authorization successfull'))
            if(response) {
                console.log('inside save response block')
                accessToken = response
                token.saveAccessToken(accessToken)
            }
        } else {
            console.log(chalk.red.inverse('unable to login '+error))
        }
    })

}

const saveConnection = (ClientId, ClientSecret, type) => {
    const connection = {
        ClientId : '',
        clientSecret: '',
        redirectUri: 'http://localhost:3000/oauth/_callback',
        apiVersion: 'v46.0',
        environment: 'sandbox',
        mode: 'multi'
    }

    connection.ClientId = ClientId
    connection.ClientSecret = ClientSecret
    token.saveConnection(connection, type)
}

module.exports = {
    sourceorg: sourceorg,
    targetorg: targetorg,
    loginSource: loginSource,
    loginTarget: loginTarget,
    saveConnection, saveConnection
}