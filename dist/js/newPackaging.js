const form = document.getElementById('packagingForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupérer les données du formulaire
    const packagingName = document.querySelector('[name="namePackaging"]').value;

    // Gestion de validations
    toastrSchema();
    if (packagingName == "") {
        toastr.info("Veuillez renseigner le nom du conditionnement !");
        return;
    }
    // Fin Gestion des validations
    
    // Formatage des données sous JSON
    const formData = {
        name: packagingName
    };

    fetch('http://127.0.0.1:8000/api/packaging/', {
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