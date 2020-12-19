function response (res, status, result = "") {
    let desc = "";

    switch (status) {
        case 200:
            desc = "OK"
            break;

        case 201:
            desc = "Created"
            break;

        case 304:
            desc = "Not Modified"
            break;

        case 400:
            desc = "Bad Request"
            break;

        case 401:
            desc = "Unauthorized"
            break;

        case 404:
            desc = "Not Found";
            break;

        case 500:
            desc = "Internal Server Error"
            break;

        case 501:
            desc = "Bad Gateway"
            break;
        
        default:
            desc = "";
    }

    const isObject = (data) => {
        return !!data && data.constructor === Object
    };

    const results = {
        status: status,
        description: desc,
        result: isObject(result) ? [result] : Array.isArray(result) ? result : result,
    };

    res.status(status).json(results);
}

module.exports = response;