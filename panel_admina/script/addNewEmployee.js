const addEmployee = document.querySelector('.addEmployee'),
      employeeId = document.querySelector('.employeeId'),
      employeeName = document.querySelector('.employeeName'),
      employeeSurname = document.querySelector('.employeeSurname'),
      employeePosition = document.querySelector('.employeePosition'),
      addNewEmpBtn = document.querySelector('#addNewEmpBtn');



addNewEmpBtn.addEventListener('click', e => {

    db.collection('employees').add({

        employee_id: employeeId.value,
        name_surname: employeeName.value + ' ' + employeeSurname.value,
        position: employeePosition.value,
    })
    .then(() => {
        console.log("Document successfully added");
        window.location.reload(true);
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });

});