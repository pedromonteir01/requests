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
            listHTMLorders();
            sendMsg('success', 'Você cadastrou o pedido!')
            showQNT();
            cleanFields();
        }
    }

    listOrder() {
        return this.list;
    }

    listOrders() {
        return this.list.length <= 0 ? '' : this.list.length;
    }

    listOrderById(id) {
        return this.list.find((order) => order.id == id);
    }

    updateOrder(id, client, table, description) {
        const order = this.listOrderById(id);
    
        order.client = client;
        order.table = table;
        order.description = description;

        return order;
      }

    deleteOrder(param) {
        return (this.list = this.list.filter((order) => 
            order.id != param
        ));
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
    document.getElementById('msgDiv').classList.remove('hidden');


    setTimeout(function () {
        document.getElementById('msgDiv').classList.add('hidden');
    }, 3000)
}

function listHTMLorders() {
    const orderslist = orders.listOrder();
    const listElement = document.getElementById('orders')

    let content = '';

    orderslist.forEach(order => {
        content += `
            <div id="content">
                <p>ID: ${order.id}</p>
                <p>Client: ${order.client}</p>
                <p>Table: ${order.table}</p>
                <p>Description: ${order.description}</p>
                <button type="button" onclick="preEdit(${order.id})">Editar</button>
                <button type="button" onclick="deleteOrder(${order.id})">Excluir</button>
            </div>
        `
    });

    listElement.innerHTML = content;
}

let aux = null;

function preEdit(id) {
    const order = orders.listOrderById(id);

    document.getElementById('client').value = order.client;
    document.getElementById('table').value = order.table;
    document.getElementById('description').value = order.description;

    aux = id;

    document.getElementById('register').classList.add('hidden');
    document.getElementById('edit').classList.remove('hidden');
}

function editOrder() {
    let client = document.getElementById('client').value;
    let table = document.getElementById('table').value;
    let description = document.getElementById('description').value;

    orders.updateOrder(aux, client, table, description);

    listHTMLorders();
    cleanFields();

    document.getElementById('register').classList.remove('hidden');
    document.getElementById('edit').classList.add('hidden');

    aux = null;
}

function deleteOrder(id) {
    orders.deleteOrder(id);
    listHTMLorders();
    showQNT();
}

function showQNT() {
    let qnt = orders.listOrders();
    document.getElementById('list').innerHTML = `Order list - ${qnt}`
}