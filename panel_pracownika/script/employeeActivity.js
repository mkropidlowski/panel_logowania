const reportOrderForm = document.querySelector('.reportOrderForm');
const ordersListBox = document.querySelector('.ordersListBox');
const operationListBox = document.querySelector('.operationListBox');
const employeesBox = document.querySelector('.employeesBox');
const machineList = document.querySelector('.machineList');
const viewPartsToDo = document.querySelector('.viewPartsToDo');
const howMuchToDo = document.querySelector('.howMuchToDo');
const partSum =document.querySelector('.partSum');
const getCurrVall = document.querySelector('.currentValue');
// LISTA PRACOWNIKÓW

db.collection("employees")
    .orderBy("employee_id", "asc")
    .onSnapshot(snaps =>{
  
    snaps.docChanges().forEach(changes =>{
        const docs = changes.doc;
        showEmployeesList(docs.data());          
    })

});

const showEmployeesList = (employee) => {

    let html = `
        <option class="employeeOption">${employee.employee_id} - ${employee.name_surname}</option>
    `;
    employeesBox.innerHTML += html;
    
}

const employeesView = () =>{
    const chosenOption = employeesBox.options[employeesBox.selectedIndex].text;

    if (chosenOption) {
        employeesBox.setAttribute("disabled", "disabled");
    }

}


// LISTA ZAMÓWIEŃ

db.collection('orders')
    .onSnapshot(snap =>{
  
    snap.docChanges().forEach(change =>{
        const doc = change.doc;
        
        if(change.type === 'added'){
            showOrdersList(doc.data(), doc.id);             
         } 
    })

});

// // FUNKCJA DO WYPISANIA LISTY ZLECEŃ

const showOrdersList = (n, id) => {
    
    let html = `
        <option class="orderIdNumber" data-id=${id} >${n.order_number}</option>
    `;
    ordersListBox.innerHTML += html;
    
}
// WYŚWIETLANIE LISTY OPERACJI


const ordersView = () => {

    const selectedText = ordersListBox.options[ordersListBox.selectedIndex].text;

    if (selectedText) {
        ordersListBox.setAttribute("disabled", "disabled");
    }
   
    db.collection('orders')
        .where('order_number', '==', selectedText)
        .get()
        .then(snaps => {
        snaps.docs.forEach(doc => {
            viewOperations(doc.data());    
        })
    }).catch(err => {
        console.log(err);
    });

   

    const viewOperations = (op) => {
       
        op.operation.forEach(list => {
            let html = `
              <option class="operationList opNumForProgress">${list.op_num} - ${list.op}</option>   
            `;
            operationListBox.innerHTML += html;
        });

        howMuchToDo.innerHTML = op.quantity;
        partSum.innerHTML = op.quantity;
        
    }
}


const showCurrentQuantity = () => {

        const selectedGuide = ordersListBox.options[ordersListBox.selectedIndex].text;
        const selectedOperation = operationListBox.options[operationListBox.selectedIndex].text;
        const subsOperation = parseInt(selectedOperation.substr(0,2));
    
        if(selectedOperation) {
            
            let quantitySumArray = []
        
            db.collection('progress')
            .where('guideNumber', '==', selectedGuide)
            .where('operationNumber', '==', subsOperation)
            .onSnapshot(snaps =>{
              
                snaps.docChanges().forEach(changes =>{
                    const docs = changes.doc;
                    const data = docs.data(); 
                    const tab = [data.quantity];
                
      
                       
                        tab.forEach(suma => {
                            quantitySumArray.push(suma);
                        });
                    
                });

        
                if(Array.isArray(quantitySumArray) && quantitySumArray.length){
                    sum = quantitySumArray.reduce((a, b) => {
                        return a + b;
                        });
               
                    getCurrVall.innerHTML = sum;   
                       
                } else {
                    quantitySumArray = [];      
                }
            }); 
        }   
    }
 

// LISTA MASZYN 

db.collection("machine")
    .orderBy("machine_number", "asc")
    .onSnapshot(snaps =>{
  
    snaps.docChanges().forEach(changes =>{
        const docs = changes.doc;
        showMachineList(docs.data());          
    })

});

const showMachineList = (machine) => {

    let html = `
        <option class="machineOption">${machine.machine_number}</option>
    `;
    machineList.innerHTML += html;
    
}

const machineView = () =>{
    const chosenMachineOption = machineList.options[machineList.selectedIndex].text;

    if (chosenMachineOption) {
        machineList.setAttribute("disabled", "disabled");
    }

}



