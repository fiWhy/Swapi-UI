var Card = window.Card || (function () {

    function Card() {
        this.sides = {};
        this.currentSide = Sides.FRONT;
        this.element = this.render();
    }

    Card.prototype.getCurrentSide = function () {
        return this.sides[this.currentSide];
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
                .then(function (data) {
                    backSide.setTitle(data.name)
                        .setBody('<i class="icon-c3po-by-radiusss"></i>')
                        .setFooter(data.birth_year);
                    UI.appendClasses(['flip'], element);
                });
        });

        return element;
    }

    return Card;
}());