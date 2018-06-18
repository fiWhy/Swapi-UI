var cards = document.getElementsByClassName('card');
var cardsArray = Array.prototype.slice.call(cards);

cardsArray.forEach(function (card) {
    card.addEventListener('click', function () {
        UI.toggleClassName(card, 'active');
        RequestAPI.get('https://swapi.co/api/people/1/', function (data) {
            console.log(data);
        })
        UI.flipCard(card, 100);
    })
})


