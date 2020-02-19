
'use strict';
const puppeteer = require('puppeteer');
const fetch = require("node-fetch");
// const howMany = document.getElementById("howMany").value;
// const nicknameList = document.querySelector('.nickname_list');
// const submit = document.querySelector('.submit');
// submit.addEventListener('click', (e) => {
let server = "EUNE";
for (let i = 0; i < 3; i++) {
    const nickList = ['White', 'Red', 'Yellow', 'Blue', 'Black', 'Brown', 'Orange', 'Grey', 'Green', 'Gold', 'Silver', 'Bronze', 'Diamond', 'Platinium', 'Challenger', 'Knight', 'Tank', 'Archer', 'Palladin', 'Druid', 'Sorccer', 'Human', 'Goblin', 'Dragon', 'Angel', 'Unicorn', 'Minotaur', 'Golem', 'Devil', 'Demon', 'Giant', 'Titan', 'Energy', 'Power', 'Master', 'Slime', 'Orc',
        'Minions', 'Tower', 'King', 'Lord', 'Fighter', 'Noob', 'Smart', 'Maximum', 'Mighty', 'Stinky', 'Creepy', 'Blody', 'Crazy', 'Alcoholic', 'Special', 'Angry', 'Dirty', 'Secret', 'Retarded', 'Pscyho', 'Extreme', 'Zombie', 'Bikini', 'Smelly', 'Maniac', 'Penguin', 'Combat', 'Rat', 'Mecha', 'Clones', 'Super', 'Metal', 'Hidden', 'Dark', 'Icy', 'Sweet', 'Twin', 'Rage', 'Slayer', 'Thunder', 'Push'];
    let a = Math.random() * nickList.length;
    let b = Math.random() * nickList.length;
    let nickname = nickList[Math.round(a)] + nickList[Math.round(b)];
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    let password = Math.random().toString(36).slice(2);
    let email = nickname + "@gmail.sc";
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
        await page.waitForNavigation({ waitUntil: 'networkidle0' })
        let h1 = await page.$eval('h1', e => e.innerText);
        while (h1 == "EVERYTHING LOOK GOOD?") {
            // console.log("false")
            if (i === 0) {
                await page.click("input[name=username]", { clickCount: 3 })
                await page.type('input[name=username]', nickList[Math.round(a)] + nickList[Math.round(b)] + "s");
                nickname = await page.$eval('input[name=username]', e => e.value);
            } else if (i === 1) {
                await page.click("input[name=username]", { clickCount: 3 })
                await page.type('input[name=username]', nickList[Math.round(a)] + "s" + nickList[Math.round(b)]);
                nickname = await page.$eval('input[name=username]', e => e.value);
            } else if (i === 2) {
                await page.click("input[name=username]", { clickCount: 3 })
                await page.type('input[name=username]', nickList[Math.round(a)] + "s" + nickList[Math.round(b)] + "s");
                nickname = await page.$eval('input[name=username]', e => e.value);
            }
            // console.log(h1 + " loop " + i, "nickname: " + nickname)
            i++
            await page.waitForNavigation({ waitUntil: 'networkidle0' })
            page.keyboard.press('Enter')
            h1 = await page.$eval('h1', e => e.innerText);
        }
        await page.waitForSelector('.download-button', {
            visible: true,
        })
        h1 = await page.$eval('h1', e => e.innerText);
        if (server === "EUNE") {
            server = "EUN"
        }
        console.log(server + ":" + nickname + ":" + password)
        h1 === "YOU'RE ALL SET!" ? await browser.close() : console.log("something is wrong")
    })()
}
// })
