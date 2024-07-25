import "./styles.css";
import { fetchData } from "./fetch";
const submitBtn = document.querySelector(".submitBtn");
const locationDiv = document.querySelector(".location");
const icon = document.querySelector(".icon");
const temp = document.querySelector(".temp");
const tempCButton = document.querySelector(".temp-c");
const tempFButton = document.querySelector(".temp-f");
const time = document.querySelector(".time");
const day = document.querySelector(".day");
const condition = document.querySelector(".condition");
const dataContainer = document.querySelector(".data-container");

let tempC;
let tempF;
let selectedTempUnit = "C";

async function submitHandler(e) {
    e.preventDefault();

    const location = document.querySelector("input").value;
    document.querySelector("form").reset();
    locationDiv.textContent = "Location: Fetching Data...";
    const locationData = await fetchData(location);
    displayData(locationData);
}

function tempUnitHandler(e) {
    if (e.target.parentNode == tempCButton) {
        selectedTempUnit = "C";
        tempFButton.removeAttribute("id");
        tempCButton.id = "selectedTempUnit";
        temp.textContent = tempC;
    } else if (e.target.parentNode == tempFButton) {
        selectedTempUnit = "F";
        tempCButton.removeAttribute("id");
        tempFButton.id = "selectedTempUnit";
        temp.textContent = tempF;
    }
}

function displayData(locationData) {
    dataContainer.style.cssText = "opacity: 100%;";
    locationDiv.textContent =
        "Location: " +
        locationData.address.charAt(0).toUpperCase() +
        locationData.address.slice(1);

    icon.src = `../assests/icons/${locationData.icon}.svg`;
    tempC = locationData.tempC;
    tempF = locationData.tempF;
    if (selectedTempUnit == "C") {
        temp.textContent = tempC;
    } else if (selectedTempUnit == "F") {
        temp.textContent = tempF;
    }

    time.textContent = locationData.time;
    day.textContent = locationData.today;
    condition.textContent = locationData.condition;
}

tempCButton.addEventListener("click", tempUnitHandler);
tempFButton.addEventListener("click", tempUnitHandler);
submitBtn.addEventListener("click", submitHandler);
