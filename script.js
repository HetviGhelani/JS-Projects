document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const getbtn = document.getElementById("getbtn");
  const info = document.getElementById("info");
  const cname = document.getElementById("cname");
  const temp = document.getElementById("temp");
  const desc = document.getElementById("desc");
  const error = document.getElementById("error");

  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e";
  //const API_KEY = "981f45a4aa28a76b7dea18edba559ef0";
  getbtn.addEventListener("click", async () => {
    const city = input.value.trim();
    if (!city) return;

    try {
      const data = await fetchWeatherData(city);
      displayWeatherData(data);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    //const url = `https://api.openweathermap.org/data/3.0/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("city not found");
    }
    const data2 = await response.json();
    return data2;
  }
  function displayWeatherData(data2) {
    console.log(data2);
    const { name, main, weather } = data2;
    cname.textContent = name;
    temp.textContent = `Temperature : ${main.temp}`;
    desc.textContent = `Weather : ${weather[0].description}`;

    info.classList.remove("hidden");
    error.classList.add("hidden");
  }
  function showError() {
    info.classList.remove("hidden");
    error.classList.add("hidden");
  }
});
