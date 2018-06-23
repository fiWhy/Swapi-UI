var wrapper = document.getElementById('wrapper');

var island = new Island();
wrapper.appendChild(island.element);

RequestAPI.get('https://swapi.co/api/')
    .then(Calc.objectToArray)
    .then(function (arr) {
        return arr.map(function (endpoint) {
            return (new Card(
                endpoint.property,
                '<i class="icon-' + UI.icons[endpoint.property] + '"></i>',
                null,
                endpoint.value));
        });
    })
    .then(function (cards) {
        island.addCardsByChunks(cards);
    })
