var UI = window.UI || (function () {

    var icons = {
        people: 'scout-trooper-by-radiusss',
        planets: 'geonosis-by-radiusss',
        films: 'miscellaneous-by-radiusss',
        species: 'lightsaber-by-radiusss',
        vehicles: 'speeder-by-radiusss',
        starships: 'tie-fighter-by-radiusss',
        default: 'tie-fighter-by-radiusss'
    };

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

    var toggleClass = function (className, el) {
        if (el.classList.contains(className)) {
            el.classList.remove(className);
        } else {
            el.classList.add(className);
        }
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

    return {
        icons: icons,
        toggleClass: toggleClass,
        flipCard: flipCard,
        flipCards: flipCards,
        toggleClassName: toggleClassName,
        appendClasses: appendClasses
    }
}());