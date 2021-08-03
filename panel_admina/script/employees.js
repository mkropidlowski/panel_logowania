const employeesBox = document.querySelector('.employeesBox');


db.collection('employees')
    .orderBy("employee_id", "asc")
    .onSnapshot(snap =>{
  
    snap.docChanges().forEach(change =>{
        const doc = change.doc;
        if(change.type === 'added'){
            employeesList(doc.data(), doc.id);
        } else if(change.type === 'removed'){
            deleteEmployee(doc.id);
        }
    });
});

const employeesList = (employee, id) => {

    let html = `
   <div class="employeesListContainer" data-id=${id}>     
        <div class="employeesStyleBox"><span><b>${employee.employee_id}</b></span></div>     
        <div class="employeesStyleBox"><span>${employee.name_surname}</span></div>
        <div class="employeesStyleBox"><span>${employee.position}</span></div>
        <span><img class="removeImgBtn" src="img/remove.png"></span>
   </div>
        `;
        employeesBox.innerHTML += html;
    
}



const deleteEmployee = (id) =>{
    const employeesBoxList = document.querySelectorAll('.employeesListContainer');

    employeesBoxList.forEach(list => {
        if(list.getAttribute('data-id') === id){
            list.remove();
        }
    })
}


employeesBox.addEventListener('click', e =>{

    
    if(e.target.classList.contains('removeImgBtn')){

        const ids = e.target.parentElement.parentElement.getAttribute('data-id');
        db.collection('employees').doc(ids)
            .delete()
            .then(() => {
            })
            .catch(err => console.log(err));    
    }   
})
