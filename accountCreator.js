
'use strict';
const puppeteer = require('puppeteer');
const fetch = require("node-fetch");
// const howMany = document.getElementById("howMany").value;
// const nicknameList = document.querySelector('.nickname_list');
// const submit = document.querySelector('.submit');
// submit.addEventListener('click', (e) => {

function AccountCreater(server, key) {
    const nickList = ['White', 'Red', 'Yellow', 'Blue', 'Black', 'Brown', 'Orange', 'Grey', 'Green', 'Gold', 'Silver', 'Bronze', 'Diamond', 'Platinium', 'Challenger', 'Knight', 'Tank', 'Archer', 'Palladin', 'Druid', 'Sorccer', 'Human', 'Goblin', 'Dragon', 'Angel', 'Unicorn', 'Minotaur', 'Golem', 'Devil', 'Demon', 'Giant', 'Titan', 'Energy', 'Power', 'Master', 'Slime', 'Orc',
        'Minions', 'Tower', 'King', 'Lord', 'Fighter', 'Noob', 'Smart', 'Maximum', 'Mighty', 'Stinky', 'Creepy', 'Blody', 'Crazy', 'Alcoholic', 'Special', 'Angry', 'Dirty', 'Secret', 'Retarded', 'Pscyho', 'Extreme', 'Zombie', 'Bikini', 'Smelly', 'Maniac', 'Penguin', 'Combat', 'Rat', 'Mecha', 'Clones', 'Super', 'Metal', 'Hidden', 'Dark', 'Icy', 'Sweet', 'Twin', 'Rage', 'Slayer', 'Thunder', 'Push'];
    let a = Math.random() * nickList.length;
    let b = Math.random() * nickList.length;
    let nickname = nickList[Math.round(a)] + nickList[Math.round(b)];
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    let password = Math.random().toString(36).slice(2) + "A1";
    let email = nickname + "@gmail.sc";
    (async () => {
        const browser = await puppeteer.launch({
            // ignoreDefaultArgs: ['--disable-extensions'],
            headless: false,
            defaultViewport: null,
            slowMo: 10,
            // args: ['--proxy-server=8.209.89.251:3128']
            // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
            // args: ['--user-data-dir=C:/users/mark/Google/Chrome/User Data']
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1920,
            height: 1280,
            deviceScaleFactor: 1,
        });
        await page.goto(`https://signup.${server}.leagueoflegends.com/en/signup/index#/`, { waitUntil: 'networkidle0' });
        await page.focus('input[name=email]');
        await page.keyboard.type(email)
        page.keyboard.press('Enter');
        await page.waitForSelector('select[name=dob-day]', { visible: true, timeout: 0 });
        await page.select('select[name="dob-day"]', "22")
        await page.select('select[name="dob-month"]', "5")
        await page.select('select[name="dob-year"]', "1939")
        await page.click('div[class="next-button"]');
        await page.waitForSelector('input[name="username"]', { visible: true, timeout: 0 });
        await page.type('input[name=username]', nickname);
        await page.type('input[name=password]', password);
        await page.type('input[name=confirm_password]', password);
        await page.click('div[class=checkbox-indicator]');
        await page.click('div[class="next-button"]');
        await page.click('div[class="app-component"]');

        let id = 0;
        await fetch("https://2captcha.com/in.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key: key,
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

        let token = 'CAPCHA_NOT_READY';
        while (token === "CAPCHA_NOT_READY") {
            await fetch(`https://2captcha.com/res.php?key=d8165f7c75664ca75b4d0a63fe113190&action=get&id=${id}&json=1`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.request === 'CAPCHA_NOT_READY') {

                    } else {
                        token = data.request
                    }
                })
                .catch(err => console.error(err))
        }
        await page.evaluate((token) => {
            document.querySelector('#g-recaptcha-response').innerText = token;
        }, token)
        await page.click('div[class="next-button"]');
        await page.waitForNavigation({ waitUntil: ['networkidle0', 'load', 'domcontentloaded'], timeout: 10000 }).catch(error => console.log(error));
        await page.waitFor(2000)
        let currentURL = page.url();
        console.log(currentURL);
        currentURL === `https://signup.eune.leagueoflegends.com/en/signup/index#/confirmation` ? console.log(true) : console.log(false);
        let i = 0;
        while (currentURL === `https://signup.eune.leagueoflegends.com/en/signup/index#/confirmation`) {
            // console.log("false")
            await page.waitFor(2000)
            await page.click("input[name=username]", { clickCount: 3 })
            if (i === 0) {
                // await page.click("input[name=username]", { clickCount: 3 })
                await page.type('input[name=username]', nickList[Math.round(a)] + nickList[Math.round(b)] + "s");
            } else if (i === 1) {
                // await page.click("input[name=username]", { clickCount: 3 })
                await page.type('input[name=username]', nickList[Math.round(a)] + "s" + nickList[Math.round(b)]);
            } else if (i === 2) {
                // await page.click("input[name=username]", { clickCount: 3 })
                await page.type('input[name=username]', nickList[Math.round(a)] + "s" + nickList[Math.round(b)] + "s");
            }
            console.log(currentURL + " loop " + i, "nickname: " + nickname)
            i++
            nickname = await page.$eval('input[name=username]', e => e.value);
            page.keyboard.press('Enter');
            await page.waitForNavigation({ waitUntil: ['networkidle0', 'load', 'domcontentloaded'], timeout: 10000 }).catch(error => console.log(error));
            await page.waitFor(1000)
            currentURL = page.url();
            // console.log(page.url());
        }
        await page.waitForSelector('.download-button', {
            visible: true,
        })
        // console.log(page.url());
        if (server == "EUNE") {
            server = "EUN"
        }
        console.log(server + ":" + nickname + ":" + password)
        await browser.close()
    })()
}

module.exports = AccountCreater;