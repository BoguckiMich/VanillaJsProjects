const currencyElementOne = document.getElementById("currency-one");
const currencyElementTwo = document.getElementById("currency-two");
const amountElementOne = document.getElementById("amount-one");
const amountElementTwo = document.getElementById("amount-two");
const rateElement = document.getElementById("rate");
const swapButton = document.getElementById("swap");

function calculate() {
  const currencyOne = currencyElementOne.value;
  const currencyTwo = currencyElementTwo.value;
  fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne}`)
    .then((resp) => resp.json())
    .then((data) => {
      const rate = data.rates[currencyTwo];
      rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

      amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
    });
}

currencyElementOne.addEventListener("change", calculate);
amountElementOne.addEventListener("input", calculate);
currencyElementTwo.addEventListener("change", calculate);
amountElementTwo.addEventListener("input", calculate);

swapButton.addEventListener("click", () => {
  const temporatyValue = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = temporatyValue;
  calculate();
});

calculate();
