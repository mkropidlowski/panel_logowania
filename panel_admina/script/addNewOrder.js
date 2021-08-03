const newOrderNumber = document.querySelector('.newOrderNumber');
const opOne = document.querySelector('.opOne');
const opTwo = document.querySelector('.opTwo');
const opThree = document.querySelector('.opThree');
const opFour = document.querySelector('.opFour');
const opFive = document.querySelector('.opFive');
const opSix = document.querySelector('.opSix');
const opSeven = document.querySelector('.opSeven');
const quantityNumber = document.querySelector('.quantityNumber');
const clientName = document.querySelector('.clientName');
const finalDate = document.querySelector('.finalDate');
const addNewOrder = document.querySelector('#addNewOrder');
const date = new Date();



addNewOrder.addEventListener('click', e => {

    const operation = [
        {op_num: 10, op:opOne.value, partsToDo: parseInt(quantityNumber.value)},
        {op_num: 20, op:opTwo.value, partsToDo: parseInt(quantityNumber.value)},
        {op_num: 30, op:opThree.value, partsToDo: parseInt(quantityNumber.value)},
        {op_num: 40, op:opFour.value, partsToDo: parseInt(quantityNumber.value)},
        {op_num: 50, op:opFive.value, partsToDo: parseInt(quantityNumber.value)},
        {op_num: 60, op:opSix.value, partsToDo: parseInt(quantityNumber.value)},
        {op_num: 70, op:opSeven.value, partsToDo: parseInt(quantityNumber.value)},
    ]
        let filters = operation.filter(filters => {
             return filters.op === '';
         });
    
        operation.length = (operation.length - filters.length);
    

    db.collection('orders').add({
        order_number: newOrderNumber.value,
        operation,
        quantity: parseInt(quantityNumber.value),
        client_name: clientName.value,
        final_date: finalDate.value,
    })
    
    .then(() => {
        console.log("Document successfully added");
        window.location.reload(true);
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
});


