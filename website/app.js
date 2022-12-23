
// Create a new date instance dynamically with JS
let d = new Date();

// personal API_KEY For openWeatherMap api
let weather_url = "https://api.openweathermap.org/data/2.5/forecast?zip=";
let API_KEY = "&appid=87cb961993f5ff8e0ad3cb55640c5d77";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", PerformAction);
function PerformAction(e) {
  const newZip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  /* Function called by event listener */
  getWEATHER(weather_url, newZip, API_KEY).then(function (data) {
    console.log(data);

    // add data to post request
    postData("/add_Data", {
      date: d,
      temp: data.list[0].main.temp,
      content: feelings,
    });
    updateUI();
  });
}

/* Function to GET Web API Data*/
const getWEATHER = async (weather_url, zip, key) => {
  let res = await fetch(weather_url + zip + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error".error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  console.log(data);
  let response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newDate = await response.json();
    console.log(newDate);
    return newDate;
  } catch (error) {
    console.log("error".error);
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  let request = await fetch("/data");
  try {
    const ALL_DATA = await request.json();
    document.getElementById("date").innerHTML = `Data:${ALL_DATA[0].date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperatuer:${ALL_DATA[0].temp}`;
    document.getElementById(
      "content"
    ).innerHTML = `I Feel:${ALL_DATA[0].content}`;
  } catch (error) {
    console.log("error", error);
  }
};
