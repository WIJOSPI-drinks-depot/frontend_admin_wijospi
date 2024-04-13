document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('#listCategoryTable tbody');

    fetch('http://127.0.0.1:8000/api/category/', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok){
            console.error('Une erreur est survenue lors de la récupération des catégories !');
        }

        return response.json();
    })
    .then(categories => {
        categories.forEach(categorie => {
            // Création d'une nouvelle ligne pour chaque catégorie
            let newRow = tableBody.insertRow();

            // Insertion des données dans les colonnes de la ligne
            let idCategory = newRow.insertCell();
            idCategory.textContent = categorie.id;

            let libelleCategory = newRow.insertCell();
            libelleCategory.textContent = categorie.name;
        });
    })
    .catch(err => {
        console.error('Error', err);
    });
});
