var Row = window.Row || (function (Card) {
    function Row(cards) {
        this.cards = cards instanceof Array ? cards : [];
        this.element = this.render();
        this.init(cards);
    }

    Row.prototype.init = function () {
        var self = this;
        self.cards.forEach(function (card) {
            self.renderCard(card);
        })
    }

    Row.prototype.addCard = function (card) {
        if (!(card instanceof Card)) throw new Error('Argument should be a Card');
        this.cards.push(card);
        this.element.appendChild(card.element);
        return this;
    }

    Row.prototype.render = function () {
        var row = document.createElement('div');
        this.cards.forEach(function (card) {
            row.appendChild(card.element);
        });
        UI.appendClasses(row, ['row']);
        return row;
    }

    Row.prototype.renderCard = function (card) {
        if (!(card instanceof Card)) throw new Error('Argument should be a Card');
        this.element.appendChild(card.element);
    }

    Row.prototype.createCard = function () {
        this.addCard(new Card());
        return this;
    }

    return Row;
}(Card));