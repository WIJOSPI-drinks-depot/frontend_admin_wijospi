document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('#listDrinkTable tbody');

    fetch('http://127.0.0.1:8000/api/drink-rack/', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok){
            console.error('Une erreur est survenue lors de la récupération des boissons !');
        }

        return response.json();
    })
    .then(drinks => {
        drinks.forEach(drink => {
            // Création d'une nouvelle ligne pour chaque boisson
            let newRow = tableBody.insertRow();

            // Insertion des données dans les colonnes de la ligne
            let idDrink = newRow.insertCell();
            idDrink.textContent = drink.id;

            let libelleDrink = newRow.insertCell();
            libelleDrink.textContent = drink.name;

            let priceDrink = newRow.insertCell();
            priceDrink.textContent = drink.price + " FCFA";

            let capacityDrink = newRow.insertCell();
            capacityDrink.textContent = drink.capacity + " cl";

            let lifespanDrink = newRow.insertCell();
            lifespanDrink.textContent = drink.lifespan + " mois";
        });
    })
    .catch(err => {
        console.error('Error', err);
    });
});
