
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