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