var RequestAPI = window.RequestAPI || (function () {
    function prepareXHR(method, address, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, address, true);
        xhr.addEventListener('load', function(response) {
            cb(JSON.parse(response.target.response));
        });
        return xhr;
    }
    function get(address, cb) {
        return prepareXHR('GET', address, cb).send();
    }
    return {
        get: get
    }
}());