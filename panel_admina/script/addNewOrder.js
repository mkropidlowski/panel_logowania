const newOrderNumber = document.querySelector('.newOrderNumber');
const opOne = document.querySelector('.opOne');
const opTwo = document.querySelector('.opTwo');
const opThree = document.querySelector('.opThree');
const opFour = document.querySelector('.opFour');
const opFive = document.querySelector('.opFive');
const opSix = document.querySelector('.opSix');
const opSeven = document.querySelector('.opSeven');
const operationOneDesc = document.querySelector('.operationOneDesc');
const operationTwoDesc = document.querySelector('.operationTwoDesc');
const operationThreeDesc = document.querySelector('.operationThreeDesc');
const operationFourDesc = document.querySelector('.operationFourDesc');
const operationFiveDesc = document.querySelector('.operationFiveDesc');
const operationSixDesc = document.querySelector('.operationSixDesc');
const operationSevenDesc = document.querySelector('.operationSevenDesc');
const quantityNumber = document.querySelector('.quantityNumber');
const clientName = document.querySelector('.clientName');
const finalDate = document.querySelector('.finalDate');
const addNewOrder = document.querySelector('#addNewOrder');
const date = new Date();



addNewOrder.addEventListener('click', e => {

    const operation = [
        {op_num: 10, op:opOne.value, partsToDo: parseInt(quantityNumber.value), description:operationOneDesc.value},
        {op_num: 20, op:opTwo.value, partsToDo: parseInt(quantityNumber.value), description:operationTwoDesc.value},
        {op_num: 30, op:opThree.value, partsToDo: parseInt(quantityNumber.value), description:operationThreeDesc.value},
        {op_num: 40, op:opFour.value, partsToDo: parseInt(quantityNumber.value), description:operationFourDesc.value},
        {op_num: 50, op:opFive.value, partsToDo: parseInt(quantityNumber.value), description:operationFiveDesc.value},
        {op_num: 60, op:opSix.value, partsToDo: parseInt(quantityNumber.value), description:operationSixDesc.value},
        {op_num: 70, op:opSeven.value, partsToDo: parseInt(quantityNumber.value), description:operationSevenDesc.value},
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


