const form = document.getElementById('supplyForm');
const storehouseSelect = document.querySelector('[name="storehouseSupply"]');
const drinkSelect = document.querySelector('[name="drinkSupply"]');

// Récupérer les dépôts
fetch('http://127.0.0.1:8000/api/storehouse/', {
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
.then(data => {
    const storehouses = data;
    storehouses.forEach(storehouse => {
        if (storehouse.type !== "Général"){
            let newChild = document.createElement('option');
            newChild.setAttribute('value', storehouse.id);
            newChild.textContent = storehouse.name;
    
            storehouseSelect.appendChild(newChild);
        }
    });
})
.catch(err => {
    console.error('Error', err);
});

// Récupérer les conditionnements
fetch('http://127.0.0.1:8000/api/drink-rack/', {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => {
    if (!response.ok){
        console.error('Une erreur est survenue lors de la récupération des conditionnements !');
    }

    return response.json();
})
.then(data => {
    const drinks = data;
    drinks.forEach(drink => {
        let newChild = document.createElement('option');
        newChild.setAttribute('value', drink.id);
        newChild.textContent = drink.name;

        drinkSelect.appendChild(newChild);
    });
})
.catch(err => {
    console.error('Error', err);
});


// Soumission du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupérer les données du formulaire
    const supplyDateTime = document.querySelector('[name="dateTimeSupply"]').value;
    const supplyStorehouse = document.querySelector('[name="storehouseSupply"]').value;
    const supplyDrink = document.querySelector('[name="drinkSupply"]').value;
    const supplyQuantityRack = document.querySelector('[name="quantityRackSupply"]').value;

    // Gestion de validations
    toastrSchema();
    if (supplyDateTime == "") {
        toastr.info("Veuillez renseigner la date de l'approvisionnement !");
        return;
    }

    if (supplyStorehouse == "") {
        toastr.info("Veuillez choisir le dépôt à approvisionner !");
        return;
    }

    if (supplyDrink == "") {
        toastr.info("Veuillez choisir la boisson à approvisionner !");
        return;
    }

    if (supplyQuantityRack == "") {
        toastr.info("Veuillez renseigner le nombre de casiers à approvisionner !");
        return;
    }
    // Fin Gestion des validations
    
    // Formatage des données sous JSON
    const formData = {
        date_time: supplyDateTime,
        storehouse: supplyStorehouse,
        drink_rack: supplyDrink,
        quantity: parseInt(supplyQuantityRack)
    };

    fetch('http://127.0.0.1:8000/api/supply/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok){
            console.error('Une erreur est survenue lors de la réponse du serveur !');
        }

        return response.json();
    })
    .then(data => {
            let message = data.message;
            let type = data.type;
            
            // Définition du format des toasts
            toastrSchema();

            if (type === 'success') {
                toastr.success(message);
            }
            else if (type === 'error') {
                toastr.error(message);
            }
    })
    .catch(err => {
        console.error('Error', err);
    });
})

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Check if the cookie starts with the provided name
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                // Extract and decode the cookie value
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

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