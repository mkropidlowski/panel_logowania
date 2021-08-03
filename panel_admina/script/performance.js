const performanceContainer = document.querySelector('.performanceContainer');
const ordersListBox = document.querySelector('.ordersListBox');
const operationListBox = document.querySelector('.operationListBox');
const viewPartsToDo = document.querySelector('.viewPartsToDo');
const howMuchToDo = document.querySelector('.howMuchToDo');
const partSum = document.querySelector('.partSum');
const getCurrVall = document.querySelector('.currentValue');
const refreshBtn = document.querySelector('.refreshBtn');

db.collection('orders')
    .onSnapshot(snap =>{
  
    snap.docChanges().forEach(change =>{
        const doc = change.doc;
        
        showOrdersList(doc.data(), doc.id);            
    })

});

const showOrdersList = (n, id) => {
    
    let html = `
        <option class="orderIdNumber" data-id=${id} >${n.order_number}</option>
    `;
    ordersListBox.innerHTML += html;
    
}


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
              <option class="operationName opNumForProgress">${list.op_num} - ${list.op}</option>   
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



refreshBtn.addEventListener('click', e => {
    ordersListBox.removeAttribute("disabled");
    operationListBox.innerHTML = '<option class="operationName opNumForProgress">Wybierz operację</option>';
    getCurrVall.innerHTML = '0';
    howMuchToDo.innerHTML = '0';
    partSum.innerHTML = '0';
    
});






























// const ordersView = () => {

//     const selectedGuide = ordersListBox.options[ordersListBox.selectedIndex].text;

//   //  let quantitySumArray = [];
//    // let tab = [];
        
//         db.collection('progress')
//         .where('guideNumber', '==', selectedGuide)
//         .onSnapshot(snaps =>{
          
//             snaps.docChanges().forEach(changes =>{
//                 const docs = changes.doc;
//                 viewProgress(docs.data()); 


//             });
       
// });

//      let progressTable = [];
//     const viewProgress = (data) => {
                
//         progressTable = data.quantity;
//         let html = `
//         <div class="progressLine">
//             <div class="progressRecord">
//                 <p>${data.guideNumber} = ${data.fullOpName} :${progressTable}</p>     
        
//             </div>
//         </div>
//         `;

//         performanceContainer.innerHTML += html;   

//     }             

// }




////

// tab.forEach(suma => {
//     quantitySumArray.push(suma);
//     });

// if(Array.isArray(quantitySumArray) && quantitySumArray.length){
//     sum = quantitySumArray.reduce((a, b) => {
//         return a + b;
//         });
        
//     let html = `
//     <div class="progressLine">
//         <div class="progressRecord">
//             <p>${data.guideNumber}</p>     
//             <p>${sum}</p>
//         </div>
//     </div>
//     `;
            
//     performanceContainer.innerHTML = html;   
         
// } else {
//     quantitySumArray = [];   
//     tab = [];     
// }  


///









