
function Column(id, name) {
    let self = this;
    this.id = id;
    this.name = name || 'No name given';
    this.index = 'list';
    this.element = generateTemplate('column-template', { name: this.name, id: this.id });
    const prefix = "https://cors-anywhere.herokuapp.com/";
    const baseUrl = 'https://kodilla.com/pl/bootcamp-api';
    const myHeaders = {
        'X-Client-Id': '3888',
        'X-Auth-Token': '776c56468ec54d0f6a9d21257405690e'
    };




    this.element.querySelector('.column').addEventListener('click', function (event) {
        event.stopPropagation();

        if (event.target.classList.contains('btn-delete')) {
            self.removeColumn();
        }

        if (event.target.classList.contains('add-card')) {
           //
            let cardName =  prompt("Enter the name of the card");
           // let description = prompt('Enter description card');
            event.stopPropagation();
            const data = new FormData();
            data.append('name', cardName);
          //  data.append('description',description);
            data.append('bootcamp_kanban_column_id', self.id);

            fetch(prefix+baseUrl + '/card', {
                method: 'POST',
                headers: myHeaders,
                body:  data,
            })
                .then(function(res) {
                    return res.json();
                })
                .then(function(resp) {
                    //create a new client side card
                    const card = new Card(resp.id, cardName);
                    self.addCard(card);
                });
        }
    });
}

Column.prototype = {
    addCard: function(card) {
        this.element.querySelector('ul').appendChild(card.element);
    },
    removeColumn: function() {
        const self = this;
        fetch(prefix+baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
            .then(function(resp) {
                return resp.json();
            })
            .then(function(resp) {
                self.element.parentNode.removeChild(self.element);
            });
    },
    updateColumn: function () {
        const self = this;
        const data = new FormData();
        data.append('name', this.name);
        fetch(prefix+baseUrl + '/column/' + self.id, { method: 'PUT', headers: myHeaders, body: data })
            .then(function(resp) {
                return resp.json();
            })
            .then(function(resp) {
                self.element.parentNode.appendChild(self.element);
            });
    }
};
