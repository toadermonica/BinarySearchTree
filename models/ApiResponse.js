/**
 * Function that returns a response status with a different format
 * @param {data} 
 */
function ApiResponse(data)
{
    if(data.errorMessage)
    {
        return {status: 402, error: data.errorMessage}
    }
    return {status: 200, data: data};
}

module.exports = {
    ApiResponse: ApiResponse
}