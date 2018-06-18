var cards = document.getElementsByClassName('card');
var cardsArray = Array.prototype.slice.call(cards);
var flipCards = function (cards, time) {
    var timeModifier = 1;

    var flip = function (card) {
        card.classList.add('flip');
    };

    var unflip = function (card) {
        card.classList.remove('flip');
    }


    cards.forEach(function (card) {
        setTimeout(function () {
            flip(card);
        }, timeModifier++ * time);
        if (timeModifier == cards.length + 1) {
            cards.forEach(unflip);
        }
    });
}

var hoverCard = function (card, forTime) {
    card.classList.add('hover');
    setTimeout(function () {
        card.classList.remove('hover');
    }, forTime)
}


cardsArray.forEach(function (card) {
    card.addEventListener('click', function () {
        flipCards(_.shuffle(cardsArray), 100);
    })
})