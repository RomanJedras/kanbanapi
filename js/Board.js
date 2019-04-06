
const board = {
    name: 'Tablica Kanban',
    values: [],
    addColumn: function(column) {
        this.values.push(column);
        this.count = this.values.length;
        this.element.appendChild(column.element);
        this.hasChildren = document.querySelectorAll('.column-card-list').length;
        this.element.appendChild(column.element);
        initSortable(column.id); //About this feature we will tell later
    },
    getCountColumn : function() {
        console.log(this.values.length)
        return this.values.length;
    },
    getExistPost : function() {
        console.log(this.hasChildren);
        return this.hasChildren;
    },
    element: document.querySelector('#board .column-container')
};

document.querySelector('#board .create-column').addEventListener('click', function() {
    let name = prompt('Enter a column name');
    let data = new FormData();

    data.append('name', name);

    fetch(prefix + baseUrl + '/column', {
        method: 'POST',
        headers: myHeaders,
        body: data,
    })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(resp) {
            let column = new Column(resp.id, name);
            board.addColumn(column);
        });
});

function initSortable(id) {
    let el = document.getElementById(id);
    let sortable = Sortable.create(el, {
        group: 'kanban',
        sort: true
    });
}

