var wrapper = document.getElementById('wrapper');

var island = new Island();

var icons = {
    people: 'scout-trooper-by-radiusss',
    planets: 'geonosis-by-radiusss',
    films: 'miscellaneous-by-radiusss',
    species: 'lightsaber-by-radiusss',
    vehicles: 'speeder-by-radiusss',
    starships: 'tie-fighter-by-radiusss',
    default: 'tie-fighter-by-radiusss'
};

RequestAPI.get('https://swapi.co/api/')
    .then(function (data) {
        var arr = [];
        var rows = [];
        for (var key in data) {
            var endpoint = data[key];
            arr.push({
                title: key,
                link: endpoint
            });
        }
        return arr;

    }).then(function (arr) {
        var rows = [];
        for (var i = 0; i < (arr.length / Island.chunkLanght); i++) {

            var row = new Row();
            var index = i * Island.chunkLanght;
            var cards = arr.slice(index,
                index + Island.chunkLanght);
            cards.forEach(function (cardObject) {

                var card = new Card();
                card.getCurrentSide()
                    .setTitle(cardObject.title)
                    .setLink(cardObject.link)
                    .setBody('<i class="icon-' + icons[cardObject.title] + '"></i>')
                    .setFooter('Custom');

                row.addCard(card);
            })
            rows.push(row);
        }
        return rows;
    })
    .then(function (rows) {
        var island = new Island(rows);
        wrapper.appendChild(island.element);
    })
