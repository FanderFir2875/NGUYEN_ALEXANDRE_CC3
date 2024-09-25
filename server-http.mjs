import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(_request, response) {
    try {
        // Lecture du fichier "index.html" de manière asynchrone avec l'encodage "utf8"
        const contents = await fs.readFile("index.html", "utf8");
        
        // Définir l'en-tête de la réponse pour indiquer que le contenu est du HTML
        response.setHeader("Content-Type", "text/html");
        
        // Envoyer un statut HTTP 200 pour indiquer que la requête a été traitée avec succès
        response.writeHead(200);
        
        // Envoyer le contenu du fichier "index.html" dans la réponse et terminer la réponse
        response.end(contents);
    } catch (error) {
        // Si une erreur survient lors de la lecture du fichier, l'erreur est affichée dans la console
        console.error(error);
        
        // Envoyer un statut HTTP 500 pour indiquer une erreur interne du serveur
        response.writeHead(500, { "Content-Type": "text/plain" });
        
        // Terminer la réponse avec un message d'erreur simple
        response.end("Internal Server Error");
    }
  }

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
