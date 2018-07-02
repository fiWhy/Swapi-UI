var Row = require('./row');
var Card = require('./card');
var UI = require('./ui');
var Calc = require('./calc');
var _ = require('lodash');

var Type;
(function (type) {
    type[Type['LIST'] = 0] = "LIST";
    type[Type['ITEM'] = 1] = "ITEM";
}(Type || (Type = {})));

function Island(row, chunkSize) {
    this.chunkSize = chunkSize || 3
    this.nextType = Type.LIST;
    this.previousType = null;
    this.rows = [];
    this.element = this.render();
    this.init(row);
};

Island.prototype.init = function (defaultCards) {
    var self = this;
    var cards = defaultCards instanceof Array ? defaultCards : [];
    cards.forEach((function (row) {
        self.addCard(row);
    }));
    return this;
}

Island.prototype.addCardsByChunks = function (cards) {
    var self = this;
    cards = cards instanceof Array ? cards : [];
    _.chunk(cards, self.chunkSize).forEach(function (row) {
        self.addRow(new Row(row));
    })
    return this;
}

Island.prototype.append = function (row) {
    var self = this;
    row = row instanceof Array ? row : [];
    var chunks = _.chunk(row, self.chunkSize);
    var chunksDifference = chunks.length - this.rows.length;
    var overRowsCount = chunksDifference < 0 ? 0 : chunksDifference;
    var overRows = chunks.splice(-overRowsCount);
    chunks.forEach(function (cardInfos, index) {
        self.rows[index].updateCards(cardInfos, self.chunkSize);
    })
    this.flip();
    overRows.forEach(function (cardInfos) {
        self.addRow(new Row(
            cardInfos.map(function (info) {
                return new Card(info.title, info.body, info.footer, info.link);
            })
        ))
    })
    return this;
}

Island.prototype.flip = function (time) {
    time = time || 100;
    var cards = [];
    this.rows.forEach(function (row) {
        row.cards.forEach(function (card) {
            cards.push(card);
        });
    });
    UI.flipCards(_.shuffle(cards), time);
    return this;
}

Island.prototype.addRow = function (row) {
    if (!(row instanceof Row))
        throw new Error('Arguent should be instance of Card');
    this.rows.push(row);
    this.element.appendChild(row.element);
    return this;
};

Island.prototype.render = function () {
    var island = document.createElement('div');
    UI.appendClasses(['island', 'ui', 'grid'], island);
    return island;
};

module.exports = Island;