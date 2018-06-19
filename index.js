var wrapper = document.getElementById('wrapper');
var api = 'https://swapi.co/api/';

function initCards() {
    return [
        new Card('People', '<i class="icon-scout-trooper-by-radiusss"></i>', null).setLink(api + 'people/'),
        new Card('Planets', '<i class="icon-geonosis-by-radiusss"></i>', null).setLink(api + 'planets/'),
        new Card('Films', '<i class="icon-miscellaneous-by-radiusss"></i>', null).setLink(api + 'films/'),
        new Card('Species', '<i class="icon-lightsaber-by-radiusss"></i>', null).setLink(api + 'species/'),
        new Card('Vehicles', '<i class="icon-speeder-by-radiusss"></i>', null).setLink(api + 'vehicles/'),
        new Card('Starships', '<i class="icon-tie-fighter-by-radiusss"></i>', null).setLink(api + 'starships/')
    ];
};

function drawList(data, previousCards, island) {
    var additional = [];
    data.forEach(function (info, index) {
        var title = info.title || info.name;
        if (previousCards[index]) {
            previousCards[index].fillOppositeSide(title).getOppositeSide().setLink(info.url);
        } else {
            additional.push(new Card(title, '<i class="icon-boba-fett-by-radiusss"></i>'));
        }
    })
    island.removeAdditional(data.length);
    island.drawAdditional(additional);
}

function drawInfo(data, previousCards, island) {
    island.removeAdditional(6);
}

var island = new Island();
var defaultCards = initCards();

island.addCardsByChunks(defaultCards);

Card.info.subscribe(function (data) {
    if (data.results) {
        drawList(data.results, defaultCards, island)
    } else {
        drawInfo(data, defaultCards, island);
    }
    island.flip();
})
wrapper.appendChild(island.element);