var Type;
(function (type) {
    type[Type['LIST'] = 0] = "LIST";
    type[Type['ITEM'] = 1] = "ITEM";
}(Type || (Type = {})));


var Island = window.Island || (function () {
    function Island(row) {
        this.nextType = Type.LIST;
        this.previousType = null;
        this.rows = [];
        this.element = this.render();
        this.init(row);
    };

    Island.chunkLenght = 3;

    Island.prepareArray = function (cardsArray) {
        return cardsArray.map(function (card) {
            return {
                title: card.name || card.title,
                link: card.url || card.link
            }
        });
    }

    Island.prototype.init = function (defaultCards) {
        var self = this;
        Card.itemsList(function (listOfData) {
            self.appendList(listOfData.results);
        });
        Card.item(function (data) {
            self.appendObject(data);
        });
        var cards = defaultCards instanceof Array ? defaultCards : [];
        cards.forEach((function (row) {
            self.addCard(row);
        }));
        return this;
    }

    Island.prototype.addCardsByChunks = function (cards) {
        var self = this;
        cards = cards instanceof Array ? cards : [];
        _.chunk(cards, Island.chunkLenght).forEach(function (row) {
            self.addRow(new Row(row));
        })
        return this;
    }

    Island.prototype.appendObject = function (item) {
        var arr = Calc.objectToArray(item).map(function (info) {
            return {
                title: info.property,
                footer: info.value
            }
        });
        this.appendList(arr);
    }

    Island.prototype.appendList = function (row) {
        var self = this;
        row = row instanceof Array ? row : [];
        var chunks = _.chunk(Island.prepareArray(row), Island.chunkLenght);
        var chunksDifference = chunks.length - this.rows.length;
        var overRowsCount = chunksDifference < 0 ? 0 : chunksDifference;
        var overRows = chunks.splice(Island.chunkLenght - 1, overRowsCount);
        chunks.forEach(function (cardInfos, index) {
            self.rows[index].updateCards(cardInfos, Island.chunkLenght);
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
    return Island;
}());