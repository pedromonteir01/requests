class Order {
    constructor(client, table, description) {
        this.client = client;
        this.table = table;
        this.description = description;
        this.id = this.getId();
    }

    getId() {
        return Math.floor(Math.random() * 9999);
    }
}

class OrdersList {
    constructor() {
        this.list = [];
    }

    addOrder(order) {
        if(isAnyInputEmpty()) {
            sendMsg('error', 'Preencha todos os campos');
        } else {
            this.list.push(order);
            cleanFields();
        }
    }
}

const orders = new OrdersList();

function catchValues() {
    let client = document.getElementById('client').value;
    let table = document.getElementById('table').value;
    let description = document.getElementById('description').value;

    const order = new Order(client, table, description);
    orders.addOrder(order);
}

function cleanFields() {
    document.getElementById('client').value = '';
    document.getElementById('table').value = '';
    document.getElementById('description').value = '';
}

function isAnyInputEmpty() {
    let client = document.getElementById('client').value;
    let table = document.getElementById('table').value;
    let description = document.getElementById('description').value;

    if(client == '' || table == '' || description == '') {
        return true;
    } else {
        return false;
    }
}

function sendMsg(type, msg) {
    let msgDiv = document.getElementById('msgDiv');
    msgDiv.innerHTML = '';

    let msgP= `<p class="${type}">${msg}</p>`

    msgDiv.innerHTML = msgP;
}

