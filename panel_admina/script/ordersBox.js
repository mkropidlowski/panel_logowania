const ordersBox = document.querySelector('.ordersBox');

const additionDate = () => {
    const date = new Date();
     h = date.getHours();
     m = date.getMinutes();
   
     d = date.getDate();
     year = date.getFullYear();
     monthList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
     month = monthList[date.getMonth()];


    const result =  year+'-'+month+'-'+d;
    return result;
    
}


db.collection('orders')
    .onSnapshot(snap =>{
  
    snap.docChanges().forEach(change =>{
        const doc = change.doc;
        if(change.type === 'added'){
            ordersList(doc.data(), doc.id);
        } else if(change.type === 'removed'){
            deleteOrder(doc.id);
        }
    });
});

const ordersList = (n, id) => {


    const endDate = new Date(n.final_date);
    const actDate = new Date(additionDate());

    const differenceInTime = endDate.getTime() - actDate.getTime();
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));


    const ulTag = document.createElement('ul');
    
    n.operation.forEach(list => {
        ulTag.innerHTML += '<li class="listStyle">'+ list.op_num + ' '+ list.op + '</li>';
    })

       
    const opBox = document.createElement('div');
    const operationList = document.createElement('div');
    const orderNumDiv = document.createElement('div');
    const fullOperationList = document.createElement('div');
    const quantityDiv = document.createElement('div');
    const restOrderInfo = document.createElement('div');
    
    opBox.classList.add('opBox');
    operationList.classList.add('operationList');
    operationList.setAttribute('data-id', id);
    
    opBox.appendChild(operationList);
    operationList.appendChild(orderNumDiv);
    orderNumDiv.classList.add('box');
    orderNumDiv.innerHTML = '<p>'+n.order_number+'</p>';
    
    fullOperationList.classList.add('box');
    operationList.appendChild(fullOperationList);
    fullOperationList.appendChild(ulTag)

    quantityDiv.classList.add('box');
    quantityDiv.innerHTML = '<p>'+n.quantity+'</p>';
    operationList.appendChild(quantityDiv);


    restOrderInfo.classList.add('restOrderInfo');
    let html = `
        <div><span><img class="removeOrderBtn" src="img/remove.png"></span></div>
        <div class="box boxDetailsInfo">
            <p>Nazwa klienta: <b>${n.client_name}</b></p>  
            <p>Czas realizacji:</br><b>${n.final_date}</b></p>
            <p>Do końca pozostało: </br><b>${differenceInDays} dni</b></p>
        </div>
        
      `;
    restOrderInfo.innerHTML = html;
    operationList.appendChild(restOrderInfo);

    ordersBox.appendChild(opBox);


           
}   


const deleteOrder = (id) =>{
    const operationList = document.querySelectorAll('.operationList');

    operationList.forEach(list => {
        if(list.getAttribute('data-id') === id){
            list.remove();
        }
    })
}


ordersBox.addEventListener('click', e =>{

    
    if(e.target.classList.contains('removeOrderBtn')){
       
        const ids = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
    
        db.collection('orders').doc(ids)
            .delete()
            .then(() => {
            })
            .catch(err => console.log(err));    
    }   
})




