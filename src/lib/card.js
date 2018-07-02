var Side = require('./side');
var UI = require('./ui');
var SWEvent = require('./event');

var click = new SWEvent();

function Card(title, body, footer, link) {
    this.sides = {};
    this.currentSide = Side.SideType.FRONT;
    this.element = this.render();
    this.init(title, body, footer, link);
}

Card.click = function (subscriber) {
    click.subscribe(subscriber);
}

Card.prototype.init = function (title, body, footer, link) {
    this.getCurrentSide()
        .setTitle(title)
        .setBody(body)
        .setFooter(footer)
        .setLink(link);
}

Card.prototype.flip = function () {
    this.currentSide = this.currentSide == Side.SideType.FRONT ? Side.SideType.BACK : Side.SideType.FRONT;
    UI.toggleClass('flip', this.element);
}

Card.prototype.getCurrentSide = function () {
    return this.sides[this.currentSide];
}

Card.prototype.getOppositeSide = function () {
    var side = this.currentSide == Side.SideType.FRONT ? Side.SideType.BACK : Side.SideType.FRONT;
    return this.sides[side];
}

Card.prototype.render = function () {
    var self = this;
    var element = document.createElement('div');
    var frontSide = this.sides[Side.SideType.FRONT] = new Side.Side(Side.SideType.FRONT);
    var backSide = this.sides[Side.SideType.BACK] = new Side.Side(Side.SideType.BACK);

    element.appendChild(frontSide.element);
    element.appendChild(backSide.element);

    UI.appendClasses(['card', 'five', 'wide', 'column'], element);

    element.addEventListener('click', function () {
        click.emit(self);
    });

    return element;
}

module.exports = Card;