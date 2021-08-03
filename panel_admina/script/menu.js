const ordersLink = document.querySelector('.ordersLink'),
      employees = document.querySelector('.employees'),
      progressDiagram = document.querySelector('.progressDiagram'),
      performance = document.querySelector('.performance'),
      addNewOrderBtn = document.querySelector('.addNewOrderBtn'),
      loadedContent = document.querySelector('.loadedContent'),
      addNewEmployee = document.querySelector('.addNewEmployee');


const ordersBoxLink = document.querySelector('.ordersBoxLink'),
      employeesListLink = document.querySelector('.employeesListLink'),
      diagramLink = document.querySelector('.diagramLink'),
      performanceBarLink = document.querySelector('.performanceBarLink'), 
      createNewOrderLink = document.querySelector('.createNewOrderLink'),
      addNewEmployeeLink = document.querySelector('.addNewEmployeeLink');


ordersLink.addEventListener('click', e =>{
    

    ordersBoxLink.classList.remove('hideBox');
    employeesListLink.classList.add('hideBox');
    diagramLink.classList.add('hideBox');
    performanceBarLink.classList.add('hideBox');
    createNewOrderLink.classList.add('hideBox');
    addNewEmployeeLink.classList.add('hideBox');
    
});

employees.addEventListener('click', e =>{
    employeesListLink.classList.remove('hideBox');

    ordersBoxLink.classList.add('hideBox');
    diagramLink.classList.add('hideBox');
    performanceBarLink.classList.add('hideBox');
    createNewOrderLink.classList.add('hideBox');
    addNewEmployeeLink.classList.add('hideBox');
});


progressDiagram.addEventListener('click', e =>{
    diagramLink.classList.remove('hideBox');

    employeesListLink.classList.add('hideBox');
    ordersBoxLink.classList.add('hideBox');
    performanceBarLink.classList.add('hideBox');
    createNewOrderLink.classList.add('hideBox');
    addNewEmployeeLink.classList.add('hideBox');

});

performance.addEventListener('click', e => {
    performanceBarLink.classList.remove('hideBox');
    
    employeesListLink.classList.add('hideBox');
    ordersBoxLink.classList.add('hideBox');
    diagramLink.classList.add('hideBox');
    createNewOrderLink.classList.add('hideBox');
    addNewEmployeeLink.classList.add('hideBox');
});


addNewOrderBtn.addEventListener('click', e =>{
    createNewOrderLink.classList.remove('hideBox');
    
    employeesListLink.classList.add('hideBox');
    ordersBoxLink.classList.add('hideBox');
    diagramLink.classList.add('hideBox');
    performanceBarLink.classList.add('hideBox');
    addNewEmployeeLink.classList.add('hideBox');
});


addNewEmployee.addEventListener('click', e =>{
    addNewEmployeeLink.classList.remove('hideBox');

    createNewOrderLink.classList.add('hideBox'); 
    employeesListLink.classList.add('hideBox');
    ordersBoxLink.classList.add('hideBox');
    diagramLink.classList.add('hideBox');
    performanceBarLink.classList.add('hideBox');
});




