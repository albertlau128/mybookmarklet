
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
                    row.innerHTML = `<td>${key}</td>`;
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
    fetchWeatherData();
    setInterval(fetchWeatherData, 60 * 1000);
    document.getElementById("lang-select").addEventListener("change", fetchWeatherData);
});
