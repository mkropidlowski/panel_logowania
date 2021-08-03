const userName = document.querySelector('.userName');
const logoutImage = document.querySelector('.logoutImage');

auth.onAuthStateChanged(user => {
    if(user) {
        userName.innerHTML = 'Zalogowano: ' +user.email;
    } else {
        console.log('Wylogowano.');
    }
})


logoutImage.addEventListener('click', e => {
    e.preventDefault();

    auth.signOut();
    window.location.href = '../';
})
