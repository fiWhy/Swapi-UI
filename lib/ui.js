var UI = window.UI || (function () {

    var toggleClassName = function (element, className) {
        className = className || 'active';
        if (element.classList.contains(className))
            element.classList.remove(className);
        else
            element.classList.add(className);
    }

    var appendClasses = function (classNames, el) {
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
                card.flip();
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