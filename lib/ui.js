var UI = window.UI || (function () {

    var toggleClassName = function (element, className) {
        className = className || 'active';
        if (element.classList.contains(className))
            element.classList.remove(className);
        else
            element.classList.add(className);
    }

    var appendClasses = function (el, classNames) {
        if (!(el instanceof Element)) throw new Error('First argument should be Element');
        classNames = classNames instanceof Array ? classNames : [];
        classNames.forEach(function (className) {
            el.classList.add(className);
        });
    }

    var flipCards = function (cards, time) {
        var timeModifier = 1;
        cards.forEach(function (card) {
            setTimeout(function () {
                toggleClassName(card, 'flip');
            }, timeModifier++ * time);
        });
    }

    var flipCard = function (card, time) {
        flipCards([card], time);
    }

    var icons = {
        glove: 'gloves-by-radiusss'
    }

    return {
        flipCard: flipCard,
        flipCards: flipCards,
        toggleClassName: toggleClassName,
        appendClasses: appendClasses
    }
}());

var Sides;
(function (Sides) {
    Sides[Sides['FRONT'] = 0] = 'FRONT';
    Sides[Sides['BACK'] = 1] = 'BACK';
}(Sides || (Sides = {})));


var Side = window.Side || (function () {
    var template = ' <div class="title column"></div> \
    <div class="body column"> \
    </div> \
    <div class="footer column"></div>';

    function Side(sideClassName) {
        this.sideClassName = sideClassName || '';
        this.element = this.render();
    }

    Side.prototype.render = function () {
        var side = document.createElement('div');
        UI.appendClasses(side, [this.sideClassName, 'side', 'row']);
        side.innerHTML = template;
        return side;
    }

    Side.prototype.getPart = function (partClassName) {
        return this.element.getElementsByClassName(partClassName)[0];
    }

    Side.prototype.setBody = function (html) {
        this.getPart('body').innerHTML = html || '';
        return this;
    }

    Side.prototype.setTitle = function (html) {
        this.getPart('title').innerHTML = html || '';
        return this;
    }

    Side.prototype.setFooter = function (html) {
        this.getPart('footer').innerHTML = html || '';
        return this;
    }

    return Side;
}());

var Card = window.Card || (function () {
    function Card(title, body, footer) {
        this.side = Sides.FRONT;
        this.sides = {};
        this.sides[Sides.FRONT] = null;
        this.sides[Sides.BACK] = null;
        this.link = null;
        this.element = this.render();

        this.initFront(title, body, footer);
    }

    Card.prototype.setLink = function (link) {
        this.link = link;
        return this;
    }

    Card.prototype.initFront = function (title, body, footer) {
        var front = this.sides[Sides.FRONT];
        front.setTitle(title).setBody(body).setFooter(footer);
    }

    Card.prototype.toggleSide = function () {
        this.side = this.side === Sides.FRONT ? Sides.BACK : Sides.FRONT;
    }

    Card.prototype.getOppositeSide = function () {
        return this.sides[this.side === Sides.FRONT ? Sides.BACK : Sides.FRONT];
    }

    Card.prototype.getCurrentSide = function () {
        return this.sides[this.side];
    }

    Card.prototype.requestData = function (cb) {
        if (this.link) {
            RequestAPI.get(this.link, function (data) {
                cb(data);
            })
        }
    }

    Card.prototype.render = function () {
        var self = this;
        var card = document.createElement('div');
        var frontSide = new Side('front');
        var backSide = new Side('back');
        card.appendChild(frontSide.element);
        card.appendChild(backSide.element);
        UI.appendClasses(card, ['card', 'five', 'wide', 'column']);
        this.sides[Sides.FRONT] = frontSide;
        this.sides[Sides.BACK] = backSide;
        card.addEventListener('click', function () {
            self.requestData(function (data) {
                console.log('Flip', data);
            });
        })
        return card;
    }

    return Card;
}());

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

var Island = window.Island || (function () {
    function Island(rows) {
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
                cards.push(card.element);
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

    return Island;
}());