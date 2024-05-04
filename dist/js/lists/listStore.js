document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('#listStoreTable tbody');

    fetch('http://127.0.0.1:8000/api/storehouse/', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok){
            console.error('Une erreur est survenue lors de la récupération des dépôts !');
        }

        return response.json();
    })
    .then(stores => {
        stores.forEach(store => {
            // Création d'une nouvelle ligne pour chaque dépôt
            let newRow = tableBody.insertRow();

            // Insertion des données dans les colonnes de la ligne
            let idStore = newRow.insertCell();
            idStore.textContent = store.id;

            let libelleStore = newRow.insertCell();
            libelleStore.textContent = store.name;

            let typeStore = newRow.insertCell();
            typeStore.textContent = store.type;

            let contactStore = newRow.insertCell();
            contactStore.textContent = store.contact;

            let emailStore = newRow.insertCell();           
            emailStore.textContent = store.email;
            
            let adressStore = newRow.insertCell();
            adressStore.textContent = store.address;
        });
    })
    .catch(err => {
        console.error('Error', err);
    });
});
