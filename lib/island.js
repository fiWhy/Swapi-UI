var Island = window.Island || (function () {
    function Island(rows) {
        this.chunkSize = 3;
        this.rows = rows instanceof Array ? rows : [];
        this.element = this.render();
        this.init();
    }

    Island.prototype.init = function () {
        this.setRows(this.rows);
    }

    Island.prototype.render = function () {
        var island = document.createElement('div');
        UI.appendClasses(island, ['island', 'ui', 'grid']);
        return island;
    }

    Island.prototype.addCardsByChunks = function (cards) {
        var self = this;
        cards = cards instanceof Array ? cards : [];
        _.chunk(cards, this.chunkSize).forEach(function (row) {
            self.addRow(new Row(row));
        })
    }

    Island.prototype.setRows = function (rows) {
        var self = this;
        this.rows = rows;
        this.rows.forEach(function (row) {
            self.renderRow(row);
        })
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
    }

    Island.prototype.addRow = function (row) {
        if (!(row instanceof Row)) throw new Error('Argument should be a Row');
        this.rows.push(row);
        this.renderRow(row);
    }

    Island.prototype.renderRow = function (row) {
        if (!(row instanceof Row)) throw new Error('Argument should be a Row');
        this.element.appendChild(row.element);
    }

    Island.prototype.drawAdditional = function (cards) {
        var currCards = cards.slice();
        var lastRow = this.rows[this.rows.length - 1];
        var difference = lastRow.length - this.chunkSize;
        if (difference) {
            lastRow.addCards(currCards.splice(0, difference));
        }
        this.addCardsByChunks(currCards);
    }

    Island.prototype.removeAdditional = function (itemsLength) {
        var self = this;
        var currentCount = this.rows.reduce(function (prev, next) {
            return prev + next.cards.length;
        }, 0);

        var overRows = Math.ceil(Math.abs(itemsLength - currentCount) / this.chunkSize);
        var rows = this.rows.splice(this.chunkSize - 1, overRows);
        rows.forEach(function (row) {
            self.element.removeChild(row.element);
        });
    }

    return Island;
}());