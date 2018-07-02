var UI = require('./ui');

var SideType;
(function (SideType) {
    SideType[SideType['BACK'] = 0] = "BACK";
    SideType[SideType['FRONT'] = 1] = "FRONT";
}(SideType || (SideType = {})));

var sideClasses = {};
sideClasses[SideType.FRONT] = 'front';
sideClasses[SideType.BACK] = 'back';

var template = '<div class="title column"></div>\
                        <div class="body column"></div> \
                    <div class="footer column"></div>';

function Side(sideName) {
    this.sideClassName = sideClasses[sideName];
    this.link = null;
    this.element = this.render();
    this.titleElement = this.element.getElementsByClassName('title')[0];
    this.bodyElement = this.element.getElementsByClassName('body')[0];
    this.footerElement = this.element.getElementsByClassName('footer')[0];
}

Side.prototype.setTitle = function (content) {
    this.titleElement.innerHTML = content || '';
    return this;
};
Side.prototype.setLink = function (content) {
    this.link = content;
    return this;
};
Side.prototype.setBody = function (content) {
    this.bodyElement.innerHTML = content || '';
    return this;
};
Side.prototype.setFooter = function (content) {
    this.footerElement.innerHTML = content || '';
    return this;
};
Side.prototype.render = function () {
    var element = document.createElement('div');
    element.innerHTML = template;
    UI.appendClasses([this.sideClassName, 'side'], element);
    return element;
};

module.exports.Side = Side;
module.exports.SideType = SideType;