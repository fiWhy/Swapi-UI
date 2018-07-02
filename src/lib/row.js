var Card = require('./card');
var UI = require('./ui');

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

Row.prototype.updateCards = function (cardInfos, inRow) {
    var self = this;
    var length = cardInfos.length - inRow;
    var unusedCards = this.cards.splice(0, length);
    unusedCards.forEach(function (card) {
        self.element.removeChild(card.element);
    });
    cardInfos.forEach(function (info, index) {
        if (!self.cards[index]) {
            self.addCard(new Card(info.title, info.body, info.footer, info.link));
        } else {
            self.cards[index].getOppositeSide()
                .setTitle(info.title)
                .setBody(info.body)
                .setFooter(info.footer)
                .setLink(info.link);
        }
    });
}

Row.prototype.render = function () {
    var row = document.createElement('div');
    UI.appendClasses(['row'], row);
    return row;
};

module.exports = Row;