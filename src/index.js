var Island = require('./lib/island');
var Card = require('./lib/card');
var Calc = require('./lib/calc');
require('./styles.scss');
require('../assets/icons/styles.scss');

var get = require('./lib/request-api').get;
var objectToArray = require('./lib/calc').objectToArray;
var UI = require('./lib/ui');

var wrapper = document.getElementById('wrapper');

var island = new Island();
wrapper.appendChild(island.element);

get('https://swapi.co/api/')
    .then(objectToArray)
    .then(function (arr) {
        return arr.map(function (endpoint) {
            return (new Card(
                endpoint.property,
                '<i class="icon-' + UI.icons[endpoint.property] + '"></i>',
                null,
                endpoint.value)); ``
        });
    })
    .then(function (cards) {
        island.addCardsByChunks(cards);
    })


Card.click(function (card) {
    var link = card.getCurrentSide().link;
    link && get(link)
        .then(function (response) {
            var arr;
            if (response.results) {
                arr = response.results.map(function (card) {
                    return {
                        title: card.name || card.title,
                        link: card.url || card.link,
                        footer: card.footer
                    }
                });
            } else {
                var arr = Calc.objectToArray(response).map(function (info) {
                    return {
                        title: info.property,
                        footer: info.value
                    }
                });
            }
            island.append(arr);
        });
})