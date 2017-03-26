'use strict';
import isEmpty from 'lodash/isEmpty';
import fs from 'fs';

module.exports = function(source, map) {
    let loader = this;
    let params = loader.query || null;
    if(!isEmpty(params)){
        let fileName = basename(loader.resourcePath);
        let regExp = getRegExp(params.subStr, params.regExpFlags);
        let newSubStr = params.newSubStr || '';

        let fileMap = {
            file: fileName,
            matches: []
        };

        let sourceByLines = source.split('\n');
        sourceByLines = sourceByLines.map((line, n) => {
            if(regExp.test(line)){
                let replace = line.replace(regExp, newSubStr);
                fileMap.matches.push(setMatch(n, line, replace));
                line = replace;
            }
            return line;
        });
        createMatchFile(fileName, fileMap);
        source = sourceByLines.join('\n');
    }
    this.callback(null, source, map);
};

function replace(source){

}

function isGlobalReplace(flags){
    return flags.indexOf('g');
}

function getRegExp(regExp, globalFlags){
    if(typeof regExp !== 'object') {
        regExp = new RegExp(regExp, globalFlags);
    }
    return regExp;
}

function basename(name) {
    if(name.indexOf("/") < 0) return name;
    return name.substr(name.lastIndexOf("/") + 1);
}

function setMatch(line, context, replace){
    return {
        matchLine: ++line,
        matchContent: context.trim(),
        replaceTo: replace.trim()
    }
}

function createMatchFile(fileName, data){
    let path = './replace_text_loader/';
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
    fs.writeFile(`${path + fileName}.json`, JSON.stringify(data, null, 4));
}