var UI = window.UI || (function () {

    var toggleClassName = function (element, className) {
        className = className || 'active';
        if (element.classList.contains(className))
            element.classList.remove(className);
        else
            element.classList.add(className);
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
        toggleClassName: toggleClassName
    }
}());

