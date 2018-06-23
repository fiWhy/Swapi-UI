var Island = window.Island || (function () {
    function Island(row) {
        this.rows = [];
        this.element = this.render();
        this.init(row);
    };

    Island.chunkLanght = 3;
    Island.prototype.init = function (defaultCards) {
        var self = this;
        var cards = defaultCards instanceof Array ? defaultCards : [];
        cards.forEach((function (row) {
            self.addCard(row);
        }))
    }

    Island.prototype.addCard = function (row) {
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