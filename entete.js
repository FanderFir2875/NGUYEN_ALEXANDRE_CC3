

// Fonction pour récupérer et afficher les en-têtes
async function fetchHeaders(url) {
    try {
        // Effectuer la requête
        const response = await fetch(url);
        
        // Créer un objet JSON pour stocker les en-têtes
        const headersJson = {};
        response.headers.forEach((value, key) => {
            headersJson[key] = value;
        });

        // Afficher les en-têtes au format JSON
        console.log('Headers in JSON format:', JSON.stringify(headersJson, null, 2));
    } catch (error) {
        console.error('Error fetching headers:', error);
    }
}

// Appeler la fonction
fetchHeaders('http://localhost:8000/');

