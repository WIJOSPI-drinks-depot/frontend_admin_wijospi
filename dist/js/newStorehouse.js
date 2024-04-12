const form = document.getElementById('storehouseForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupérer les données du formulaire
    const storehouseDesignation = document.querySelector('[name="designationStore"]').value;
    const storehouseContact = document.querySelector('[name="contactStore"]').value;
    const storehouseEmail = document.querySelector('[name="emailStore"]').value;
    const storehousePassword = document.querySelector('[name="passwordStore"]').value;
    const storehouseAddress = document.querySelector('[name="adresseStore"]').value;
    const secondaryStorehouseradio = document.getElementById('secondaryStorehouse');
    const generalStorehouseradio = document.getElementById('generalStorehouse');
    let storehouseType = null;

    if (secondaryStorehouseradio.checked) {
        storehouseType = secondaryStorehouseradio.value;
    } else if (generalStorehouseradio.checked) {
        storehouseType = generalStorehouseradio.value;
    }

    // Gestion de validations
    toastrSchema();
    if (storehouseDesignation == "") {
        toastr.info("Veuillez renseigner le nom du dépôt !");
        return;
    }

    if (storehouseContact == "") {
        toastr.info("Veuillez renseigner le numéro de téléphone du dépôt !");
        return;
    } else if (isNaN(parseInt(storehouseContact)) || storehouseContact.length < 8 || storehouseContact.length > 8) {
        toastr.info("Le numéro de téléphone doit être numérique et de 8 caractères !");
        return;
    }

    if (storehouseEmail == "") {
        toastr.info("Veuillez renseigner l'email du dépôt !");
        return;
    }

    if (storehousePassword == "") {
        toastr.info("Veuillez renseigner le mot de passe du dépôt !");
        return;
    }

    if (storehouseAddress == "") {
        toastr.info("Veuillez renseigner l'adresse du dépôt !");
        return;
    }
    // Fin Gestion des validations
    
    // Formatage des données sous JSON
    const formData = {
        name: storehouseDesignation,
        contact: storehouseContact,
        type: storehouseType,
        address: storehouseAddress,
        email: storehouseEmail,
        password: storehousePassword,
    };

    fetch('http://127.0.0.1:8000/api/storehouse/', {
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