'use strict';
const puppeteer = require('puppeteer');
const fetch = require("node-fetch");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 30,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1280,
    deviceScaleFactor: 1,
  });
  await page.goto('https://signup.euw.leagueoflegends.com/en/signup/index#/', { waitUntil: ['load', 'domcontentloaded'] });
  await page.focus('input[name=email]');
  await page.keyboard.type('algorytm86@gmail.sc')
  await page.screenshot({ path: '1emailChampter.png' });
  page.keyboard.press('Enter');
  await page.waitForSelector('select[name=dob-day]', { visible: true, timeout: 0 });
  await page.select('select[name="dob-day"]', '1')
  await page.select('select[name="dob-month"]', '5')
  await page.select('select[name="dob-year"]', '1939')
  await page.screenshot({ path: '1dateChapter.png' });
  await page.click('div[class="next-button"]');
  await page.waitForSelector('input[name="username"]', { visible: true, timeout: 0 });
  await page.type('input[name=username]', 'algorytm86');
  await page.type('input[name=password]', 'algorytm86123');
  await page.type('input[name=confirm_password]', 'algorytm86123');
  await page.click('div[class=checkbox-indicator]');
  await page.screenshot({ path: '1userNameChapter.png' });
  await page.click('div[class="next-button"]');
  await page.screenshot({ path: '1recapcha.png' });
  let id = 0;
  await fetch("https://2captcha.com/in.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      key: "d8165f7c75664ca75b4d0a63fe113190",
      method: "userrecaptcha",
      googlekey: "6Lc3HAsUAAAAACsN7CgY9MMVxo2M09n_e4heJEiZ",
      pageurl: "https://signup.euw.leagueoflegends.com/en/signup/index#/registration",
      json: "1"
    })
  })
    .then(response => response.json())
    .then(data => {
      id = data.request
    })
    .catch(err => console.error(err))

  //page.waitFor(10000);
  console.log(id)
  console.log(`https://2captcha.com/res.php?key=d8165f7c75664ca75b4d0a63fe113190&action=get&id=${id}&json=1`)
  let token;
  while (token != "CAPCHA_NOT_READY") {
    await fetch(`https://2captcha.com/res.php?key=d8165f7c75664ca75b4d0a63fe113190&action=get&id=${id}&json=1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.request)
        if (data.request === 'CAPCHA_NOT_READY') {
          console.log(data.request + 2)
        } token = data.request
        console.log(data.request + 3)
      })
      .catch(err => console.error(err))
  }
  await page.screenshot({ path: 'response.png', fullPage: true })
  //await browser.close()
})()