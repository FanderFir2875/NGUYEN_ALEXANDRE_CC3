
# NGUYEN_ALEXANDRE_CC3

## Question 1.1

Dans cette question, nous avons une fonction `requestListener` qui génère une page HTML simple avec le message **"My first server!"**.  

### En-têtes renvoyés :
```json
{
  "connection": "keep-alive",
  "date": "Wed, 25 Sep 2024 09:38:17 GMT",
  "keep-alive": "timeout=5",
  "transfer-encoding": "chunked"
}
```

Quand cette page est affichée dans un navigateur, le contenu HTML est bien affiché avec "My first server".

---

## Question 1.2

La fonction `requestListener` a été modifiée pour renvoyer une réponse au format JSON. Voici l’en-tête de réponse pour cette fonction :

### En-têtes renvoyés :
```json
{
  "connection": "keep-alive",
  "content-length": "20",
  "content-type": "application/json",
  "date": "Wed, 25 Sep 2024 09:45:53 GMT",
  "keep-alive": "timeout=5"
}
```

La page générée affiche une réponse au format JSON contenant le message :
```json
{ "message": "I'm OK" }
```

---

## Question 1.3

Cette fois, nous essayons de lire un fichier HTML (`index.html`) à l’aide de `fs.readFile()`. Si le fichier est lu avec succès, il est renvoyé au client avec un type de contenu `text/html`. Cependant, une erreur se produit lors de l’appel de `fetch()`, générant un message d’erreur comme suit :

### Message d'erreur :
```
Error fetching headers: TypeError: fetch failed
  at node:internal/deps/undici/undici:13178:13
  at async fetchHeaders (...reponse.js:9:26) {
  [cause]: Error: read ECONNRESET
}
```

Cette erreur est probablement liée à un problème de connexion, le serveur ayant réinitialisé la connexion avant la fin de la lecture.

---

## Question 1.4

L’erreur `ENOENT (No such file or directory)` indique que le fichier `index.html` est introuvable dans le répertoire. La fonction essaie de lire un fichier qui n'existe pas.

---

## Question 1.5

Comparaison entre deux versions de la fonction `requestListener` pour gérer la lecture asynchrone du fichier `index.html` :

### Sans `async` :
Cette version utilise une promesse via `.then()` et `.catch()` pour lire le fichier et envoyer une réponse. Si une erreur survient, un message "Internal Server Error" est renvoyé avec un code 500.

```javascript
function requestListener(_request, response) {
  fs.readFile("index.html", "utf8")
    .then((contents) => {
      response.setHeader("Content-Type", "text/html");
      response.writeHead(200);
      response.end(contents);
    })
    .catch((error) => {
      console.error(error);
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Internal Server Error");
    });
}
```

### Avec `async` :
Ici, la fonction utilise `await` pour attendre la lecture du fichier, simplifiant la gestion des promesses. En cas d'erreur, la gestion est similaire avec un statut 500 et un message "Internal Server Error".

```javascript
// Fonction asynchrone qui gère les requêtes et envoie des réponses
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

```

---

## Question 1.6

Ces commandes ont ajouté deux packages dans le projet :

- **cross-env** : pour démarrer le projet en mode production.
- **nodemon** : pour faciliter le développement en redémarrant automatiquement le serveur après chaque modification.

Cela a également rajouté le dossier `node_modules` dans le dossier `NGUYEN_ALEXANDRE_CC3`.

---

## Question 1.7

La principale différence entre les modes production et développement est que le mode production est le mode par défaut avec Node.js, tandis que le mode développement, avec nodemon, permet de détecter automatiquement les changements de fichiers et de redémarrer le serveur sans intervention manuelle. Cela rend le processus de développement beaucoup plus fluide et rapide.

La grande différence est donc le redémarrage automatique lors d'un changement détecté, permettant un développement beaucoup plus fluide.

---

## Question 1.8

Analyse des codes HTTP renvoyés par différentes routes :

- **http://localhost:8000/index.html** : `200 (OK)`
  - Le fichier `index.html` a été trouvé et renvoyé avec succès.

- **http://localhost:8000/random.html** : `200 (OK)`
  - Une page avec un nombre aléatoire a été renvoyée avec succès.

- **http://localhost:8000/** : `404 (Not Found)`
  - La route n’est pas définie dans le switch et renvoie une erreur 404.

- **http://localhost:8000/dont-exist** : `404 (Not Found)`
  - La route est inconnue, d'où une erreur 404.



---

