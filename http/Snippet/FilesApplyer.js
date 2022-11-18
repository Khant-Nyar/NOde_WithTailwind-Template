const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

function writeDataToFile(filename,content){
    fs.writeFileSync(filename,JSON.stringify(content,null,2),'utf-8', ( err )=>{
        if(err){
            console.log(err);
        }
    });
}

function getPostData (req){
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', ()=>{
                resolve(body);
            });
        }catch(error){
            reject(err)
        }
    });
}


module.exports = {
    writeDataToFile,
    getPostData
}



// You are exporting

// module.exports.redir = redir;
// That means that your import

// const redir = require('./index');
// is the exported object. redir happens to be one of its keys. To use the function, use

// const redir = require('./index').redir;
// or destructure directly into redir

// const { redir } = require('./index');