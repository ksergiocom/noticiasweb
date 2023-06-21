const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

async function connect() {
  try {
    await client.connect();
    const db = client.db("noticiaswebinfo");
    console.log(`Successfully connected to db ${db.databaseName}`);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

async function disconnect(){
	try {
    await client.close();
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

async function findAllPeriodicos(){
	try {
		const periodicos = await client.db('noticiaswebinfo').collection('periodicos').find().toArray()
		return periodicos
	} catch (error) {
		console.error('Error: '+error)
	}
}

async function insertNoticia(datosNoticia){
	const collectionNoticias = client
    .db("noticiaswebinfo")
    .collection("noticias")

	try {
		// Comprobar si existe esa noticia
		const noticia = await collectionNoticias.findOne({
			titulo: datosNoticia.titulo,
			link: datosNoticia.link,
		})

		if(noticia) return console.log('Ya existe la noticia')

		// Si no existe crear una nueva
		await collectionNoticias.insertOne({
			...datosNoticia
		})
		console.log('Nueva noticia insertada')
	} catch (error) {
		console.log(error)
	}
}

async function insertError(errors) {
  const collectionNoticias = client
    .db("noticiaswebinfo")
    .collection("errors");

  try {
    // Si no existe crear una nueva
    await collectionNoticias.insertOne({
			fecha:new Date(),
			errors
		});
    console.log("Errores insertados");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
	connect,
	disconnect,
	findAllPeriodicos,
	insertNoticia,
	insertError,
}