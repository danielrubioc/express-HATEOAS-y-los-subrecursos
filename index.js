const express = require("express");
const guitarras = require("./data/guitarras.js");
const app = express();
app.listen(3000, () => console.log("Servidor encendido!"));

app.use(express.static("public"));

app.get("/", async (req, res) => {
  console.log(guitarras);
  res.send(guitarras);
});

// Paso 1
const HATEOAS = () =>
  // Paso 2
  guitarras.map((g) => {
    return {
      name: g.name,
      href: `http://localhost:3000/guitarra/${g.id}`,
    };
  });

// Paso 3
app.get("/guitarras", (req, res) => {
  res.send({
    guitarras: HATEOAS(),
  });
});

// Paso 1
const guitarra = (id) => {
  return guitarras.find((g) => g.id == id);
};

// Paso 2
app.get("/guitarra/:id", (req, res) => {
  // Paso 3
  const id = req.params.id;
  // Paso 4
  res.send(guitarra(id));
});
