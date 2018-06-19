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
        this.link = null;
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

    Side.prototype.setLink = function (link) {
        this.link = link;
        return this;
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