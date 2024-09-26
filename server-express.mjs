import express from "express";
import morgan from "morgan";
import createError from "http-errors"; 
import logger from "loglevel";

// Configurer le niveau de log (DEBUG, INFO, WARN, ERROR, TRACE)
logger.setLevel(logger.levels.WARN); 

const host = "localhost";
const port = 8000;

const app = express();

// Activer Morgan uniquement en mode développement
if (app.get("env") === "development") {
  app.use(morgan("dev"));
  logger.info("Morgan activé");
}

// Configurer le moteur de vue EJS
app.set("view engine", "ejs");
// Middleware pour servir des fichiers statiques à partir du dossier "static"
app.use(express.static("static"));

// La route pour générer des nombres aléatoires
app.get("/random/:nb", async function (request, response, next) {
  const length = Number.parseInt(request.params.nb , 10);
  if (Number.isNaN(length)|| length <= 0 ) {
    logger.warn("A warning occurred: Invalid parameter, expected a positive number.");
    return next(createError(400,'Invalid parameter: nb must be a positive number.'));
  }
  const numbers = Array.from({ length })
   .map(() => Math.floor(100 * Math.random()));
  
  const welcome = `Voila ${length} nombre(s) aleatoire(s) genere(s) :`;

  return response.render("random", { numbers , welcome});
});
// Gestionnaire pour les erreurs 404 (page non trouvée)
app.use((request, response, next) => {
  logger.debug(`default route handler: ${request.url}`);
  return next(createError(404));
});

// Gestionnaire global d'erreurs
app.use((error, _request, response, _next) => {
  logger.debug(`default error handler: ${error}`);
  const status = error.status ?? 500;  // Code d'état, par défaut 500
  const stack = app.get("env") === "development" ? error.stack : "";  // Afficher le stack seulement en mode développement
  const result = { code: status, message: error.message, stack };
  return response.render("error", result);  // Rendre la vue 'error.ejs'
});
const server = app.listen(port, host);

server.on("listening", () =>
  logger.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

logger.info(`File ${import.meta.url} executed.`);
