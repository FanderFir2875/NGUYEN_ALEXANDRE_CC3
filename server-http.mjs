import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

// Fonction asynchrone qui gère les requêtes HTTP entrantes et envoie des réponses appropriées
async function requestListener(request, response) {
    // Définit l'en-tête pour indiquer que le contenu de la réponse est en HTML
    response.setHeader("Content-Type", "text/html");
    
    try {
      // Lecture asynchrone du fichier "index.html" avec l'encodage "utf8"
      const contents = await fs.readFile("index.html", "utf8");
      
      // Utilisation de la propriété 'url' de l'objet request pour déterminer quelle réponse envoyer
      switch (request.url) {
        // Si l'URL demandée est "/index.html"
        case "/index.html":
          // Envoyer un statut HTTP 200 pour indiquer que la requête a réussi
          response.writeHead(200);
          // Terminer la réponse avec le contenu du fichier "index.html"
          return response.end(contents);
  
        // Si l'URL demandée est "/random.html"
        case "/random.html":
          // Envoyer un statut HTTP 200 pour indiquer que la requête a réussi
          response.writeHead(200);
          // Générer un nombre aléatoire et l'envoyer dans une réponse HTML
          return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
  
        // Pour toute autre URL non reconnue
        default:
          // Envoyer un statut HTTP 404 pour indiquer que la ressource n'a pas été trouvée
          response.writeHead(404);
          // Terminer la réponse avec un message d'erreur 404
          return response.end(`<html><p>404: NOT FOUND</p></html>`);
      }
    } catch (error) {
      // En cas d'erreur lors de la lecture du fichier (par exemple, si le fichier n'existe pas)
      console.error(error); // Afficher l'erreur dans la console pour le débogage
      // Envoyer un statut HTTP 500 pour indiquer une erreur interne du serveur
      response.writeHead(500);
      // Terminer la réponse avec un message d'erreur interne
      return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
    }
  }
  
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
