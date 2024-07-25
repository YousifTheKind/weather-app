async function fetchData(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=LX4FWV9HHAK3QND7WQYDZVBX9&contentType=json`;

    try {
        const response = await fetch(url, { mode: "cors" });
        const responseData = await response.json();
        if (response.ok) {
            return parseData(responseData);
        } else {
            throw new Error("Error: " + response);
        }
    } catch (error) {
        alert(error);
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
        const parsedData = {
            address: allData.address,
            tempF: allData.currentConditions.temp,
            tempC: (((allData.currentConditions.temp - 32) * 5) / 9).toFixed(1),
            feelslike: allData.currentConditions.feelslike,
            condition: allData.currentConditions.conditions,
            date: new Date(allData.days[0].datetime),
            time: allData.currentConditions.datetime.slice(0, 5),
            get today() {
                return daysOfWeek[this.date.getDay()];
            },
            icon: allData.currentConditions.icon,
        };
        return parsedData;
    } catch (error) {
        alert(error);
    }
}
export { fetchData, parseData };
