'use strict'

const issueFields = {
    title : 'required',
    name : 'required',
    date : 'required'
}

function validate(issue){
    for(const field in issueFields){
        const type = issueFields[field];
        if(!type){
            delete issue[field];
        }
        else if(type === 'required' && !issue[field]){
            return `${field} is required`
        }
    }

    return null;
}

module.exports = {
    validate : validate
}