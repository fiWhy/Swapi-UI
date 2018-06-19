var Card = window.Card || (function () {
    function Card(title, body, footer) {
        this.side = Sides.FRONT;
        this.sides = {};
        this.sides[Sides.FRONT] = null;
        this.sides[Sides.BACK] = null;
        this.element = this.render();

        this.initFront(title, body, footer);
    }

    Card.info = new SWEvent();

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

    Card.prototype.fillOppositeSide = function (title, body, footer) {
        this.getOppositeSide().setTitle(title).setBody(body).setFooter(footer);
        return this;
    }

    Card.prototype.setLink = function (link) {
        this.getCurrentSide().setLink(link);
        return this;
    }

    Card.prototype.flip = function () {
        UI.toggleClassName(this.element, 'flip');
        this.toggleSide();
    }

    Card.prototype.getCurrentSide = function () {
        return this.sides[this.side];
    }

    Card.prototype.requestData = function () {
        var side = this.getCurrentSide();
        if (side.link) {
            RequestAPI.get(side.link, function (data) {
                Card.info.emit(data);
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
                console.log('Flip', data)
            });
        })
        return card;
    }

    return Card;
}());