

document.addEventListener('DOMContentLoaded', function() {
    const prefix = "https://cors-anywhere.herokuapp.com/";
    const baseUrl = 'https://kodilla.com/pl/bootcamp-api';
    const myHeaders = {
        'X-Client-Id': '3888',
        'X-Auth-Token': '776c56468ec54d0f6a9d21257405690e'
    };

    fetch( prefix+baseUrl + '/board', {
                                headers: myHeaders})
        .then(function(resp) {
            return resp.json();
        })
        .then(function(resp) {
            setupColumns(resp.columns);
        });

     function setupColumns(columns) {
         columns.forEach(function(column) {
             let col = new Column(column.id, column.name);
           board.addColumn(col);
           setupCards(col, column.cards);
         });
         
     }

    function setupCards(col, cards) {
        cards.forEach(function (card) {
            let cardObj = new Card(card.id, card.name);
            col.addCard(cardObj);
        });
    }
});




function generateTemplate(name, data, basicElement) {
    const template = document.getElementById(name).innerHTML;
    let element = document.createElement(basicElement || 'li');
    element.classList.add('flex-item');
    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);

    return element;
}

//document.getElementById('count').innerHTML = ' Number column '+ valuesColumns.lengt;



// CREATING COLUMNS
// let todoColumn = new Column('To do');
// let doingColumn = new Column('In progress');
// let doneColumn = new Column('Done');
//
// // ADDING COLUMNS TO THE BOARD
// board.addColumn(todoColumn);
// board.addColumn(doingColumn);
// board.addColumn(doneColumn);
// document.getElementById('count').innerHTML = ' Number column '+ board.getCountColumn() + ' exist card list '+board.getExistPost();
// console.log(document.querySelectorAll('.card').length)
//
// // CREATING CARDS
// let card1 = new Card('New task','New task ab. company');
// let card2 = new Card('Create kanban boards','Progress kanban');
//
// // ADDING CARDS TO COLUMNS
// todoColumn.addCard(card1);
// doingColumn.addCard(card2);