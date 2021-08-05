const mainLoginForm = document.querySelector('#mainLoginForm');
const box = document.querySelector('.box');
const wrongPassError = document.querySelector('.wrongPassError');

    mainLoginForm.addEventListener('submit', e => {
        e.preventDefault();

        const email = mainLoginForm['userLogin'].value;
        const password = mainLoginForm['userPass'].value;

        auth.signInWithEmailAndPassword(email, password).then((res) => {
            
            window.location.href = 'panel_admina/index.html';

        }).catch((err) => {
           wrongPassError.innerHTML = 'Nieprawidłowe dane.';
        });

    })


    box.addEventListener('click', e => {
        e.preventDefault();

        window.location.href = 'panel_pracownika/index.html';

    })