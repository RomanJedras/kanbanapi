function Card(id, name) {
    const self = this;
    this.id = id;
    this.name = name;
    this.class = 'has';
    this.element = generateTemplate('card-template', { name: this.name, id: this.id, class: this.class }, 'li');
    this.element.querySelector('.card').addEventListener('click', function (event) {
        event.stopPropagation();

        if (event.target.classList.contains('btn-delete')) {
            self.removeCard();
        }

    });
}

const prefix = "https://cors-anywhere.herokuapp.com/";
const baseUrl = 'https://kodilla.com/pl/bootcamp-api';
const myHeaders = {
    'X-Client-Id': '3888',
    'X-Auth-Token': '776c56468ec54d0f6a9d21257405690e'
};



Card.prototype = {
    removeCard: function() {
        const self = this;
        fetch(prefix + baseUrl + '/card/' + self.id, {method: 'DELETE', headers: myHeaders})
            .then(function (resp) {
                return resp.json();
            })
            .then(function (resp) {
                self.element.parentNode.removeChild(self.element);
            })
    },
    updateCard: function () {
        const self = this;
        const data = new FormData();
        let cardName =  prompt("Enter the name of the card");
        data.append('name', cardName);
        data.append('bootcamp_kanban_column_id', self.id);
        fetch(prefix + baseUrl + '/card/' + self.id, {method: 'PUT', headers: myHeaders, body: data})
            .then(function (resp) {
                return resp.json();
            })
            .then(function (resp) {
                self.element.parentNode.appendChild(self.element);
            })
    }
};