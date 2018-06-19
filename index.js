var wrapper = document.getElementById('wrapper');
var api = 'https://swapi.co/api/';

function initRows() {
    var cardsFirst = [
        new Card('People', '<i class="icon-scout-trooper-by-radiusss"></i>', null).setLink(api + 'people/'),
        new Card('Planets', '<i class="icon-geonosis-by-radiusss"></i>', null).setLink(api + 'planets/'),
        new Card('Films', '<i class="icon-miscellaneous-by-radiusss"></i>', null).setLink(api + 'films/')
    ];
    var cardsSecond = [
        new Card('Species', '<i class="icon-lightsaber-by-radiusss"></i>', null).setLink(api + 'species/'),
        new Card('Vehicles', '<i class="icon-speeder-by-radiusss"></i>', null).setLink(api + 'vehicles/'),
        new Card('Starships', '<i class="icon-tie-fighter-by-radiusss"></i>', null).setLink(api + 'starships/')
    ];
    var firstRow = new Row(cardsFirst);
    var secondRow = new Row(cardsSecond);
    return [firstRow, secondRow];
}
var island = new Island(initRows());
console.log(island);
wrapper.appendChild(island.element);