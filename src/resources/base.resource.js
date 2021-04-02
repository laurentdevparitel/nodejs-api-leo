const baseResource = (data, message = null) => {
    const json = {
        "data": data
    };

    if (message){
        json["message"] = message;
    }
    return json;
}

module.exports = {
    baseResource
}