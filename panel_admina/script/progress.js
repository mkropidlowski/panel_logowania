const ordersProgress = document.querySelector('.ordersProgress');
const convertDate = new Date();


db.collection('fullReport')
    .orderBy("databaseTime", "desc")
    .onSnapshot(snap =>{
  
    snap.docChanges().forEach(change =>{
        const doc = change.doc;
        if(change.type === 'added'){
            ordersProgressView(doc.data(), doc.id);
        } else if(change.type === 'removed'){
            deleteData(doc.id);
        }
        
    });
});

const ordersProgressView = (orders, id) => {
    
    let html = `
        <div class="progressBox" data-id=${id}>
            <div class="progressHeader">
                <span><b>${orders.guideNumber} |</b> ${orders.operatorName} | <b>${orders.created_at}</b></span>
                <span><img class="removeImgBtn" src="img/remove.png"></span>
            </div>
                <p class="detailedBox">
                    <span class="oprtNumStyle">Operacja: <b>${orders.operationNumber}</b>
                    <span class="quantityStyle"> | Ilość sztuk: <b>${orders.quantity}</b></span>
                    <span class="machineNumStyle">| Maszyna: ${orders.machineNum}</span>
                    <p class="detailedBox">Początek / Koniec pracy:<b> ${orders.start} : ${orders.stop}</b></p>
                    <p class="detailedBox">Komentarz operatora: <b>${orders.orderComments}</b></p>
                </p>                    
        </div>
        
    `;

    ordersProgress.innerHTML += html;
}


const deleteData = (id) =>{
    const progressBoxList = document.querySelectorAll('.progressBox');

    progressBoxList.forEach(list => {
        if(list.getAttribute('data-id') === id){
            list.remove();
        }
    })
}


ordersProgress.addEventListener('click', e =>{

    if(e.target.classList.contains('removeImgBtn')){
        const ids = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');

        db.collection('fullReport').doc(ids)
            .delete()
            .then(() => {
            })
            .catch(err => console.log(err));
    
    }
    
})





 
