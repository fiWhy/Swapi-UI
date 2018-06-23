var RequestAPI = (function () {
    function sendRequest(method, address) {
        return new Promise(function (resole, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, address, true);
            xhr.addEventListener('load', function (response) {
                resole(JSON.parse(response.target.response));
            });
            xhr.addEventListener('error', reject);
            xhr.send();
        })
    }


    function get(address) {
        return sendRequest('GET', address);
    }
    return {
        get: get
    }
}());