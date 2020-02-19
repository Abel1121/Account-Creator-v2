'use strict';

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 25,
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1280,
        deviceScaleFactor: 1,
    });
    await page.goto('https://animezone.pl/', { waitUntil: ['load', 'domcontentloaded'] });
    let h1 = await page.$eval('h1', e => e.innerText);

    console.log(h1)
})()