const sendFormBtn = document.querySelector('#sendForm');
const startTime = document.querySelector('.startTime');
const stopTime = document.querySelector('.stopTime');
const partQuantity = document.querySelector('.quantity');
const comments = document.querySelector('.comments');


const additionDate = () => {
    const date = new Date();
     h = date.getHours();

     
       
     m = date.getMinutes() < 10 ? '0' : + date.getMinutes();
    
     d = date.getDate();
     year = date.getFullYear();
     monthList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
     month = monthList[date.getMonth()];


    const result =  h+":"+m+" - "+d+"."+month+"."+year;
    return result;

    
    
}


sendFormBtn.addEventListener('click', e => {

  
    
    db.collection('fullReport').add({
        guideNumber: ordersListBox.value,
        operationNumber: operationListBox.value,
        operatorName: employeesBox.value,
        start: startTime.value,
        stop: stopTime.value,
        quantity: parseInt(partQuantity.value),
        machineNum: machineList.value,
        orderComments: comments.value,
        databaseTime: firebase.firestore.Timestamp.now(),
        created_at: additionDate()
        
    })
        .then(() => {
                console.log("Document successfully added");
                window.location.reload(true);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        

        
    db.collection('progress').add({
        guideNumber: ordersListBox.value,
        fullOpName: operationListBox.value,
        operatorName: employeesBox.value,
        operationNumber: parseInt(operationListBox.value.substr(0,2)),
        quantity: parseInt(partQuantity.value),    
    })
    .then(() => {
        console.log("Document successfully added");
        })
        .catch((error) => {
        console.error("Error writing document: ", error);
        });
                

        

});


