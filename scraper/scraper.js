const puppeteer = require("puppeteer");
const { insertNoticia, insertError } = require("./mongo");

module.exports = async (periodicos) => {
  try {
    const errors = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (let i = 0; i < periodicos.length; i++) {
      const periodico = periodicos[i];

      try {
        await page.goto(periodico.url);

        await page.waitForSelector("h2");

        const data = await page.evaluate(async () => {
          let link;
          if (document.querySelector("article")) {
            link = document.querySelector("article").querySelector("a").href;
          } else if ("main") {
            link = document.querySelector("main").querySelector("a").href;
          } else {
            link = document.querySelector("h2").querySelector("a").href;
          }
          return {
            link,
          };
        });

        console.log(data.link);
        await page.goto(data.link);

        await page.waitForSelector("img");
        const newsData = await page.evaluate(async () => {
          console.log(document);

          const titulo = document.querySelector("h1").innerText;
          let img;
          if (document.querySelector("article")) {
            img = document.querySelector("article").querySelector("img").src;
          } else if (document.querySelector("main")) {
            img = document.querySelector("main").querySelector("img").src;
          } else {
            img = document.querySelector("img").src;
          }
          return { titulo, img };
        });

        console.log({
          periodico: periodico.nombre,
          link: data.link,
          titulo: newsData.titulo,
          img: newsData.img,
        });

        insertNoticia({
          periodico: periodico.nombre,
          link: data.link,
          titulo: newsData.titulo,
          img: newsData.img,
          fecha: new Date(),
        });
      } catch (error) {
        errors.push(periodico.nombre);
      }
    }

    if (errors.length > 0) {
      await insertError(errors);
    }

    await browser.close();
  } catch (error) {
    console.log({ error });
  }
};
