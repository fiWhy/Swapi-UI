var Row = window.Row || (function () {
    function Row(cards) {
        this.cards = [];
        this.element = this.render();
        this.init(cards);
    };

    Row.prototype.init = function (defaultCards) {
        var self = this;
        var cards = defaultCards instanceof Array ? defaultCards : [];
        cards.forEach((function (card) {
            self.addCard(card);
        }))
    }

    Row.prototype.addCard = function (card) {
        if (!(card instanceof Card))
            throw new Error('Arguent should be instance of Card');
        this.cards.push(card);
        this.element.appendChild(card.element);
        return this;
    };

    Row.prototype.render = function () {
        var row = document.createElement('div');
        UI.appendClasses(['row'], row);
        return row;
    };
    return Row;
}());