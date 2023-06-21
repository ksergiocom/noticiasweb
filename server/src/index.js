require('dotenv').config()
const express = require("express");
const app = express();

const PORT = process.env.PORT;

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use("/static", express.static(__dirname + "/public"));

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.get("/", async (req, res) => {
  try {
    const noticias = await client
      .db("noticiaswebinfo")
      .collection("noticias")
      .find()
      .sort({ fecha: -1 })
      .limit(8)
      .toArray();

    const formateados = noticias.map((noticia) => {
      return {
        ...noticia,
        fecha: noticia.fecha.toLocaleString(),
      };
    });

    return res.render("index.pug", { formateados });
  } catch (error) {
    return "Error con el servidor!";
  }
});

app.get("/ajax", async (req, res) => {
	const {page} = req.query

  const noticias = await client
    .db("noticiaswebinfo")
    .collection("noticias")
    .find()
    .sort({ fecha: -1 })
		.skip(8*page)
    .limit(8)
    .toArray();

  const formateados = noticias.map((noticia) => {
    return {
      ...noticia,
      fecha: noticia.fecha.toLocaleString(),
    };
  });

  return res.send(formateados)
});

app.get("*",(req,res) => {
	return res.render('404.pug')
})

const startServer = async () => {
  await client.connect();

  app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
  );
};

startServer();
