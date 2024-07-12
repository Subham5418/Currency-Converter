const BASE_URL ="https://currency-converter18.p.rapidapi.com/api/v1";
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'bd7ccd3321msh16b2894e7b46bd2p1a6c0ejsn0be75bc2a01c',
		'x-rapidapi-host': 'currency-converter18.p.rapidapi.com'
	}
};

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/convert?from=${fromCurr.value}&to=${toCurr.value}&amount=${amtVal}`;
  let response = await fetch(URL,options);
  let data = await response.json();
  console.log(data);
  let convertedAmount = data.result.convertedAmount;

  msg.innerText = `${amtVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});