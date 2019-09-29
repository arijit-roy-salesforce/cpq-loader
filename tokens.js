const fs = require('fs')


const loadAccessToken = (type) => {
    try{
        if(type === 'source') {
            const databuffer = fs.readFileSync('source-tokens.json')
            const dataJson = databuffer.toString()
            return JSON.parse(dataJson)
        } 
        else {
            const databuffer = fs.readFileSync('target-tokens.json')
            const dataJson = databuffer.toString()
            return JSON.parse(dataJson)
        }
        
    }catch(e) {
        return {}
    }
}

const loadConnectionParam = (type) => {
    try {
        if(type === 'source') {
            const databuffer = fs.readFileSync('source-connection.json')
            const dataJson = databuffer.toString()
            return JSON.parse(dataJson)
        } else {
            const databuffer = fs.readFileSync('target-connection.json')
            const dataJson = databuffer.toString()
            return JSON.parse(dataJson)
        }
    } catch(e) {
        return {}
    }
}

const loadIgnoreFields = (object) => {
    try {
        if(object === 'Product2') {
            const databuffer = fs.readFileSync('product-ignore.json')
            const dataJson = databuffer.toString()
            return JSON.parse(dataJson)
        } else {return []}
    }catch(e){
        return []
    }
}

const saveAccessToken = (tokens) => {
    const dataJson =  JSON.stringify(tokens)
    fs.writeFileSync('source-tokens.json', dataJson)
}

const saveConnection = (connection, type) => {
    const dataJson = JSON.stringify(connection)
    if(type === 'source') {
        fs.writeFileSync('source-connection.json', dataJson)
    } else {
        fs.writeFileSync('target-connection.json', dataJson)
    }
}

module.exports = {
    loadAccessToken: loadAccessToken,
    saveAccessToken: saveAccessToken,
    saveConnection: saveConnection,
    loadConnectionParam: loadConnectionParam,
    loadIgnoreFields: loadIgnoreFields
}