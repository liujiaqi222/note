const puppeteer = require('puppeteer');

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://learnwebcode.github.io/practice-requests/');
  await page.screenshot({ path: 'a.png', fullPage: true })
  await browser.close()
}

start()