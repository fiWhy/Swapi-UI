var Fetch = window.Fetch || (function () {
    function request(method, url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.addEventListener('load', function (e) {
            if (cb) {
                cb(JSON.parse(e.target.response));
            }
        })
    }
    return {
        request: request
    }
}());