function TreeInsertValidation(data)
{
    if(!data.value)
    {
        return TreeErrorHandling(`This is a bad request. Data provided is invalid!`)
    }else{
        return null;
    }
}

function TreeErrorHandling(errorMessage)
{
    return {errorMessage: errorMessage}
}

module.exports = {
    TreeErrorHandling: TreeErrorHandling,
    TreeInsertValidation: TreeInsertValidation
}