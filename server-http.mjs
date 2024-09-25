import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

// Fonction asynchrone qui gère les requêtes HTTP entrantes et envoie des réponses appropriées
// Fonction asynchrone qui gère les requêtes HTTP entrantes et envoie des réponses appropriées
async function requestListener(request, response) {
    // Définit l'en-tête de la réponse pour indiquer que le contenu est en HTML
    response.setHeader("Content-Type", "text/html");
    
    try {
        // Divise l'URL de la requête en parties pour identifier la ressource demandée
        const pathParts = request.url.split("/");
  
        // Utilisation d'un switch pour déterminer quelle réponse envoyer selon la ressource demandée
        switch (pathParts[1]) {
            // Cas pour la page d'accueil ou index.html
            case "":
            case "index.html":
                // Envoie un statut HTTP 200 et le contenu du fichier "index.html"
                response.writeHead(200);
                return response.end(await fs.readFile("index.html", "utf8"));
  
            // Cas pour "random.html", envoie un nombre aléatoire
            case "random.html":
                response.writeHead(200);
                return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
  
            // Cas pour "random" suivi d'un nombre, génère une série de nombres aléatoires
            case "random":
                // Récupère le nombre de valeurs aléatoires à générer à partir de l'URL
                const nb = parseInt(pathParts[2]);
                // Vérifie si le nombre est valide (un nombre positif)
                if (!isNaN(nb) && nb > 0) {
                    let randomNumbers = ""; // Variable pour stocker les nombres aléatoires
                    // Boucle pour générer les nombres aléatoires
                    for (let i = 0; i < nb; i++) {
                        randomNumbers += `<p>${Math.floor(100 * Math.random())}</p>`;
                    }
                    // Envoie un statut HTTP 200 et les nombres aléatoires générés
                    response.writeHead(200);
                    return response.end(`<html>${randomNumbers}</html>`);
                } else {
                    // Envoie un statut HTTP 400 pour une mauvaise requête si le nombre n'est pas valide
                    response.writeHead(400);
                    return response.end(`<html><p>400: BAD REQUEST</p></html>`);
                }
  
            // Cas par défaut pour les URL non reconnues
            default:
                // Envoie un statut HTTP 404 pour indiquer que la ressource n'a pas été trouvée
                response.writeHead(404);
                return response.end(`<html><p>404: NOT FOUND</p></html>`);
        }
    } catch (error) {
        // En cas d'erreur, affiche l'erreur dans la console pour le débogage
        console.error(error);
        // Envoie un statut HTTP 500 pour indiquer une erreur interne du serveur
        response.writeHead(500);
        return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
    }
}

  
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
