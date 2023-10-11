const fromCurrency = document.querySelector("#from");
const toCurrency = document.querySelector("#to");
const myInput = document.querySelector(".enter-amount");
const exchangRate = { usd: 1 };
const currencyResult = document.querySelector(".currency-result");
const swapBtn = document.querySelector(".swap-btn");

const init = async () => {
  try {
    const res = await fetch("https://www.floatrates.com/daily/usd.json");
    const data = await res.json();
    if (res.ok) {
      for (let currencyData in data) {
        let currencyInfo = data[currencyData];
        const { code, name } = currencyInfo;

        exchangRate[currencyData] = currencyInfo.rate;

        const option1 = document.createElement("option");
        option1.value = code;
        option1.textContent = `${code} - ${name}`;
        const option2 = option1.cloneNode(true);
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
      }

      toCurrency.value = toCurrency.options[1].value;
      convert();
    }
  } catch (error) {
    console.log("This is data Loading");
  }
};

init();

function convert() {
  const inputvalue = parseFloat(myInput.value);
  const fromCurrencyValue = fromCurrency.value.toLowerCase();
  const toCurrencyValu = toCurrency.value.toLowerCase();
  const convertedValue =
    (inputvalue * exchangRate[toCurrencyValu]) / exchangRate[fromCurrencyValue];

  const convertedResult = `<span class="currency">${toCurrencyValu} </span> ${convertedValue.toFixed(
    2
  )}`;

  currencyResult.innerHTML = convertedResult;
}

fromCurrency.addEventListener("change", convert);
toCurrency.addEventListener("change", convert);
myInput.addEventListener("change", convert);

swapBtn.addEventListener("click", () => {
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValu = toCurrency.value;
  fromCurrency.value = toCurrencyValu;
  toCurrency.value = fromCurrencyValue;
  convert();
});
