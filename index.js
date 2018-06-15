var wrapper = document.getElementById('wrapper');
var island = (new UI.Island).addRow((new UI.Row())
    .addCard(new UI.Card())
    .addCard(new UI.Card())
    .addCard(new UI.Card()))
    .addRow(
        (new UI.Row())
            .addCard(new UI.Card())
            .addCard(new UI.Card())
            .addCard(new UI.Card()))
    .addRow(
        (new UI.Row())
            .addCard(new UI.Card())
            .addCard(new UI.Card())
            .addCard(new UI.Card()));

wrapper.appendChild(island.render());
var card = island.getCard(1, 1);
setTimeout(function () {
    card.moveTop(1);
    setTimeout(function () {
        card.moveRight(1);
        setTimeout(function () {
            card.moveBottom(1);
            setTimeout(function () {
                card.moveLeft(1);
            }, 500);
        }, 500);
    }, 500);
}, 1000);