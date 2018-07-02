function SWEvent() {
    this.subscribers = [];
}

SWEvent.prototype.subscribe = function (cb) {
    var self = this;
    if (this.subscribers.indexOf(cb) === -1) {
        this.subscribers.push(cb);
    }

    return function () {
        var eventIndex = self.subscribers.indexOf(cb);
        if (eventIndex >= 0) {
            self.subscribers.splice(eventIndex, 1);
        }
    }
}

SWEvent.prototype.emit = function (payload) {
    this.subscribers.forEach(function (cb) {
        cb(payload);
    })
}

module.exports = SWEvent;