var UI = window.Card || (function () {

    function appendClasses(classes, el) {
        classes.forEach(function (className) {
            if (el instanceof Array) {
                el.forEach(function (element) {
                    element.classList.add(className);
                })
            } else {
                el.classList.add(className);
            }
        });
    }

    function Card(size, animationDuration) {
        this.size = size || 200;
        this.parent = null;
        this.animationDuration = animationDuration || 500;
        this.x = null;
        this.y = null;
        this.top = this.defaultTop = 0;
        this.left = this.defaultLeft = 0;
        this.element = document.createElement('div');
        this.elementHeader = document.createElement('div');
        this.elementBody = document.createElement('div');
        this.elementFooter = document.createElement('div');
        this.init();
    }

    Card.prototype.init = function () {
        var wrapper = document.createElement('div');
        var inner = document.createElement('div');
        appendClasses(['card', 'five', 'one', 'column'], this.element);
        appendClasses(['column'], [this.elementHeader, this.elementBody, this.elementFooter]);
        appendClasses(['card-wrapper', 'column'], wrapper);
        appendClasses(['card-inner', 'one', 'column', 'ui', 'grid', 'centered', 'vertically'], inner);
        wrapper.appendChild(inner);
        inner.appendChild(this.elementHeader);
        inner.appendChild(this.elementBody);
        inner.appendChild(this.elementFooter);
        this.element.appendChild(wrapper);
        this.registerListeners();
    }

    Card.prototype.registerListeners = function () {
        var self = this;
        this.element.addEventListener('mouseenter', function () {
            self.fixPosition();
        });

        this.element.addEventListener('mouseleave', function () {
            self.restorePosition();
        });
    }

    Card.prototype.fixPosition = function () {
        var row = this.parent;
        var island = row.parent;
        if (this.x === 0) {
            if (this.y === 0) {
                this.element.style.top = this.top - 25 + 'px';
            } else if (this.y !== island._rows.length - 1) {
                this.element.style.top = this.top - 25 + 'px';
            }
            this.element.style.left = this.left - 50 + 'px';
        } else if (this.x !== row._cards.length - 1) {
            this.element.style.left = this.left - 25 + 'px';
        }
        if (this.y === 0) {
            this.element.style.top = this.top - 25 + 'px';
        } else if (this.y !== island._rows.length - 1) {
            this.element.style.top = this.top - 25 + 'px';
        }
    }

    Card.prototype.addHidden = function (el) {
        var hidden = document.createElement('div');
        appendClasses(['hidden'], hidden);
        if (this.hidden) {
            this.element.removeChild(this.hidden);
        }
        if (typeof el === 'string') {
            hidden.innerHTML = el;
        } else {
            this.element.insertBefore(el);
        }
        this.hidden = hidden;
    }

    Card.prototype.setCardXPosition = function (position) {
        this.x = position;
        this.left = this.defaultLeft = position * this.size;
        this.element.style.top = this.top;
        this.element.style.left = this.left + 'px';
    }

    Card.prototype.restorePosition = function () {
        this.element.style.top = this.defaultTop + 'px';
        this.element.style.left = this.defaultLeft + 'px';
    }

    Card.prototype.setCardYPosition = function (position) {
        this.y = position;
    }

    Card.prototype.render = function () {
        return this.element;
    }

    Card.prototype.moveTop = function (step) {
        this.top -= (step || 1) * this.size;
        this.element.style.top = this.top + 'px';
        return this;
    }

    Card.prototype.moveLeft = function (step) {
        this.left -= (step || 1) * this.size;
        this.element.style.left = this.left + 'px';
        return this;
    }

    Card.prototype.moveBottom = function (step) {
        this.top += (step || 1) * this.size;
        this.element.style.top = this.top + 'px';
        return this;
    }

    Card.prototype.moveRight = function (step) {
        this.left += (step || 1) * this.size;
        this.element.style.left = this.left + 'px';
        return this;
    }

    function Row(position) {
        this.parent = null;
        this._cards = [];
        this.element = document.createElement('div');
        this.init();
    }

    Row.prototype.init = function () {
        appendClasses(['row'], this.element);
    }

    Row.prototype.addCard = function (card) {
        if (!(card instanceof Card)) throw new Error('Argument must be instance of Card');
        card.setCardXPosition(this._cards.length);
        card.parent = this;
        if (this.position) {
            card.setCardYPosition(this.position);
        }
        this._cards.push(card);
        return this;
    }

    Row.prototype.setPosition = function (position) {
        this.position = position;
        this._cards.forEach(function (card) {
            card.setCardYPosition(position);
        })
    }

    Row.prototype.getCard = function (position) {
        return this._cards[position];
    }

    Row.prototype.render = function () {
        var self = this;
        this.element.innerHTML = "";
        this._cards.forEach(function (card) {
            self.element.appendChild(card.render());
        })
        return this.element;
    }

    function Island() {
        this.element = document.createElement('div');
        this._rows = [];
        this.init();
    }

    Island.prototype.init = function () {
        appendClasses(['chosen', 'island', 'ui', 'grid'], this.element);
    }

    Island.prototype.addRow = function (row) {
        if (!(row instanceof Row)) throw new Error('Argument must be instance of Row');
        row.setPosition(this._rows.length);
        row.parent = this;
        this._rows.push(row);
        return this;
    }

    Island.prototype.render = function () {
        var self = this;
        this.element.innerHTML = "";
        this._rows.forEach(function (row) {
            self.element.appendChild(row.render());
        })
        return this.element;
    }

    Island.prototype.getCard = function (y, x) {
        var row = this._rows[y];
        if (row) {
            return row.getCard(x);
        }
        return row;
    }

    return {
        Card: Card,
        Row: Row,
        Island: Island
    }
}());