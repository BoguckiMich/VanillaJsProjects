const main = document.getElementById("main");

const addUserButton = document.getElementById("add-user");
const doubleButton = document.getElementById("double");
const showMillionairesButton = document.getElementById("show-millionaires");
const sortButton = document.getElementById("sort");
const calculateWealthButton = document.getElementById("calculate-wealth");

let userArray = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch user and add money
// function getRandomUser() {
//   fetch("https://randomuser.me/api/")
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }  old version

async function getRandomUser() {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();

  const user = data.results[0];
  const userToObject = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addDataToArray(userToObject);
}

function doubleMoney() {
  userArray = userArray.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function sortByRichest() {
  userArray.sort((a, b) => b.money - a.money);
  updateDOM();
}

function filterOnlyMillionaires() {
  userArray = userArray.filter((user) => user.money > 1000000);
  updateDOM();
}

function getSumOfAllWealth() {
  const total = userArray.reduce((acc, user) => (acc += user.money), 0);
  console.log(total);
  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(wealthElement);
  //   updateDOM();
}

function addDataToArray(obj) {
  userArray.push(obj);

  updateDOM();
}

function updateDOM(providedData = userArray) {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h3>";

  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
}

//format number to money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//event listeneres
addUserButton.addEventListener("click", getRandomUser);
doubleButton.addEventListener("click", doubleMoney);
sortButton.addEventListener("click", sortByRichest);
showMillionairesButton.addEventListener("click", filterOnlyMillionaires);
calculateWealthButton.addEventListener("click", getSumOfAllWealth);
