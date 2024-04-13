const form = document.getElementById('supplyDepositForm');
const depositSelect = document.querySelector('[name="depositSupply"]');
const drinkSelect = document.querySelector('[name="drinkSupply"]');



// Récupérer les dépots
fetch('http://127.0.0.1:8000/api/storehouse/', {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => {
    if (!response.ok){
        console.error('Une erreur est survenue lors de la récupération des dépots !');
    }

    return response.json();
})
.then(data => {
    const categories = data;
    categories.forEach(category => {
        let newChild = document.createElement('option');
        newChild.setAttribute('value', category.id);
        newChild.textContent = category.name;

        depositSelect.appendChild(newChild);
    });
})
.catch(err => {
    console.error('Error', err);
});


// Récupérer les boissons
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
.then(data => {
    const categories = data;
    categories.forEach(category => {
        let newChild = document.createElement('option');
        newChild.setAttribute('value', category.id);
        newChild.textContent = category.name;

        drinkSelect.appendChild(newChild);
    });
})
.catch(err => {
    console.error('Error', err);
});


//Soumission du formulaire

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupérer les données du formulaire
    const dateSupply = document.querySelector('[name="dateSupply"]').value;
    const depositSupply = document.querySelector('[name="depositSupply"]').value;
    const drinkSupply = document.querySelector('[name="drinkSupply"]').value;
    const quantitySupply = document.querySelector('[name="quantitySupply"]').value;
    

    // Gestion de validations
    toastrSchema();
    if (dateSupply == "") {
        toastr.info("Veuillez renseigner la date d'approvisionnement !");
        return;
    }
    if (depositSupply == "") {
        toastr.info("Veuillez renseigner le dépôt à approvisionner !");
        return;
    }
    if (drinkSupply == "") {
        toastr.info("Veuillez renseigner la boisson !");
        return;
    }
    if (quantitySupply == "") {
        toastr.info("Veuillez renseigner la quantité à approvisionner !");
        return;
    }

    // Fin Gestion des validations

    // Formatage des données sous JSON
    const formData = {
        date_time: dateSupply,
        // quantity: parseFloat(quantitySupply),
        storehouse: depositSupply,
        drink_racks: drinkSupply
    };

    
})


function toastrSchema() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
}