
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
    element: document.querySelector('#board .column-container')
};




document.querySelector('#board .create-column').addEventListener('click', function() {
    let name = prompt('Enter a column name');
    let data = new FormData();

    data.append('name', name);

    const myHeaders = {
        'X-Client-Id': '3888',
        'X-Auth-Token': '776c56468ec54d0f6a9d21257405690e'
    };


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

