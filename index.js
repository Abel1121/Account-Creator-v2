const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-fullscreen']
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
  await page.focus('input[name=username]');
  await page.keyboard.type('algorytm86');
  await page.focus('input[name=password]');
  await page.keyboard.type('algorytm86123');
  await page.focus('input[name=confirm_password]');
  await page.keyboard.type('algorytm86123');
  await page.click('div[class=checkbox-indicator]');
  await page.screenshot({ path: '1userNameChapter.png' });
  await page.click('div[class="next-button"]');
  await page.screenshot({ path: '1recapcha.png' });
  await browser.close();
})();