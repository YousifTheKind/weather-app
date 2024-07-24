async function fetchData(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=LX4FWV9HHAK3QND7WQYDZVBX9&contentType=json`;

    console.log("fetching...");
    try {
        const response = await fetch(url, { mode: "cors" });
        const responseData = await response.json();
        if (response.ok) {
            return parseData(responseData);
        } else {
            throw new Error("Error: " + response);
        }
    } catch (error) {
        console.log(error);
    }
}

async function parseData(response) {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    try {
        const allData = await response;
        console.log(allData);
        const parsedData = {
            address: allData.resolvedAddress,
            tempF: allData.currentConditions.temp,
            tempC: (((allData.currentConditions.temp - 32) * 5) / 9).toFixed(1),
            feelslike: allData.currentConditions.feelslike,
            condition: allData.currentConditions.conditions,
            date: new Date(allData.days[0].datetime),
            time: allData.currentConditions.datetime.slice(0, 5),
            get today() {
                return daysOfWeek[this.date.getDay()];
            },
        };
        return parsedData;
    } catch (error) {
        console.log(error);
    }
}
export { fetchData, parseData };
