var Card = window.Card || (function () {

    var item = new SWEvent();
    var itemsList = new SWEvent();

    function Card(title, body, footer, link) {
        this.sides = {};
        this.currentSide = Sides.FRONT;
        this.element = this.render();
        this.init(title, body, footer, link);
    }

    Card.item = function (subscriber) {
        item.subscribe(subscriber);
    }

    Card.itemsList = function (subscriber) {
        itemsList.subscribe(subscriber);
    }

    Card.prototype.init = function (title, body, footer, link) {
        this.getCurrentSide()
            .setTitle(title)
            .setBody(body)
            .setFooter(footer)
            .setLink(link);
    }

    Card.prototype.flip = function () {
        this.currentSide = this.currentSide == Sides.FRONT ? Sides.BACK : Sides.FRONT;
        UI.toggleClass('flip', this.element);
    }

    Card.prototype.getCurrentSide = function () {
        return this.sides[this.currentSide];
    }

    Card.prototype.getOppositeSide = function () {
        var side = this.currentSide == Sides.FRONT ? Sides.BACK : Sides.FRONT;
        return this.sides[side];
    }

    Card.prototype.render = function () {
        var self = this;
        var element = document.createElement('div');
        var frontSide = this.sides[Sides.FRONT] = new Side(Sides.FRONT);
        var backSide = this.sides[Sides.BACK] = new Side(Sides.BACK);

        element.appendChild(frontSide.element);
        element.appendChild(backSide.element);

        UI.appendClasses(['card', 'five', 'wide', 'column'], element);

        element.addEventListener('click', function () {
            RequestAPI.get(self.getCurrentSide().link)
                .then(function (response) {
                    if (response.results) {
                        itemsList.emit(response);
                    } else {
                        item.emit(response);
                    }
                });
        });

        return element;
    }

    return Card;
}());