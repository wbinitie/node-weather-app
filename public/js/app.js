console.log("Client side js is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const countryFlag = document.querySelector("#country-flag");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  countryFlag.src = "";
  countryFlag.width = 0;
  const location = search.value;
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";

        console.log(data.error);
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        countryFlag.src = `https://flagcdn.com/40x30/${data.countryCode}.png`;
        countryFlag.width = 40;
        countryFlag.height = 30;
        countryFlag.alt = "South Africa";
      }
    });
  });
});
