var Sides;
(function (sides) {
    sides[Sides['BACK'] = 0] = "BACK";
    sides[Sides['FRONT'] = 1] = "FRONT";
}(Sides || (Sides = {})));

var Side = window.Side || (function () {
    var sideClasses = {};
    sideClasses[Sides.FRONT] = 'front';
    sideClasses[Sides.BACK] = 'back';

    var template = '<div class="title column">Luke Skywalker </div>\
                        <div class="body column"> \
                            <i class="icon-master-yoda-by-radiusss"></i> \
                        </div> \
                    <div class="footer column">Jedi</div>';

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

    return Side;
}());