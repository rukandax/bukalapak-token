const puppeteer = require('puppeteer');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (_, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.bukalapak.com');

  const token = await page.evaluate(() => {
    return document.querySelector("meta[name='oauth-access-token']").getAttribute("content");
  });

  await browser.close();

  return res.send(token);
});

app.listen(port, () => console.log(`bukalapak-token listening on port ${port}!`));