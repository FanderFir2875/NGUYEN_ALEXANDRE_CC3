import express from "express";
import morgan from "morgan";
import createError from "http-errors"; 

const host = "localhost";
const port = 8000;

const app = express();

// Activer Morgan uniquement en mode développement
if (app.get("env") === "development") {
  app.use(morgan("dev"));
  console.log("Morgan activé");
}

// Configurer le moteur de vue EJS
app.set("view engine", "ejs");
// Middleware pour servir des fichiers statiques à partir du dossier "static"
app.use(express.static("static"));

// La route pour générer des nombres aléatoires
app.get("/random/:nb", async function (request, response, next) {
  const length = Number.parseInt(request.params.nb , 10);
  if (Number.isNaN(length)|| length <= 0 ) {
    return next(createError(400,'Invalid parameter: nb must be a positive number.'));
  }
  const numbers = Array.from({ length })
   .map(() => Math.floor(100 * Math.random()));
  
  const welcome = `Voila ${length} nombre(s) aleatoire(s) genere(s) :`;

  return response.render("random", { numbers , welcome});
});

const server = app.listen(port, host);

server.on("listening", () =>
  console.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

console.info(`File ${import.meta.url} executed.`);
