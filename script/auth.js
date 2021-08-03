const mainLoginForm = document.querySelector('#mainLoginForm');
const box = document.querySelector('.box');

    mainLoginForm.addEventListener('submit', e => {
        e.preventDefault();

        const email = mainLoginForm['userLogin'].value;
        const password = mainLoginForm['userPass'].value;

        auth.signInWithEmailAndPassword(email, password).then((res) => {
            window.location.href = 'panel_admina/index.html';
        }).catch((err) => {
            window.location.href = 'panel_logowania/index.html';
        });

    })


    box.addEventListener('click', e => {
        e.preventDefault();

        window.location.href = 'panel_pracownika/index.html';

    })