#!/usr/bin/env node

const yargs = require('yargs')
const chalk = require('chalk')
const prompt = require('prompt')
const loginUtil = require('./src/sfdc-login')
const loader = require('./src/cpq-loader')


var schema_credentials = {
    properties: {
        username : {
            message: 'username for your salesforce org',
            required: true
        },
        password: {
            message: 'Enter password for your salesforce org',
            hidden: true,
            required: true
        }
    }
}

var schema_access = {
    properties: {
        ClientId : {
            message: 'Enter client Id',
            required: true
        },
        ClientSecret: {
            message: 'Enter Client Secret',
            required: true
        }
    }
}

yargs.usage('usage: $0 <command> [options]')
    .help('h')
    .alias('h', 'help').argv

yargs.command({
    command: 'connection [value]',
    describe: 'Setup remote access configurations',
    handler : function(argv) {
        if(argv.value === 'source' || argv.value === 'target') {
            console.log('Setting connection for ' + argv.value + ' org')
            prompt.get(schema_access, function(err, result){
                if(result.ClientId && result.ClientSecret) {
                    loginUtil.saveConnection(result.ClientId, result.ClientSecret, argv.value)
                }
            })
        } else {
            console.log('connection can only be set for source or target')
        }
        
    }
})

yargs.command({
    command: 'login [value]',
    describe: 'login operation to salesforce',
    handler : function(argv) {
        
        prompt.get(schema_credentials, function(err, result){
            if(result.username && result.password) {
                if(argv.value == 'source') {
                    loginUtil.loginSource(result.username, result.password)
                } else {
                    loginUtil.loginTarget(result.username, result.password)
                }
            }
            
        })
    }

})

yargs.command({
    command: 'list',
    describe: 'returns list of all accounts',
    handler: function() {
        loginUtil.getAccounts()
    }
})

yargs.command({
    command: 'product',
    describe: 'returns metadata for Product',
    handler: function() {
        loader.initializeProducts()
    }
})

yargs.parse()