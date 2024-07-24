import "./styles.css";
import { fetchData, parseData } from "./fetch";

const submitBtn = document.querySelector(".submitBtn");

async function submitHandler(e) {
    e.preventDefault();
    const location = document.querySelector("input").value;
    const locationData = await fetchData(location);
    console.log(locationData);
    document.querySelector("form").reset();
}

submitBtn.addEventListener("click", submitHandler);
