const form = document.getElementById('drinkForm');
const categorySelect = document.querySelector('[name="categoryDrink"]');
const packagingSelect = document.querySelector('[name="packagingDrink"]');

// Récupérer les catégories
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
.then(data => {
    const categories = data;
    categories.forEach(category => {
        let newChild = document.createElement('option');
        newChild.setAttribute('value', category.id);
        newChild.textContent = category.name;

        categorySelect.appendChild(newChild);
    });
})
.catch(err => {
    console.error('Error', err);
});

// Récupérer les conditionnements
fetch('http://127.0.0.1:8000/api/packaging/', {
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
    const packagings = data;
    packagings.forEach(packaging => {
        let newChild = document.createElement('option');
        newChild.setAttribute('value', packaging.id);
        newChild.textContent = packaging.name;

        packagingSelect.appendChild(newChild);
    });
})
.catch(err => {
    console.error('Error', err);
});


// Soumission du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupérer les données du formulaire
    const drinkName = document.querySelector('[name="nameDrink"]').value;
    const drinkCapacity = document.querySelector('[name="capacityDrink"]').value;
    const drinkPrice = document.querySelector('[name="priceDrink"]').value;
    const drinkLifespan = document.querySelector('[name="lifespanDrink"]').value;
    const drinkCategory = document.querySelector('[name="categoryDrink"]').value;
    const drinkPackaging = document.querySelector('[name="packagingDrink"]').value;

    // Gestion de validations
    toastrSchema();
    if (drinkName == "") {
        toastr.info("Veuillez renseigner le nom de la boisson !");
        return;
    }
    if (drinkCapacity == "") {
        toastr.info("Veuillez renseigner la capacité de la boisson !");
        return;
    }
    if (isNaN(parseFloat(drinkCapacity))) {
        toastr.info("La capacité de la boisson doit être numérique (en centilitres) !");
        return;
    }
    if (drinkPrice == "") {
        toastr.info("Veuillez renseigner le prix d'un casier de la boisson !");
        return;
    }
    if (isNaN(parseInt(drinkPrice))) {
        toastr.info("Le prix du casier doit être numérique !");
        return;
    }
    if (drinkLifespan == "") {
        toastr.info("Veuillez renseigner la durée de vie de la boisson !");
        return;
    }
    if (isNaN(parseInt(drinkLifespan))) {
        toastr.info("La durée de vie doit être numérique (en mois) !");
        return;
    }
    if (drinkCategory == "") {
        toastr.info("Veuillez choisir la catégorie de la boisson !");
        return;
    }
    if (drinkPackaging == "") {
        toastr.info("Veuillez choisir le conditionnement de la boisson !");
        return;
    }
    // Fin Gestion des validations
    
    // Formatage des données sous JSON
    const formData = {
        name: drinkName,
        capacity: parseFloat(drinkCapacity),
        price: parseInt(drinkPrice),
        lifespan: parseInt(drinkLifespan),
        category: drinkCategory,
        packaging: drinkPackaging
    };

    fetch('http://127.0.0.1:8000/api/drink-rack/', {
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