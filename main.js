import { accountCreator } from './accountCreator.js';

const howMany = document.getElementById("howMany").value;
const nicknameList = document.querySelector('.nickname_list');
const submit = document.querySelector('.submit');
submit.addEventListener('click', (e) => {
  nicknameList.innerHTML += `<li>${accountCreator()}</li>`
});
