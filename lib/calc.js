var Calc = window.Calc || (function () {
    var exceptions = [
        'url', 'starships', 'vehicles', 'films'
    ]
    function objectToArray(object) {
        var arr = [];
        for (var key in object) {
            var endpoint = object[key];
            if (!(key in exceptions)) {
                arr.push({
                    property: key,
                    value: endpoint
                });
            }
        }
        return arr;
    }

    return {
        objectToArray: objectToArray
    }
}());