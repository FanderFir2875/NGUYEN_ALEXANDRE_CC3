
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
