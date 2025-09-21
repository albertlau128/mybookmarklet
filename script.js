
function fetchWeatherData() {
    const langSelect = document.getElementById("lang-select");
    const lastFetch = document.getElementById("fetch-status");
    const tableBody = document.getElementById("data-table-body")
    tableBody.innerHTML = `<img src="loading.gif" alt="loading..." />`;
    lastFetch.innerText = "Fetching...";
    fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=${langSelect.value}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("data-table-body");
            tableBody.innerHTML = "";
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const value = data[key];
                    if (value === null || value === undefined || value === "") {
                        continue;
                    }
                    const row = document.createElement("tr");
                    row.innerHTML = `<td><b>${key}</b></td><hr width="10px" color="red" size="5">`;
                    const row2 = document.createElement("tr");
                    row2.innerHTML = `<td>${value}</td>`;
                    tableBody.appendChild(row);
                    tableBody.appendChild(row2);
                }
            }
            lastFetch.innerText = "Last update: " + new Date().toLocaleString();
        })
        .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", function () {
    fetchMetarTafData();
    fetchWeatherData();
    setInterval(fetchWeatherData, 60 * 1000);
    setInterval(fetchMetarTafData, 60 * 1000);
    document.getElementById("lang-select").addEventListener("change", fetchWeatherData);
});

function fetchMetarTafData(){
    fetch(`https://aviationweather.gov/api/data/metar?ids=VHHH&hours=0&order=id%2C-obs&sep=true&taf=true`)
        .then(response => response.text())
        .then(data => {
           splitedData=data.split('\n')
            const metarCode = document.getElementById("metar-code");
            const tafCode = document.getElementById("taf-code");
            console.log(splitedData)
            console.log(data)
            metarCode.innerText = splitedData[0];
            tafCode.innerText = splitedData[2];
        })
        .catch(error => console.error(error));
}