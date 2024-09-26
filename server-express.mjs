import express from "express";
import morgan from "morgan";

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
  const length = request.params.nb;
  if (isNaN(length)||length <= 0 ) {
    return response.status(400).send("Invalid number of elements.");
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
